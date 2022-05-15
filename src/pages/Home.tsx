import { Component } from "solid-js";

import Intro from "../components/Home/Intro";
import HackDays from "../components/Home/HackDays";
import Events from "../components/Home/Events";
import Gallery from "../components/Home/Gallery";
import HackDaysRegistrace from "../components/Home/Registration";
import Partners from "../components/Home/Partners";
import Kontakt from "../components/Home/Kontakt";

/**
 * Component representing home page
 * @returns {JSX.Element}
 */
const Home: Component = () => {
  return (
    <>
      <Intro />
      <HackDays />
      <Events />
      <Gallery />
      <HackDaysRegistrace />
      <Partners />
      <Kontakt />
    </>
  );
};

export default Home;
