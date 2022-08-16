import {
  Component,
  createMemo,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { FoodInterface, FOODS } from "./Food";

interface FoodDBInterface {
  token: string;
  email: string;
  name: string;
  day: string;
  food: string;
}

interface ResponseJSONInterface {
  result: string;
  data: FoodDBInterface[];
}

const [authorize, setAuthorize] = createSignal<string>();

/**
 * Setup authorization prompt
 * @async
 * @function setupAuthorization
 * @returns {string}
 */
const setupAuthorization = (): string => {
  const authorization = !authorize()
    ? prompt("Zadejte heslo") ?? ""
    : authorize() ?? "";
  return authorization;
};

/**
 * Get all items from food DB
 * @async
 * @function getFoodDashboard
 * @returns {Promise<ResponseJSONInterface>}
 */
const getFoodDashboard = async (): Promise<ResponseJSONInterface> => {
  const authorization = setupAuthorization();
  const response = await fetch("/backend/food/db/list.php", {
    method: "POST",
    body: JSON.stringify({ secret: authorization }),
  });

  const responseValue: ResponseJSONInterface = await response.json();
  if (responseValue.result === "SUCCESS") {
    setAuthorize(authorization);
  } else {
    console.error(responseValue.result);
  }
  return responseValue;
};

/**
 * Get count of items
 * @param {FoodDBInterface[] | undefined} items Food
 * @returns  {Map<string, number>} Map with each unique food as key and count as value
 */
const getItemsCount = (
  items: FoodDBInterface[] | undefined
): Map<string, number> => {
  if (items == undefined || items == null) {
    return new Map();
  } else {
    return items
      .map((x) => x.food)
      .reduce((a, c) => a.set(c, (a.get(c) || 0) + 1), new Map());
  }
};

/**
 * Remove user from DB
 * @async
 * @function removeUser
 * @param {string} token Token of that user
 * @returns {Promise<boolean>} Response.OK
 */
const removeUser = async (token: string): Promise<boolean> => {
  const response = await fetch("/backend/food/db/remove.php", {
    method: "POST",
    body: JSON.stringify({ token: token }),
  });
  return response.ok;
};

const removeAll = async (): Promise<ResponseJSONInterface> => {
  const authorization = setupAuthorization();

  const response = await fetch("/backend/food/db/removeAll.php", {
    method: "POST",
    body: JSON.stringify({ secret: authorization }),
  });

  const responseValue: ResponseJSONInterface = await response.json();
  if (responseValue.result === "SUCCESS") {
    setAuthorize(authorization);
  }
  return responseValue;
};

const Dashboard: Component = () => {
  const [items, { refetch }] = createResource(true, getFoodDashboard);
  const itemsCount = createMemo<Map<string, number>>(() =>
    getItemsCount(items()?.data)
  );

  const findFood = (name: string): FoodInterface | undefined => {
    const food = FOODS.find(
      (e) => e.name === name || e.subitems?.some((s) => s.name === name)
    );
    if (food?.subitems != undefined) {
      for (let index = 0; index < food.subitems.length; index++) {
        if (food.subitems[index].name === name) {
          return food.subitems[index];
        }
      }
    }
    return food;
  };

  return (
    <div class="mx-auto min-h-screen flex flex-col items-center">
      <button
        onClick={refetch}
        class="px-6 py-3 my-5 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
      >
        Refresh objednávek
      </button>
      <Show when={!items.loading && !items.error}>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-md sm:rounded-lg">
              <table class="min-w-full">
                <thead class="bg-green-hacked-darker">
                  <tr>
                    <th class="py-3 px-6 text-xs font-bold text-white text-center">
                      Jídlo
                    </th>
                    <th class="py-3 px-6 text-xs font-bold text-white text-center">
                      Počet
                    </th>
                    <th class="py-3 px-6 text-xs font-bold text-white text-center">
                      Odhadovaná cena
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <For each={[...new Set(items()?.data.map((x) => x.food))]}>
                    {(food) => (
                      <tr class="bg-green-hacked border-b border-green-hacked-darker text-center">
                        <td class="py-4 px-6 text-sm font-medium text-white">
                          {food}
                        </td>
                        <td class="py-4 px-6 text-xl font-medium text-white">
                          {itemsCount()?.get(food)}
                        </td>
                        <td class="py-4 px-6 text-xl font-medium text-white">
                          {() => {
                            const priceEstm = findFood(food)?.priceEst;
                            return priceEstm
                              ? priceEstm * itemsCount().get(food)!
                              : "Žádný odhad";
                          }}
                          Kč
                        </td>
                        <td class="py-4 px-6 text-sm font-medium mx-auto flex items-center justify-center">
                          <img
                            class="aspect-square h-24 rounded-2xl"
                            src={findFood(food)?.image}
                          />
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
            <div class="mt-10 overflow-hidden shadow-md sm:rounded-lg">
              <table class="min-w-full">
                <thead class="bg-green-hacked-darker">
                  <tr>
                    <th class="py-3 px-6 text-xs font-medium text-white">#</th>
                    <th class="py-3 px-6 text-xs font-medium text-white">
                      Jméno
                    </th>
                    <th class="py-3 px-6 text-xs font-medium text-white">
                      Jídlo
                    </th>
                    <th class="py-3 px-6 text-xs font-medium text-white">
                      Den
                    </th>
                    <th class="py-3 px-6 text-xs font-medium text-white">
                      <button
                        class="mr-2 text-terminal-menu-red"
                        onClick={async () => {
                          await removeAll();
                          await refetch();
                        }}
                      >
                        Odstranit vše
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <For each={items()?.data}>
                    {(item: FoodDBInterface, index) => (
                      <tr class="bg-green-hacked border-b border-green-hacked-darker text-center">
                        <td class="py-4 px-6 text-sm text-white">
                          {index() + 1}.
                        </td>
                        <td class="py-4 px-6 text-sm text-white">
                          {item.name}
                        </td>
                        <td class="py-4 px-6 text-sm text-white">
                          {item.food}
                        </td>
                        <td class="py-4 px-6 text-sm text-white">{item.day}</td>
                        <td class="py-4 px-6 text-sm text-white">
                          <button
                            class="mr-2 text-terminal-menu-red"
                            onClick={async () => {
                              await removeUser(item.token);
                              await refetch();
                            }}
                          >
                            Odstranit
                          </button>
                          <button
                            class="text-terminal-menu-yellow"
                            onClick={() => {
                              window.open(
                                "/food/ucastnik/" +
                                  item.token.replace(".", "@").replace(".", "@")
                              );
                            }}
                          >
                            Upravit
                          </button>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Dashboard;
