import { Link } from "solid-app-router";
import { Accessor, Component, Show } from "solid-js";
import { createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import logo from "../assets/img/logo/logo-web.svg";

/**
 * Component representing menu hexagon button
 * @param {VoidFunction} onClick on:click callback
 * @param {Accessor<boolean>} isMenuOpened state for menu status
 * @returns {JSX.Element}
 */
const MenuButton: Component<{
  onClick: VoidFunction;
  isMenuOpened: Accessor<boolean>;
}> = (props) => {
  return (
    <button
      aria-controls="mobile-menu"
      onclick={props.onClick}
      class="transform transition duration-500 hover:scale-110 focus:outline-none"
    >
      <svg viewBox="0 0 32 36" class="h-10 stroke-green-hacked stroke-2">
        {/* Fešné SVG vypůjčeno z Haxagon.cz, zbytek poctivá práce :) */}
        <path
          data-v-21716efb=""
          d="M15.5079 34.8482L1 26.4243V9.57571L15.5079 1.15178L30.5 9.58485V26.4152L15.5079 34.8482Z"
        ></path>
      </svg>
      <div
        class={"block absolute  left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"}
      >
        {" "}
        <span
          class={`block absolute h-0.5 w-4 text-white bg-current transform transition duration-500 ease-in-out" ${
            props.isMenuOpened() ? "rotate-45" : "-translate-y-1.5"
          }`}
        ></span>{" "}
        <span
          class={`block absolute h-0.5 w-2 text-white bg-current transform transition duration-500 ease-in-out" ${
            props.isMenuOpened() ? "opacity-0" : ""
          }`}
        ></span>{" "}
        <span
          class={`block absolute h-0.5 w-4 text-white bg-current transform transition duration-500 ease-in-out ${
            props.isMenuOpened() ? "-rotate-45" : "translate-y-1.5"
          }`}
        ></span>{" "}
      </div>
    </button>
  );
};

/**
 * Component representing menu item
 * @param {string} href menu item link
 * @param {string} description menu item description
 * @returns {JSX.Element}
 */
const MenuItem: Component<{
  href: string;
  description: string;
}> = (props) => {
  return (
    <a
      rel="external"
      href={props.href}
      class={"hover:bg-green-hacked-darker hover:text-white px-3 py-2 rounded-md text-sm  uppercase text-gray-300"}
    >
      {props.description}
    </a>
  );
};

/**
 * Component representing menu item in compact menu
 * @param {string} href menu item link
 * @param {string} description menu item description
 * @param {VoidFunction} onClick on:click callback
 * @returns {JSX.Element}
 */
const MenuItemCompact: Component<{
  href: string;
  description: string;
  onClick: VoidFunction;
}> = (props) => {
  return (
    <a
      rel="external"
      onClick={() => props.onClick()}
      href={props.href}
      class="text-white hover:bg-green-hacked-darker  block mx-10 px-3 py-2 rounded-md text-base  uppercase"
    >
      {props.description}
    </a>
  );
};

/**
 * Component navbar
 * @returns {JSX.Element}
 */
const Navigation: Component = () => {
  const [isOpened, setIsOpened] = createSignal<boolean>(false);

  return (
    <nav class="bg-black sticky top-0 z-50 font-supply">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center md:justify-center justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:block order-1">
              <div class="flex items-baseline">
                <MenuItem href="/#info" description="O nás" />
                <MenuItem href="/#hackdays" description="HackDays" />
              </div>
            </div>
            <div class="mx-3 flex-shrink-0 order-2 transform transition duration-500 hover:scale-110">
              <Link href="/" class="hover:cursor-pointer">
                <img class="h-10 w-10 " src={logo} alt="Root" />
              </Link>
            </div>
            <div class="hidden md:block order-3">
              <div class="flex items-baseline">
                <MenuItem href="/#akce" description="Akce" />

                <MenuItem href="/#kontakt" description="Kontakt" />
              </div>
            </div>
          </div>
          <div class="mx-3 md:hidden">
            <MenuButton
              onClick={() => setIsOpened(!isOpened())}
              isMenuOpened={isOpened}
            />
          </div>
        </div>
      </div>
      <Transition
        onEnter={(el, done) => {
          const a = el.animate([{ opacity: 0 }, { opacity: 100 }], {
            duration: 600,
          });
          a.finished.then(done);
        }}
        onExit={(el, done) => {
          const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 0,
          });
          a.finished.then(done);
        }}
      >
        {<Show when={isOpened()}>{<div
          class="md:hidden"
          style="background: repeating-linear-gradient(
            -45deg,
            black,
            black 10px,
            #444 10px,
            #444 11px
          );"
        >
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="/#"
              description="O nás"
            />
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="/#hackdays"
              description="HackDays"
            />
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="/#akce"
              description="Akce"
            />
            <MenuItemCompact
              onClick={() => setIsOpened(!isOpened())}
              href="/#kontakt"
              description="Kontakt"
            />
          </div>
        </div>}</Show>}
      </Transition>
    </nav>
  );
};

export default Navigation;
