import { Component, Show } from "solid-js";
import { createSignal } from "solid-js";

import logo from "../assets/img/logo/logo-web.svg";

const MenuButtonBurger: Component = () => {
  return (
    <svg
      className="block h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

const MenuButtonCross: Component = () => {
  return (
    <svg
      className="block h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};

const MenuItem: Component<{
  name: string;
  description: string;
  currentPage?: string;
}> = ({ name, description, currentPage }) => {
  const href: string = "#" + name;
  return (
    <a
      href={href}
      className={
        currentPage === name
          ? "text-white underline hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm  uppercase "
          : "text-gray-300 hover:bg-gray-700 hover:text-white px-3  py-2 rounded-md text-sm  uppercase "
      }
    >
      {description}
    </a>
  );
};

const Navigation: Component<{ currentPage?: string }> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <nav className="bg-black sticky top-0 z-50 font-supply">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center md:justify-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block order-1">
              <div className="flex items-baseline">
                <MenuItem
                  name="about"
                  description="O nás"
                  currentPage={currentPage}
                />
                <MenuItem
                  name="hackdays"
                  description="HackDays"
                  currentPage={currentPage}
                />
              </div>
            </div>
            <div className="ml-3 mr-3 flex-shrink-0 order-2 transform transition duration-500 hover:scale-110">
              <a href="/" className="hover:cursor-pointer">
                <img className="h-10 w-10 " src={logo} alt="Root" />
              </a>
            </div>
            <div className="hidden md:block order-3">
              <div className="flex items-baseline">
                <MenuItem
                  name="akce"
                  description="Akce"
                  currentPage={currentPage}
                />

                <MenuItem
                  name="kontakt"
                  description="Kontakt"
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen())}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Otevřít hlavní menu</span>
              <Show when={isOpen()} fallback={() => <MenuButtonCross />}>
                <MenuButtonBurger />
              </Show>
            </button>
          </div>
        </div>
      </div>
      <Show when={isOpen()}>
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
            <a
              onClick={() => setIsOpen(!isOpen())}
              href="#about"
              className="text-white hover:bg-gray-700 block mx-10 px-3 py-2 rounded-md text-base  uppercase"
            >
              O nás
            </a>

            <a
              onClick={() => setIsOpen(!isOpen())}
              href="#hackdays"
              className="text-gray-300 hover:bg-gray-700 hover:text-white mx-10 block px-3 py-2 rounded-md text-base  uppercase"
            >
              HackDays
            </a>

            <a
              onClick={() => setIsOpen(!isOpen())}
              href="#akce"
              className="text-gray-300 hover:bg-gray-700 hover:text-white mx-10 block px-3 py-2 rounded-md text-base  uppercase"
            >
              Akce
            </a>

            <a
              onClick={() => setIsOpen(!isOpen())}
              href="#kontakt"
              className="text-gray-300 hover:bg-gray-700 hover:text-white mx-10 block px-3 py-2 rounded-md text-base  uppercase"
            >
              Kontakt
            </a>
          </div>
        </div>
      </Show>
    </nav>
  );
};

export default Navigation;
