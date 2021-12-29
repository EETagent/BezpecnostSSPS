import { Accessor, Component, Show } from "solid-js";
import { createSignal } from "solid-js";

import logo from "../assets/img/logo/logo-web.svg";

const MenuButton: Component<{
  onClick: VoidFunction;
  isMenuOpened: Accessor<boolean>;
}> = ({ onClick, isMenuOpened }) => {
  return (
    <button
      aria-controls="mobile-menu"
      onclick={onClick}
      className="transform transition duration-500 hover:scale-110 focus:outline-none"
    >
      <svg viewBox="0 0 32 36" className="h-10 stroke-green-hacked stroke-2">
        {/* Fešné SVG vypůjčeno z Haxagon.cz, zbytek poctivá práce :) */}
        <path
          data-v-21716efb=""
          d="M15.5079 34.8482L1 26.4243V9.57571L15.5079 1.15178L30.5 9.58485V26.4152L15.5079 34.8482Z"
        ></path>
      </svg>
      <div
        className={`block absolute  left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        {" "}
        <span
          className={`block absolute h-0.5 w-4 text-white bg-current transform transition duration-500 ease-in-out" ${
            isMenuOpened() ? "rotate-45" : "-translate-y-1.5"
          }`}
        ></span>{" "}
        <span
          className={`block absolute h-0.5 w-2 text-white bg-current transform transition duration-500 ease-in-out" ${
            isMenuOpened() ? "opacity-0" : ""
          }`}
        ></span>{" "}
        <span
          className={`block absolute h-0.5 w-4 text-white bg-current transform transition duration-500 ease-in-out ${
            isMenuOpened() ? "-rotate-45" : "translate-y-1.5"
          }`}
        ></span>{" "}
      </div>
    </button>
  );
};

const MenuItem: Component<{
  href: string;
  description: string;
}> = ({ href, description }) => {
  return (
    <a
      href={href}
      className={`hover:bg-green-hacked-darker hover:text-white px-3 py-2 rounded-md text-sm  uppercase text-gray-300`}
    >
      {description}
    </a>
  );
};

const MenuItemCompact: Component<{
  href: string;
  description: string;
  onClick: VoidFunction;
}> = ({ href, description, onClick }) => {
  return (
    <a
      onClick={onClick}
      href={href}
      className="text-white hover:bg-green-hacked-darker  block mx-10 px-3 py-2 rounded-md text-base  uppercase"
    >
      {description}
    </a>
  );
};

const Navigation: Component = () => {
  const [isOpened, setIsOpened] = createSignal<boolean>(false);

  return (
    <nav className="bg-black sticky top-0 z-50 font-supply">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center md:justify-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block order-1">
              <div className="flex items-baseline">
                <MenuItem href="#about" description="O nás" />
                <MenuItem href="#hackdays" description="HackDays" />
              </div>
            </div>
            <div className="mx-3 flex-shrink-0 order-2 transform transition duration-500 hover:scale-110">
              <a href="/" className="hover:cursor-pointer">
                <img className="h-10 w-10 " src={logo} alt="Root" />
              </a>
            </div>
            <div className="hidden md:block order-3">
              <div className="flex items-baseline">
                <MenuItem href="#akce" description="Akce" />

                <MenuItem href="#kontakt" description="Kontakt" />
              </div>
            </div>
          </div>
          <div className="mx-3 md:hidden">
            <MenuButton
              onClick={() => setIsOpened(!isOpened())}
              isMenuOpened={isOpened}
            />
          </div>
        </div>
      </div>
      <Show when={isOpened()}>
        <div
          className="md:hidden"
          style="background: repeating-linear-gradient(
            -45deg,
            black,
            black 10px,
            #444 10px,
            #444 11px
          );"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="#"
              description="O nás"
            />
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="#hackdays"
              description="HackDays"
            />
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="#akce"
              description="Akce"
            />
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="#kontakt"
              description="Kontakt"
            />
          </div>
        </div>
      </Show>
    </nav>
  );
};

export default Navigation;
