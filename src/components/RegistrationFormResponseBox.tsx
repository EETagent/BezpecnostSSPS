import { Component, Match, Switch } from "solid-js";
const SvgButton: Component<{ callback?: VoidFunction }> = ({ callback }) => {
  return (
    <svg
      onclick={callback}
      className="block h-6 w-6 transform transition duration-500 hover:scale-125"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};
const ResponseBox: Component<{ text: string; callback?: VoidFunction }> = ({
  text,
  callback,
}) => {
  return (
    <Switch>
      <Match when={text === "E-mail úspěšně odeslán"}>
        <div className="mt-10 py-5 px-7 rounded-2xl bg-response-success border-solid border-green-700  text-center font-supply">
          <div className="flex flex-row justify-between">
            <span className="text-green-700">{text}</span>
            <SvgButton callback={callback} />
          </div>
        </div>
      </Match>
      <Match when={text === "Chybná reCAPTCHA" || text === "Chyba serveru"}>
        <div className="mt-10 py-5 px-7 rounded-2xl bg-response-error border-solid border-red-800  text-center font-supply">
          <div className="flex flex-row justify-between">
            <span className="text-red-800">{text}</span>
            <SvgButton callback={callback} />
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default ResponseBox;
