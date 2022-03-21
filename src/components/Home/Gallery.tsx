import { Component, For } from "solid-js";

import Picture from "../Picture";

// Nepoužijeme ViteJS glob import, Object.entries() až od ES2017 :(

import gallery1 from "../../assets/img/gallery/1.jpg";
import gallery2 from "../../assets/img/gallery/2.jpg";
import gallery3 from "../../assets/img/gallery/3.jpg";
import gallery4 from "../../assets/img/gallery/4.jpg";
import gallery5 from "../../assets/img/gallery/5.jpg";
import gallery6 from "../../assets/img/gallery/6.jpg";
import gallery7 from "../../assets/img/gallery/7.jpg";
import gallery8 from "../../assets/img/gallery/8.jpg";
import gallery9 from "../../assets/img/gallery/9.jpg";

import galleryWebP1 from "../../assets/img/gallery/webp/1.webp";
import galleryWebP2 from "../../assets/img/gallery/webp/2.webp";
import galleryWebP3 from "../../assets/img/gallery/webp/3.webp";
import galleryWebP4 from "../../assets/img/gallery/webp/4.webp";
import galleryWebP5 from "../../assets/img/gallery/webp/5.webp";
import galleryWebP6 from "../../assets/img/gallery/webp/6.webp";
import galleryWebP7 from "../../assets/img/gallery/webp/7.webp";
import galleryWebP8 from "../../assets/img/gallery/webp/8.webp";
import galleryWebP9 from "../../assets/img/gallery/webp/9.webp";

const gallery: Array<string> = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
];

const galleryWebP: Array<string> = [
  galleryWebP1,
  galleryWebP2,
  galleryWebP3,
  galleryWebP4,
  galleryWebP5,
  galleryWebP6,
  galleryWebP7,
  galleryWebP8,
  galleryWebP9,
];

/**
 * Component representing Gallery section
 * @returns {JSX.Element}
 */
const Gallery: Component = () => {
  return (
    <section
      id="gallery"
      className="relative flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 my-10 lg:my-16 2xl:my-32">
        <For each={gallery}>
          {(image, i) => (
            <Picture
              media={image}
              mediaAlternativeWebP={galleryWebP[i()]}
              alt={`HackDays ${i()}`}
              gallery={Array.from(new Set([image, ...gallery]))}
            />
          )}
        </For>
      </div>
    </section>
  );
};
export default Gallery;
