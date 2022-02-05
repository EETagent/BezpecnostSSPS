import { Component, createResource, createSignal, For, Show } from "solid-js";

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
const getFoodDashboard = async (): Promise<ResponseJSONInterface> => {
  const authorization =
    authorize() == undefined ? prompt("Zadejte heslo") ?? "" : authorize();
  const response = await fetch("/backend/food/db/list.php", {
    method: "POST",
    body: JSON.stringify({ secret: authorization }),
  });

  const responseValue: ResponseJSONInterface = await response.json();
  if (responseValue.result === "SUCCESS") {
    setAuthorize(authorization);
  }
  return responseValue;
};

const removeUser = async (token: string) => {
  const response = await fetch("/backend/food/db/remove.php", {
    method: "POST",
    body: JSON.stringify({ token: token }),
  });
};

const Dashboard: Component = () => {
  const [items, { refetch }] = createResource(true, getFoodDashboard);

  return (
    <div className="mx-auto min-h-screen flex flex-col items-center">
      <Show when={items() != undefined}>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
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
                      <th className="py-3 px-6 text-xs font-medium text-white">
                        <button
                          className="mr-2 text-terminal-menu-green"
                          onclick={refetch}
                        >
                          Reload
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={items()!.data}>
                      {(item: FoodDBInterface, index) => (
                        <tr className="bg-green-hacked border-b dark:border-gray-700">
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
                                    item.token
                                      .replace(".", "@")
                                      .replace(".", "@")
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
        </div>
      </Show>
    </div>
  );
};

export default Dashboard;
