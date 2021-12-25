import { Component } from "solid-js";

import defaultBg from "../assets/img/background/intro-bg.jpg";

class EventData {
  constructor(
    date: Date,
    title: string,
    link: string,
    content: string[],
    img?: string | null
  ) {
    this.date = date;
    this.title = title;
    this.link = link;
    this.content = content;
    this.img = img ? img : defaultBg;
  }
  date: Date;
  title: string;
  link: string;
  content: string[];
  img: string;
}

const Event: Component<{ data: EventData }> = ({ data }) => {
  return (
    <div className="flex h-full justify-between flex-col rounded-3xl bg-white border-solid border-2">
      <div
        className="w-full h-64 p-8 bg-top  bg-cover rounded-t-3xl flex text-center justify-center items-center text-white text-3xl uppercase font-supply leading-relaxed"
        style={`background-image:linear-gradient(rgba(103, 114, 41, 0.4), rgba(0, 0, 0, 0.9)), url(${data.img})`}
      >
        {data.title}
      </div>
      <div className="h-full flex flex-col justify-between w-full md:flex-row rounded-b-3xl">
        <div className="py-2 flex flex-row justify-around md:rounded-bl-3xl font-supply leading-none text-white uppercase bg-black md:flex-col md:items-center md:justify-center md:w-1/4">
          <div className="md:text-3xl">{data.date.getDay()}</div>
          <div className="md:text-6xl">{data.date.getMonth()}</div>
          <div className="md:text-xl">{data.date.getFullYear()}</div>
        </div>
        <div className="flex-grow font-normal text-gray-800 flex flex-col md:w-3/4">
          <p className="p-4 leading-normal font-supply">
            {data.content[0]}
            {data.content[1]}
          </p>
          <div className="mt-auto p-2 rounded-b-3xl md:rounded-b-none md:rounded-br-3xl text-center bg-green-hacked hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer">
            <a
              target="_blank"
              href={data.link}
              className="text-xl text-white font-supply uppercase "
            >
              Zjistit více!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventData, Event };
