import type { Component } from "solid-js";

import bg from "../assets/img/background/intro-bg.jpg";
import logo from "../assets/img/logo/logo-lev.png";

const Intro: Component = () => {
  return (
    <div
      id="about"
      className="relative flex md:items-center justify-center overflow-y-scroll bg-black h-screen"
    >
      <img
        className="absolute z-10 w-auto min-w-full min-h-full object-cover h-screen"
        src={bg}
      />
      <div className="w-4/5 z-20 flex flex-col h-1/2 items-center md:items-start">
        <h2 className="font-sans text-white font-light uppercase md:text-5xl">
          Kybernetická
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="mt-3 font-sans text-white font-bold uppercase text-3xl md:text-7xl">
            Bezpečnost
          </h1>
          <img
            src={logo}
            className="h-16 mt-8 md:mt-0 md:h-6 md:mb-10"
            alt=""
          />
        </div>

        <p className="mt-5 text-justify leading-normal md:text-left text-white text-sm font-supply">
          Nejnovější studijní obor na Smíchovské střední průmyslové škole
          poskytuje studentům znalosti informačních technologií se specializací
          na&nbsp;bezpečnost v&nbsp;prostoru kybernetiky. V&nbsp;dnešním rychle
          rozvíjejícím se světě informačních technologií je třeba mít
          specialisty, kteří budou schopni chránit instituce, firmy a&nbsp;další
          subjekty před kybernetickými hrozbami a&nbsp;zasáhnout proti hrozícímu
          nebezpečí.Jsme jedinou školou v&nbsp;Praze,&nbsp; která tento obor
          nabízí, protože víme, co&nbsp; je ve světě IT prioritní. Pořádáme
          besedy a&nbsp;přednášky na tato témata a&nbsp;také pravidelně pořádáme
          HackDays, kde žákům základních škol předáváme znalosti
          a&nbsp;přibližujeme jim problematiku kybernetické bezpečnosti.
        </p>
        <div className="mt-10">
          <a
            href="#"
            className="mt-6 px-6 py-3 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
          >
            Zjistit více
          </a>
        </div>
      </div>
    </div>
  );
};
export default Intro;
