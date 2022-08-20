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

/**
 * Authorization
 * @async
 * @function setupAuthorization
 * @param {string} operation
 * @param {string=} token
 * @returns {string}
 */
const setupAuthorization = (
  operation: "get" | "save" | "remove",
  token?: string | null
): string | null => {
  const storageToken = localStorage.getItem("foodDashboardToken");
  switch (operation) {
    case "get":
      if (storageToken) {
        return storageToken;
      }
      return prompt("Zadejte heslo") ?? "";
    case "save":
      if (token) {
        localStorage.setItem("foodDashboardToken", token);
      }
      break;
    case "remove":
      localStorage.removeItem("foodDashboardToken");
      break;
  }
  return null;
};

/**
 * Get all items from food DB
 * @async
 * @function getFoodDashboard
 * @returns {Promise<ResponseJSONInterface>}
 */
const getFoodDashboard = async (): Promise<ResponseJSONInterface> => {
  const authorization = setupAuthorization("get");
  const response = await fetch("/backend/food/db/list.php", {
    method: "POST",
    body: JSON.stringify({ secret: authorization }),
  });

  const responseValue: ResponseJSONInterface = await response.json();
  if (responseValue.result === "SUCCESS") {
    setupAuthorization("save", authorization);
  } else {
    setupAuthorization("remove");
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
  const authorization = setupAuthorization("get");

  const response = await fetch("/backend/food/db/removeAll.php", {
    method: "POST",
    body: JSON.stringify({ secret: authorization }),
  });

  const responseValue: ResponseJSONInterface = await response.json();
  if (responseValue.result === "SUCCESS") {
    setupAuthorization("save", authorization);
  } else {
    setupAuthorization("remove");
    console.error(responseValue.result);
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
      <Show when={!items.loading && !items.error && items}>
        <div class="md:w-1/2 inline-block py-2 px-6 lg:px-8">
          <div class="overflow-hidden shadow-md rounded-lg">
            <div class="py-2 flex items-center bg-green-hacked-darker">
              <span class="w-[30%] sm:w-[20%] text-xs font-bold text-white text-center">
                Jídlo
              </span>
              <span class="w-[30%] sm:w-[20%] text-xs font-bold text-white text-center">
                Počet
              </span>
              <span class="w-[30%] sm:w-[25%] text-xs font-bold text-white text-center">
                Odhadovaná cena
              </span>
            </div>
            <For each={[...new Set(items()?.data.map((x) => x.food))]}>
              {(food) => (
                <div class="flex items-center bg-green-hacked border-b border-green-hacked-darker text-center">
                  <span class="w-[30%] sm:w-[20%] py-2 px-3 text-sm font-medium text-white">
                    {food}
                  </span>
                  <span class="w-[30%] sm:w-[20%] text-xl font-medium text-white">
                    {itemsCount()?.get(food)}
                  </span>
                  <span class="w-[30%] sm:w-[25%] text-xl font-medium text-white">
                    {() => {
                      const priceEstm = findFood(food)?.priceEst;
                      return priceEstm
                        ? priceEstm * itemsCount().get(food)!
                        : "Žádný odhad";
                    }}
                    Kč
                  </span>
                  <span class="w-0 sm:w-[20%] sm:flex-grow p-4">
                    <img
                      class="mx-auto aspect-square h-24 rounded-2xl"
                      src={findFood(food)?.image}
                    />
                  </span>
                </div>
              )}
            </For>
          </div>
          <div class="mt-10 overflow-hidden shadow-md rounded-lg">
            <div class="py-2 flex items-center bg-green-hacked-darker text-center">
              <span class="w-[10%] text-xs font-medium text-white">#</span>
              <span class="w-[20%] text-xs font-medium text-white">Jméno</span>
              <span class="w-[20%] text-xs font-medium text-white">Jídlo</span>
              <span class="w-[20%] text-xs font-medium text-white">Den</span>
              <span class="flex-grow text-xs font-medium text-white">
                <button
                  class="mr-2 text-terminal-menu-red"
                  onClick={async () => {
                    await removeAll();
                    await refetch();
                  }}
                >
                  Odstranit vše
                </button>
              </span>
            </div>
            <For each={items()?.data}>
              {(item: FoodDBInterface, index) => (
                <div class="py-2 flex items-center bg-green-hacked border-b border-green-hacked-darker text-center">
                  <span class="w-[10%] text-sm text-white">{index() + 1}.</span>
                  <span class="w-[20%] text-sm text-white">{item.name}</span>
                  <span class="w-[20%] text-sm text-white">{item.food}</span>
                  <span class="w-[20%] text-sm text-white">{item.day}</span>
                  <span class="flex-grow text-sm text-white">
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
                  </span>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Dashboard;
