import { Component } from "solid-js";

/**
 * Component representing SVG close icon
 * @param {string} href menu item link
 * @param {VoidFunction} callback on:click callback
 * @returns {JSX.Element}
 */
const SvgCloseButton: Component<{ callback?: VoidFunction }> = (props) => {
  return (
    <svg
      onclick={props.callback}
      class="block h-6 w-6 transform transition duration-500 hover:scale-125"
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

export default SvgCloseButton;
