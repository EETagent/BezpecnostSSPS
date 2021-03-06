import type { Component } from "solid-js";

import bg from "../../assets/img/background/hackdays-bg.jpg";

import terminal from "../../assets/img/hackdays-terminal.png";
import poster from "../../assets/img/hackdays-video.png";
import terminalWebP from "../../assets/img/hackdays-terminal.webp";
import posterWebp from "../../assets/img/hackdays-video.webp";

import video from "../../assets/video/hackdays.mp4";

import Picture from "../Picture";

/**
 * Component representing Terminal mockup
 * @returns {JSX.Element}
 */
const Terminal: Component = () => {
  /**
   * Component representing terminal command
   * for color settings, etc.
   * @param {string} username UNIX user username
   * @param {string} hostname UNIX user hostname
   * @param {string} command Terminal command
   * @param {string} commadContent Command content
   * @returns {JSX.Element}
   */
  const Command: Component<{
    username: string;
    hostname: string;
    command: string;
    commandContent?: string;
  }> = (props) => {
    return (
      <div class="inline-block">
        <span class="text-terminal-user">${props.username}</span>
        <span>@{props.hostname}</span>
        <span class="ml-1 text-terminal-command">{props.command}</span>
        <span class="ml-1">{props.commandContent}</span>
      </div>
    );
  };

  return (
    <div class="w-full">
      <div
        class="px-5 pt-4 shadow-lg text-gray-100 text-sm  subpixel-antialiased 
              bg-terminal-bg pb-6 rounded-lg leading-normal overflow-hidden"
      >
        <div class="top mb-2 flex">
          <div class="h-3 w-3 bg-terminal-menu-red rounded-full" />
          <div class="ml-2 h-3 w-3 bg-terminal-menu-yellow rounded-full" />
          <div class="ml-2 h-3 w-3 bg-terminal-menu-green rounded-full" />
        </div>
        <div class="mt-4 flex flex-col leading-relaxed">
          <Command
            username="radko"
            hostname="ssps"
            command="sudo bash"
            commandContent="ssps/hackdays.sh"
          />
          <h3 class="my-3 uppercase">HackDays</h3>
          <p class="mb-3">
            <b>
              Pro velk?? z??jem bude prvn?? kon??n?? akce rozd??leno na v??ce dn?? po 16
              lidech v term??nech 4.2., 5.2. a 6.2.
            </b>
            <br />
            P??ed??asn?? zaregistrovan?? budou o podrobnostech a z??vazn?? registraci
            informov??n?? p??ednostn??. Akce se kon?? v budov?? SSP??aG v na??em
            kybernetick??m polygonu. Bude p??ichyst??n program pln?? p??edn????ek a
            praktick??ch uk??zek zavr??en?? z??v??re??nou sout?????? typu CTF ve kter??
            ????astn??ci vyu??ij?? nov?? nabyt?? znalosti. Nebude chyb??t to??en?? kofola
            ????, certifik??t o absolvov??n?? kurzu a n??hled do ofici??ln??ch
            studijn??ch materi??l?? pro prvn?? ro??n??k kybernetick?? bezpe??nosti.
            Stravov??n?? zaji??t??no po celou dobu kon??n?? akce.
            <br />
            Druh?? kon??n?? HackDays! je napl??nov??no na 26. a 27. ??nora.
          </p>
          <Command
            username="radko"
            hostname="ssps"
            command="sudo bash"
            commandContent="ssps/hackdays/info.sh"
          />
          <h3 class="my-3 uppercase">Pro koho je ud??lost ur??ena?</h3>
          <p class="mb-3">
            Hlavn?? skupinou na kterou se p??i tvorb?? obsahu soust??ed??me jsou
            studenti druh??ho stupn?? z??kladn??ch ??kol, p??esto neplat?? ????dn??
            omezen??. Nejsou vy??adov??ny ????dn?? p??edchoz?? znalosti a schopnosit -
            p??ihl??sit se m????e kdokoliv. Po registraci V??m za??leme e-mail s
            potvrzen??m a odkazem na pr??zkum znalost??. Na z??klad?? tohoto pr??zkumu
            vhodn?? nastav??me ??rove?? obt????nosti tak, aby ka??d?? z ????astn??k??
            porozum??l jednotliv??m ????stem kempu a odnesl si co nejv??ce znalost??.
          </p>
          <Command
            username="radko"
            hostname="ssps"
            command="sudo bash"
            commandContent="ssps/hackdays/cena.sh"
          />
          <p class="my-3">
            690 K?? - Sou????st?? ceny je zaji??t??n?? stravov??n??, technick??ho vybaven??
            a lektor?? kempu
          </p>
          <Command username="radko" hostname="ssps" command="exit" />
        </div>
      </div>
    </div>
  );
};

/**
 * Component representing HackDays section
 * @returns {JSX.Element}
 */
const HackDays: Component = () => {
  return (
    <section
      id="hackdays"
      class="relative flex items-center justify-center overflow-hidden"
    >
      <img
        class="absolute z-10 w-auto min-w-full min-h-full object-cover"
        src={bg}
        alt="Fotografie HackDays"
      />
      <div class="w-4/5 z-20 flex flex-col justify-center items-center my-10 lg:my-16 2xl:my-32">
        <h1 class="my-10 font-hacked text-white font-bold uppercase text-6xl md:text-8xl">
          HackDays
        </h1>
        <Terminal />
        <div class="my-10 2xl:my-16 grow flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-[48%] hover:-translate-y-1 hover:scale-105 ease-in-out duration-300 hover:cursor-pointer">
            <Picture
              media={terminal}
              mediaAlternativeWebP={terminalWebP}
              alt="Pl??n HackDays"
            />
          </div>
          <div class="mt-10 md:mt-0 md:w-[48%] hover:-translate-y-1 hover:scale-105 ease-in-out duration-300 hover:cursor-pointer">
            <Picture
              media={poster}
              mediaAlternativeWebP={posterWebp}
              alt="Upout??vka HackDays"
              gallery={[video]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HackDays;
