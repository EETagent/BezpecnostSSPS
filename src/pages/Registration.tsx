import { Component } from "solid-js";

import RegistrationForm from "../components/RegistrationForm";
import bg from "../assets/img/background/registrace-bg.jpg";

const HackDaysRegistrace: Component = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden ">
      <img
        className="absolute z-10 w-auto min-w-full min-h-full object-cover"
        src={bg}
      />
      <div className="z-20 flex flex-col w-4/5 items-center md:items-start my-10 lg:my-16 2xl:my-32">
        <h2 className="font-sans text-white font-light uppercase md:text-5xl">
          Nezávazná
        </h2>
        <h1 className="mt-3 font-sans text-white font-bold uppercase text-3xl md:text-7xl">
          Registrace
        </h1>
        <RegistrationForm />
      </div>
    </div>
  );
};
export default HackDaysRegistrace;
