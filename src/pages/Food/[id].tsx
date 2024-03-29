import { useParams } from "@solidjs/router";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import SvgCloseButton from "../../components/SvgCloseButton";
import { FoodInterface, FOODS, FOODCATEGORIES, FoodCategories } from "./Food";
import RYBICKY from "./_easterEgg";

interface TokenInterface {
  name: string;
  surname: string;
  day: string;
}

interface ResponseJSONInterface {
  result: string;
  error?: string;
}

enum FormResponse {
  NOTSENT,
  SUCCESS,
  ERROR,
}

/**
 * Function validating token
 * @async
 * @function validateToken
 * @param {string} token Token
 * @returns {<Promise<boolean>} Is token valid?
 */
const validateToken = async (token: string): Promise<boolean> => {
  const response = await fetch("/backend/food/validate.php", {
    method: "POST",
    body: JSON.stringify({ token: token }),
  });

  const responseValue: ResponseJSONInterface = await response.json();
  return responseValue.result === "true";
};

/**
 * Function parsing JWT
 * @async
 * @function parseToken
 * @param {string} token Token
 * @returns {Promise<TokenInterface | null>} Returns
 */
const parseToken = async (token: string): Promise<TokenInterface | null> => {
  const isValid = await validateToken(token);
  if (isValid === true) {
    return JSON.parse(decodeURIComponent(escape(atob(token.split(".")[1]))));
  }
  return null;
};

/**
 * Component representing food selection page
 * @returns {JSX.Element}
 */
const Food: Component = () => {
  const params = useParams();

  const token = params.id.replace("@", ".").replace("@", ".");
  const [visitor] = createResource(() => token, parseToken);

  const [filter, setFilter] = createSignal<string>(FoodCategories.ALL);
  const [selectedFood, setSelectedFood] = createSignal<string | null>();
  const [submitStatus, setSubmitStatus] = createSignal<FormResponse>(
    FormResponse.NOTSENT
  );

  /**
   * Submit selected food
   * @async
   * @function submit
   * @return {Promise<void>}
   */
  const submit = async (): Promise<void> => {
    const response = await fetch("/backend/food/db/add.php", {
      method: "POST",
      body: JSON.stringify({ token: token, food: selectedFood() }),
    });

    const responseValue: ResponseJSONInterface = await response.json();
    if (responseValue.result === "SUCCESS") {
      setSubmitStatus(FormResponse.SUCCESS);
    } else if (responseValue.result === "ERROR") {
      setSubmitStatus(FormResponse.ERROR);
    }
  };

  /**
   * Component representing food selection item
   * @param {FoodInterface} food Presented food
   * @returns {JSX.Element}
   */
  const FoodSquare: Component<{ food: FoodInterface }> = (props) => {
    const [clicked, setClicked] = createSignal(false);

    const setFood = (name: string) =>
      selectedFood() !== name ? setSelectedFood(name) : setSelectedFood(null);

    const Item: Component<{
      name: string;
      image: string;
      onClick?: VoidFunction;
    }> = (props) => {
      const [selected, setSelected] = createSignal<boolean>(false);
      createEffect(() => {
        selectedFood() === props.name ? setSelected(true) : setSelected(false);
      });
      return (
        <div
          onClick={props.onClick}
          class="group relative bg-white rounded-3xl text-black text-6xl hover:-translate-y-1 hover:scale-110 ease-in-out duration-300 hover:cursor-pointer"
        >
          <img
            class="z-0 h-full w-full aspect-square object-cover rounded-3xl"
            src={props.image}
          />
          <div class="z-10 top-0 w-full h-full flex items-center justify-center absolute text-white break-words text-[30%] md:text-[40%] xl:text-[50%] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out delay-700 duration-300 text-center rounded-3xl border-solid border border-white bg-black ">
            {props.name}
          </div>
          <div class="flex sm:hidden z-10 items-center justify-center absolute w-[65%] h-[15%] left-0 -bottom-[5%] rounded-full bg-orange-700 text-white text-xs text-center leading-4">
            <span class="p-3 text-[40%]">{props.name}</span>
          </div>
          <Show when={selected()}>
            <div class="z-10 flex items-center justify-center absolute w-[15%] h-[15%] right-0 -top-[5%] rounded-full bg-green-700 text-white text-xs text-center leading-4">
              ✓
            </div>
          </Show>
        </div>
      );
    };

    return (
      <Show when={props.food.categories.some((e) => filter() === e)}>
        <Item
          name={props.food.name}
          onClick={() => {
            setClicked(!clicked());
            if (props.food.subitems == null) {
              setFood(props.food.name);
            }
          }}
          image={props.food.image}
        />
        <Show when={clicked()}>
          <For each={props.food.subitems}>
            {(subitem) => (
              <Show when={subitem.categories.some((e) => filter() === e)}>
                <Item
                  name={subitem.name}
                  image={subitem.image}
                  onClick={() => setFood(subitem.name)}
                />
              </Show>
            )}
          </For>
        </Show>
      </Show>
    );
  };

  /**
   * Component representing response box
   * @returns {JSX.Element}
   */
  const ResponseBox = () => {
    return (
      <Show
        when={submitStatus() === FormResponse.SUCCESS}
        fallback={() => (
          <div class="p-4 rounded-2xl bg-response-error border-solid border-red-800 text-center font-supply">
            <div class="flex flex-row justify-between">
              <span class="text-red-800">Chyba</span>
              <SvgCloseButton
                callback={() => setSubmitStatus(FormResponse.NOTSENT)}
              />
            </div>
          </div>
        )}
      >
        <div class="p-4 rounded-2xl bg-response-success border-solid border-green-700 text-center font-supply">
          <div class="flex flex-row justify-between">
            <span class="text-green-700">Výběr uložen</span>
            <SvgCloseButton
              callback={() => setSubmitStatus(FormResponse.NOTSENT)}
            />
          </div>
        </div>
      </Show>
    );
  };

  return (
    <div class="w-[80%] mx-auto min-h-screen flex flex-col items-center">
      <Show when={visitor() !== undefined && visitor() !== null}>
        <div
          class="w-full mt-10 p-3 rounded-3xl text-white flex items-center justify-center"
          style={{
            background:
              "repeating-linear-gradient(-45deg,black,black 10px,#444 10px,#444 11px)",
          }}
        >
          <div class="font-bold text-4xl">
            {
              <Show when={!selectedFood()} fallback={selectedFood()}>
                {visitor()?.name}
              </Show>
            }
          </div>
        </div>
        <Show when={!selectedFood()}>
          <select
            class="w-[90%] my-10 mx-auto rounded-3xl font-supply text-white text-xl p-4 bg-green-hacked"
            style={{ "-webkit-appearance": "none" }}
            onChange={(e) => setFilter(e.currentTarget.value)}
          >
            <For each={FOODCATEGORIES}>
              {(item) => <option value={item}>{item}</option>}
            </For>
          </select>
        </Show>
        <Show when={selectedFood() != null}>
          <div class="w-full flex justify-center my-10">
            <Show when={submitStatus() != FormResponse.NOTSENT}>
              <div class="w-full mr-3">
                <ResponseBox />
              </div>
            </Show>
            <button
              onClick={submit}
              class="w-1/2 px-6 py-4 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
            >
              Odeslat
            </button>
          </div>
        </Show>

        <div class="w-[90%] grid grid-cols-2 md:grid-cols-3 gap-10">
          <For each={[...FOODS, RYBICKY]}>
            {(food) => <FoodSquare food={food} />}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default Food;
