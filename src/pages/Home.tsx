import { Component } from "solid-js";

import Events from "../components/Home/Events";
import HackDays from "../components/Home/HackDays";
import Intro from "../components/Home/Intro";
import Kontakt from "../components/Home/Kontakt";
import HackDaysRegistrace from "../components/Home/Registration";
import Gallery from "../components/Home/Gallery";

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
      <Kontakt />
    </>
  );
};

export default Home;
