import { Link } from "solid-app-router";
import { Component, createSignal, Show } from "solid-js";

import bg from "../../assets/img/background/intro-bg.jpg";
import logo from "../../assets/img/logo/logo-lev.png";

/**
 * Component representing Banner
 * @param {string} text Banner content
 * @returns {JSX.Element}
 */
const Banner: Component<{ text: string }> = ({ text }) => {
  const [banner, setBanner] = createSignal(true);
  return (
    <Show when={banner()}>
      <div class="min-w-full bg-green-hacked-darker">
        <div class="mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <span class="p-2 rounded-lg">
                <svg
                  class="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </span>
              <p class="ml-3 font-medium text-white text-center md:text-left">
                {text}
              </p>
            </div>
            <div class="flex-shrink-0 sm:ml-3">
              <button
                type="button"
                onclick={() => setBanner(false)}
                class="-mr-1 flex p-2 rounded-mdfocus:ring-white sm:-mr-2"
              >
                <span class="sr-only">Zavřít</span>
                <svg
                  class="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

/**
 * Component representing Intro section
 * @returns {JSX.Element}
 */
const Intro: Component = () => {
  return (
    <div className="flex flex-col">
      <Banner text="" />
      <section
        id="info"
        className="relative flex justify-center bg-black  w-screen min-h-screen"
      >
        <img
          className="absolute z-10 w-auto min-w-full min-h-full object-cover h-screen"
          src={bg}
          alt="Fotografie kybernetické serverovny"
        />
        <div className="mt-[12%] w-4/5 z-20 flex flex-col h-1/2 items-center md:items-start">
          <h2 className="font-sans text-white font-light uppercase md:text-5xl 2xl:text-7xl">
            Kybernetická
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <h1 className="mt-3 font-sans text-white font-bold uppercase text-3xl md:text-7xl 2xl:text-9xl">
              Bezpečnost
            </h1>
            <img
              src={logo}
              className="h-16 2xl:h-20 mt-8 md:mt-0 md:h-6 md:mb-10"
              alt="Logo"
            />
          </div>

          <p className="mt-5 text-justify leading-normal md:text-left text-white text-sm font-supply lg:text-base 2xl:text-lg">
            Nejnovější studijní obor na Smíchovské střední průmyslové škole
            poskytuje studentům znalosti informačních technologií se
            specializací na&nbsp;bezpečnost v&nbsp;prostoru kybernetiky.
            V&nbsp;dnešním rychle rozvíjejícím se světě informačních technologií
            je třeba mít specialisty, kteří budou schopni chránit instituce,
            firmy a&nbsp;další subjekty před kybernetickými hrozbami
            a&nbsp;zasáhnout proti hrozícímu nebezpečí.Jsme jedinou školou
            v&nbsp;Praze,&nbsp; která tento obor nabízí, protože víme, co&nbsp;
            je ve světě IT prioritní. Pořádáme besedy a&nbsp;přednášky na tato
            témata a&nbsp;také pravidelně pořádáme HackDays, kde žákům
            základních škol předáváme znalosti a&nbsp;přibližujeme jim
            problematiku kybernetické bezpečnosti.
          </p>
          <div className="mt-10 flex flex-col items-center justify-between md:flex-row">
            <div>
              <Link
                href="about"
                className="px-6 py-3 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
              >
                Zjistit více
              </Link>
            </div>
            <div className="my-10 md:my-0 md:ml-5">
              <a
                rel="external"
                href="#registrace"
                className="px-6 py-3 rounded-3xl bg-blue-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-blue-hacked-darker hover:cursor-pointer"
              >
                Registrace <span className="font-hacked">HackDays</span>!
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Intro;
