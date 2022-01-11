import type { Component } from "solid-js";

import facebook from "../../assets/img/icons/facebook.svg";
import youtube from "../../assets/img/icons/youtube.svg";
import github from "../../assets/img/icons/github.svg";

const Kontakt: Component = () => {
  return (
    <section id="kontakt" className="bg-black min-h-[80vh] flex justify-center ">
      <div className="w-4/5 flex flex-col items-center my-10 lg:my-16 2xl:my-32">
        <h1 className="mt-8 uppercase text-white font-supply text-5xl md:text-7xl">
          Kontakt
        </h1>
        <div className="my-8 flex flex-col md:flex-row w-full justify-center grow">
          <iframe
            className="h-full w-full grayscale"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.585499539144!2d14.403756315717864!3d50.075323879425355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f900b7ea9b%3A0x95c769fe93886135!2zU23DrWNob3Zza8OhIHN0xZllZG7DrSBwcsWvbXlzbG92w6EgxaFrb2xhIGEgZ3ltbsOheml1bQ!5e0!3m2!1scs!2scz!4v1639929331283!5m2!1scs!2scz"
            style="border:0;"
          ></iframe>
          <div className="md:ml-8 mt-8 md:mt-0 flex flex-col text-white font-supply">
            <p>Preslova 72/25 Praha 5 - Smíchov 150 21</p>
            <a
              href="mailto:kb@ssps.cz"
              className="underline hover:text-zinc-300"
            >
              kb@ssps.cz
            </a>
            <a
              href="mailto:registrace@hackdays.eu"
              className="underline hover:text-zinc-300"
            >
              registrace@hackdays.eu
            </a>
            <a
              href="https://ssps.cz"
              target="_blank"
              className="underline hover:text-zinc-300"
            >
              Webové stránky školy
            </a>
            <span className="mt-3 mb-1 inline-flex items-center">
              <img src={facebook} className="h-5 mr-2" alt="Facebook ikonka" />
              <a
                target="_blank"
                href="https://www.facebook.com/kybernetickaBezpecnostSSPS/"
                className="underline hover:text-zinc-300"
              >
                Facebook
              </a>
            </span>
            <span className="mt-2 inline-flex items-center">
              <img src={youtube} className="h-5 mr-2" alt="YouTube ikonka" />
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCwsDbR-Y_PctzZGvEIf_dOQ"
                className="underline hover:text-zinc-300"
              >
                YouTube kanál
              </a>
            </span>
            <span className="mt-2 inline-flex items-center">
              <img src={github} className="h-5 mr-2" alt="GitHub maskot" />
              <a
                target="_blank"
                href="https://github.com/EETagent/BezpecnostSSPS"
                className="underline hover:text-zinc-300"
              >
                GitHub repozitář
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Kontakt;
