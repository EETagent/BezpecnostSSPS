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

const getFoodDashboard = async (): Promise<ResponseJSONInterface> => {
  const response = await fetch(
    "http://localhost:8000/backend/food/db/list.php",
    {
      method: "POST",
    }
  );

  const responseValue: ResponseJSONInterface = await response.json();
  console.log(responseValue);
  return responseValue;
};

const removeUser = async (token: string) => {
  const response = await fetch(
    "http://localhost:8000/backend/food/db/remove.php",
    {
      method: "POST",
      body: JSON.stringify({ token: token }),
    }
  );
};

const Dashboard: Component = () => {
  const [items, { mutate, refetch }] = createResource(true, getFoodDashboard);

  return (
    <div className="mx-auto min-h-screen flex flex-col items-center">
      <Show when={items() != undefined}>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-6 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400">
                        #
                      </th>
                      <th className="py-3 px-6 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400">
                        Jméno
                      </th>
                      <th className="py-3 px-6 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400">
                        Jídlo
                      </th>
                      <th className="py-3 px-6 text-xs font-medium text-left text-gray-700 uppercase dark:text-gray-400">
                        Den
                      </th>
                      <th className="relative py-3 px-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={items()!.data}>
                      {(item: FoodDBInterface, index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {index() + 1}.
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {item.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {item.food}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {item.day}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
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
