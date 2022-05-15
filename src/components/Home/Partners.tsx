import { Component, For } from "solid-js";

const partnersImages = import.meta.globEager("../../assets/img/partners/*.png");

const partnestAll = [
  "ssps",
  "kypo",
  "cvut",
  "nextzone",
  "copsu",
  "frengp",
  "gymso",
  "infis",
  "isste",
  "pslib",
  "sosehl",
  "spos",
  "sps-cl",
  "spscv",
  "spse",
  "spseol",
  "spsmb",
  "spsoa",
  "spsostrov",
  "spspi",
  "spspzlin",
  "spsseio",
  "spssou-pe",
  "spsul",
  "cichnova",
  "sssi",
  "ssto",
  "vda",
];

/**
 * Component representing Partner item
 * @returns {JSX.Element}
 */
const Partner: Component<{ name: string }> = (props) => {
  const getImageSrc = (name: string): string =>
    partnersImages[`../../assets/img/partners/${name}.png`].default;
  return (
    <div class="grayscale hover:grayscale-0 flex items-center justify-center">
      <img
        class="w-full h-full object-scale-down"
        src={getImageSrc(props.name)}
        alt={props.name}
      />
    </div>
  );
};

/**
 * Component representing Parnters section
 * @returns {JSX.Element}
 */
const Partners: Component = () => {
  return (
    <section
      id="partneri"
      class="mt-10 lg:mt-16 2xl:mt-32 flex flex-col justify-center items-center bg-black"
    >
      <h1 class=" font-sans text-white font-bold uppercase text-3xl md:text-7xl">
        Spolupracujeme
      </h1>
      <div
        class="mt-10 w-4/5 p-10 grid grid-cols-3 md:grid-cols-5 gap-7"
        style="background: repeating-linear-gradient(
            -45deg,
            black,
            black 10px,
            #444 10px,
            #444 11px
          );"
      >
        <For each={partnestAll}>
          {(partner: string) => (
            <div>
              <Partner name={partner} />
            </div>
          )}
        </For>
      </div>
    </section>
  );
};

export default Partners;
