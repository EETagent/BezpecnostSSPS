import type { Component } from "solid-js";

import bg from "../../assets/img/background/hackdays-bg.jpg";

import terminal from "../../assets/img/hackdays-terminal.png";
import poster from "../../assets/img/hackdays-video.png";
import terminalWebP from "../../assets/img/hackdays-terminal.webp";
import posterWebp from "../../assets/img/hackdays-video.webp";

import video from "../../assets/video/hackdays.mp4";

// @ts-ignore
import "fslightbox";

const HackDaysItem: Component<{
  media: string;
  mediaAlternative: string;
  alt: string;
  video?: string;
  left: boolean;
}> = ({ media: media, mediaAlternative: mediaWebP, alt, video, left }) => {
  const MediaLightbox = (name: string) => {
    // @ts-ignore
    const lightbox = new FsLightbox();
    lightbox.props.sources = [name];
    lightbox.open();
  };

  return (
    <picture
      className={`w-[80%] sm:w-[60%] md:w-[45%] mt-10 hover:-translate-y-1 hover:scale-110 ease-in-out duration-300 hover:cursor-pointer ${
        left ? "md:mr-16" : ""
      }`}
    >
      <source srcset={mediaWebP} type="image/webp" />
      <img
        src={media}
        onClick={() => {
          video != null ? MediaLightbox(video) : MediaLightbox(media);
        }}
        alt={alt}
      />
    </picture>
  );
};

const Terminal: Component = () => {
  const Command: Component<{
    username: string;
    hostname: string;
    command: string;
    commandContent?: string;
  }> = ({ username, hostname, command, commandContent }) => {
    return (
      <div className="inline-block">
        <span className="text-terminal-user">${username}</span>
        <span>@{hostname}</span>
        <span className="ml-1 text-terminal-command">{command}</span>
        <span className="ml-1">{commandContent}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div
        className="px-5 pt-4 shadow-lg text-gray-100 text-sm  subpixel-antialiased 
              bg-terminal-bg pb-6 rounded-lg leading-normal overflow-hidden"
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 bg-terminal-menu-red rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-terminal-menu-yellow rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-terminal-menu-green rounded-full"></div>
        </div>
        <div className="mt-4 flex flex-col leading-relaxed">
          <Command
            username="radko"
            hostname="ssps"
            command="sudo bash"
            commandContent="ssps/hackdays.sh"
          />
          <h3 className="my-3 uppercase">HackDays</h3>
          <p className="mb-3">
            <b>
              Pro velký zájem bude první konání akce rozděleno na více dnů po 16
              lidech v termínech 4.2., 5.2. a 6.2.
            </b>
            <br />
            Předčasně zaregistrovaní budou o podrobnostech a závazné registraci
            informování přednostně. Akce se koná v budově SSPŠaG v našem
            kybernetickém polygonu. Bude přichystán program plný přednášek a
            praktických ukázek završený závěrečnou soutěží typu CTF ve které
            účastníci využijí nově nabyté znalosti. Nebude chybět točená kofola
            😋, certifikát o absolvování kurzu a náhled do oficiálních
            studijních materiálů pro první ročník kybernetické bezpečnosti.
            Stravování zajištěno po celou dobu konání akce.
            <br />
            Druhé konání HackDays! je naplánováno na 26. a 27. února.
          </p>
          <Command
            username="radko"
            hostname="ssps"
            command="sudo bash"
            commandContent="ssps/hackdays/info.sh"
          />
          <h3 className="my-3 uppercase">Pro koho je událost určena?</h3>
          <p className="mb-3">
            Hlavní skupinou na kterou se při tvorbě obsahu soustředíme jsou
            studenti druhého stupně základních škol, přesto neplatí žádná
            omezení. Nejsou vyžadovány žádné předchozí znalosti a schopnosit -
            přihlásit se může kdokoliv. Po registraci Vám zašleme e-mail s
            potvrzením a odkazem na průzkum znalostí. Na základě tohoto průzkumu
            vhodně nastavíme úroveň obtížnosti tak, aby každý z účastníků
            porozuměl jednotlivým částem kempu a odnesl si co nejvíce znalostí.
          </p>
          <Command
            username="radko"
            hostname="ssps"
            command="sudo bash"
            commandContent="ssps/hackdays/cena.sh"
          />
          <p className="my-3">
            690 Kč - Součástí ceny je zajištění stravování, technického vybavení
            a lektorů kempu
          </p>
          <Command username="radko" hostname="ssps" command="exit" />
        </div>
      </div>
    </div>
  );
};

const HackDays: Component = () => {
  return (
    <section
      id="hackdays"
      className="relative flex items-center justify-center overflow-hidden"
    >
      <img
        className="absolute z-10 w-auto min-w-full min-h-full object-cover"
        src={bg}
        alt="Fotografie HackDays"
      />
      <div className="w-4/5 z-20 flex flex-col justify-center items-center my-10 lg:my-16 2xl:my-32">
        <h1 className="my-10 font-hacked text-white font-bold uppercase text-6xl md:text-8xl">
          HackDays
        </h1>
        <Terminal/>
        <div className="my-10 2xl:my-16 grow flex flex-col md:flex-row items-center justify-between">
          <HackDaysItem
            media={terminal}
            mediaAlternative={terminalWebP}
            alt="Plán HackDays"
            left={true}
          />
          <HackDaysItem
            media={poster}
            mediaAlternative={posterWebp}
            alt="Upoutávka HackDays"
            video={video}
            left={false}
          />
        </div>
      </div>
    </section>
  );
};
export default HackDays;
