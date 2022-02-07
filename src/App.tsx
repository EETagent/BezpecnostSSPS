import { Component, lazy } from "solid-js";
import { Route, Routes } from "solid-app-router";

import NavBar from "./components/NavBar";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const Food = lazy(() => import("./pages/Food/[id]"));
const Dashboard = lazy(() => import("./pages/Food/Dashboard"));

const App: Component = () => {
  return (
    <div className="">
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main className="relative bg-black overflow-x-hidden">
        <Routes>
          <Route path="/*all" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/food/ucastnik/:id" element={<Food />} />
          <Route path="/food/dashboard/" element={<Dashboard />} />

        </Routes>
      </main>
    </div>
  );
};

export default App;
