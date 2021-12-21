import type { Component } from "solid-js";

import Header from "./components/Header";
import Intro from "./pages/Intro";
// @ts-ignore
import HackDays from "./pages/HackDays";
import HackDaysRegistrace from "./pages/Registration";
import Kontakt from "./pages/Kontakt";

const App: Component = () => {
  return (
    <div>
      <Header />
      <Intro />
      <HackDays />
      <HackDaysRegistrace />
      <Kontakt />
    </div>
  );
}

export default App;
