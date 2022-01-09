import { Component, lazy } from "solid-js";
import { Route, Routes } from "solid-app-router";

import NavBar from "./components/NavBar";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const App: Component = () => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main className="relative bg-black">
        <Routes>
          <Route path="/*all" element={<Home />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </main>
    </>
  );
};

export default App;
