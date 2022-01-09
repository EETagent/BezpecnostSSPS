import type { Component } from "solid-js";

import Header from "./components/Header";
import Intro from "./pages/Intro";
import HackDays from "./pages/HackDays";
import HackDaysRegistrace from "./pages/Registration";
import Kontakt from "./pages/Kontakt";
import Events from "./pages/Events";

const App: Component = () => {
  return (
    <div>
      <Header />
      <Intro />
      <HackDays />
      <Events />
      <HackDaysRegistrace />
      <Kontakt />
    </div>
  );
};

export default App;
