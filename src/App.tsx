import type { Component } from "solid-js";

import NavBar from "./components/NavBar";
import Intro from "./pages/Intro";
import HackDays from "./pages/HackDays";
import HackDaysRegistrace from "./pages/Registration";
import Kontakt from "./pages/Kontakt";
import Events from "./pages/Events";

const App: Component = () => {
  return (
    <div>
      <NavBar />
      <Intro />
      <HackDays />
      <Events />
      <HackDaysRegistrace />
      <Kontakt />
    </div>
  );
};

export default App;
