import {
  Component,
  createMemo,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { FOODS } from "./Food";

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

const fetchURLPrefix =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "";

const [authorize, setAuthorize] = createSignal<string>();
const getFoodDashboard = async (): Promise<ResponseJSONInterface> => {
  const authorization =
    authorize() == undefined ? prompt("Zadejte heslo") ?? "" : authorize();
  const response = await fetch(fetchURLPrefix + "/backend/food/db/list.php", {
    method: "POST",
    body: JSON.stringify({ secret: authorization }),
  });

  const responseValue: ResponseJSONInterface = await response.json();
  if (responseValue.result === "SUCCESS") {
    setAuthorize(authorization);
  }
  return responseValue;
};

const getItemsCount = (
  items: FoodDBInterface[] | undefined
): Map<string, number> | null => {
  if (items == undefined) {
    return null;
  }
  return items!
    .map((x) => x.food)
    .reduce((a, c) => a.set(c, (a.get(c) || 0) + 1), new Map());
};

const removeUser = async (token: string) => {
  const response = await fetch(fetchURLPrefix + "/backend/food/db/remove.php", {
    method: "POST",
    body: JSON.stringify({ token: token }),
  });
};

const Dashboard: Component = () => {
  const [items, { refetch }] = createResource(true, getFoodDashboard);
  const itemsCount = createMemo<Map<string, number> | null>(() =>
    getItemsCount(items()?.data)
  );

  return (
    <div className="mx-auto min-h-screen flex flex-col items-center">
      <button
        onclick={refetch}
        className="px-6 py-3 my-5 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
      >
        Refresh objednávek
      </button>
      <Show when={items() != undefined}>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-green-hacked-darker">
                  <tr>
                    <th className="py-3 px-6 text-xs font-bold text-white text-center">
                      Jídlo
                    </th>
                    <th className="py-3 px-6 text-xs font-bold text-white text-center">
                      Počet
                    </th>
                    <th className="py-3 px-6 text-xs font-bold text-white text-center">
                      Obrázek
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <For each={[...new Set(items()!.data.map((x) => x.food))]}>
                    {(food) => (
                      <tr className="bg-green-hacked border-b border-green-hacked-darker text-center">
                        <td className="py-4 px-6 text-sm font-medium text-white">
                          {food}
                        </td>
                        <td className="py-4 px-6 text-xl font-medium text-white">
                          {itemsCount()?.get(food)}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium mx-auto flex items-center justify-center">
                          <img
                            className="h-20"
                            src={
                              FOODS.find(
                                (e) =>
                                  e.name === food ||
                                  e.subitems?.some((s) => s.name === food)
                              )?.image
                            }
                          ></img>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
            <div className="mt-10 overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-green-hacked-darker">
                  <tr>
                    <th className="py-3 px-6 text-xs font-medium text-white">
                      #
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-white">
                      Jméno
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-white">
                      Jídlo
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-white">
                      Den
                    </th>
                    <th className="py-3 px-6 text-xs font-medium text-white"></th>
                  </tr>
                </thead>
                <tbody>
                  <For each={items()!.data}>
                    {(item: FoodDBInterface, index) => (
                      <tr className="bg-green-hacked border-b border-green-hacked-darker text-center">
                        <td className="py-4 px-6 text-sm text-white">
                          {index() + 1}.
                        </td>
                        <td className="py-4 px-6 text-sm text-white">
                          {item.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-white">
                          {item.food}
                        </td>
                        <td className="py-4 px-6 text-sm text-white">
                          {item.day}
                        </td>
                        <td className="py-4 px-6 text-sm text-white">
                          <button
                            className="mr-2 text-terminal-menu-red"
                            onclick={async () => {
                              await removeUser(item.token);
                              refetch();
                            }}
                          >
                            Odstranit
                          </button>
                          <button
                            className="text-terminal-menu-yellow"
                            onclick={() => {
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
