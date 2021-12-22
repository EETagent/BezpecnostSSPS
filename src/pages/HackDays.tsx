import type { Component } from "solid-js";

import bg from "../assets/img/background/hackdays-bg.jpg";

import terminal from "../assets/img/hackdays-terminal.png";
import poster from "../assets/img/hackdays-video.png";
import video from "../assets/video/hackdays.mp4";

// @ts-ignore
import "fslightbox";

const HackDaysItem: Component<{ media: string; mediaSecond?: string, left: boolean }> = ({
  media,
  mediaSecond,
  left,
}) => {
  const MediaLightbox = (name: string) => {
    // @ts-ignore
    const lightbox = new FsLightbox();
    lightbox.props.sources = [name];
    lightbox.open();
  };

  return (
    <img
      className={
        left
          ? "w-1/2 md:w-[45%] mt-10 md:mr-16 hover:-translate-y-1 hover:scale-110 ease-in-out duration-300 hover:cursor-pointer"
          : "w-1/2 md:w-[45%] mt-10 hover:-translate-y-1 hover:scale-110 ease-in-out duration-300 hover:cursor-pointer"
      }
      src={media}
      alt=""
      onClick={() => {
        mediaSecond != null ? MediaLightbox(mediaSecond) : MediaLightbox(media)
      }}
    />
  );
};
const HackDays: Component = () => {
  return (
    <div
      id="hackdays"
      className="relative flex items-center justify-center overflow-hidden h-screen "
    >
      <img
        className="absolute z-10 w-auto min-w-full min-h-full object-cover"
        src={bg}
      />
      <div className="w-4/5 z-20 flex flex-col justify-center items-center">
        <h1 className="mt-3 font-hacked text-white font-bold uppercase text-6xl md:text-8xl">
          HackDays
        </h1>
        <div className="grow flex flex-col md:flex-row items-center justify-between">
          <HackDaysItem media={terminal} left={true} />
          <HackDaysItem media={poster} mediaSecond={video} left={false} />
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
