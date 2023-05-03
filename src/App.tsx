import { Component, lazy } from "solid-js";
import { Route, Routes } from "@solidjs/router";

import NavBar from "./components/NavBar";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const Food = lazy(() => import("./pages/Food/[id]"));
const Dashboard = lazy(() => import("./pages/Food/Dashboard"));
const Generator = lazy(() => import("./pages/Food/Generator"));

/**
 * Component representing app root
 * @returns {JSX.Element}
 */
const App: Component = () => {
  return (
    <div class="">
      <header class="sticky top-0 z-50">
        <NavBar />
      </header>
      <main class="relative bg-black overflow-x-hidden">
        <Routes>
          <Route
            path="/*all"
            element={() => {
              About.preload();
              return <Home />;
            }}
          />
          <Route path="/about" element={<About />} />
          <Route path="/food/ucastnik/:id" element={<Food />} />
          <Route path="/food/dashboard/" element={<Dashboard />} />
          <Route path="/food/generate/" element={<Generator />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
