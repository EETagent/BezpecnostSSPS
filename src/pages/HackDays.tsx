import type { Component } from "solid-js";

import bg from "../assets/img/background/hackdays-bg.jpg";

import terminal from "../assets/img/hackdays-terminal.png";
import poster from "../assets/img/hackdays-video.png";
import terminalWebP from "../assets/img/hackdays-terminal.webp";
import posterWebp from "../assets/img/hackdays-video.webp";

import video from "../assets/video/hackdays.mp4";

// @ts-ignore
import "fslightbox";

const HackDaysItem: Component<{
  media: string;
  mediaAlternative: string;
  video?: string;
  left: boolean;
}> = ({ media: media, mediaAlternative: mediaWebP, video, left }) => {
  const MediaLightbox = (name: string) => {
    // @ts-ignore
    const lightbox = new FsLightbox();
    lightbox.props.sources = [name];
    lightbox.open();
  };

  return (
    <picture
      className={`w-[80%] sm:w-[60%] md:w-[45%] mt-10 hover:-translate-y-1 hover:scale-110 ease-in-out duration-300 hover:cursor-pointer ${
        left ? "md:mr-16" : ""
      }`}
    >
      <source srcset={mediaWebP} type="image/webp" />
      <img
        src={media}
        onClick={() => {
          video != null ? MediaLightbox(video) : MediaLightbox(media);
        }}
        alt=""
      />
    </picture>
  );
};
const HackDays: Component = () => {
  return (
    <div
      id="hackdays"
      className="relative flex items-center justify-center overflow-hidden"
    >
      <img
        className="absolute z-10 w-auto min-w-full min-h-full object-cover"
        src={bg}
      />
      <div className="w-4/5 z-20 flex flex-col justify-center items-center">
        <h1 className="mt-10 font-hacked text-white font-bold uppercase text-6xl md:text-8xl">
          HackDays
        </h1>
        <div className="mb-10 grow flex flex-col md:flex-row items-center justify-between">
          <HackDaysItem
            media={terminal}
            mediaAlternative={terminalWebP}
            left={true}
          />
          <HackDaysItem
            media={poster}
            mediaAlternative={posterWebp}
            video={video}
            left={false}
          />
          {/* <video
            controls
            preload="none"
            poster={poster}
            className="ml-3 mt-10 w-1/2"
            src={video}
            onClick={VideoClick}
          ></video> */}
        </div>
      </div>
    </div>
  );
};
export default HackDays;
