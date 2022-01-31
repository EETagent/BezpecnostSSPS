import { Component, createSignal, For, onMount } from "solid-js";

import defaultBg from "../../assets/img/background/intro-bg.jpg";

interface EventsApiInterface {
  id: number;
  status: string;
  type: string;
  link: string;

  title: {
    protected: boolean;
    rendered: string;
  };
  content: {
    protected: boolean;
    rendered: string;
  };
  tags: string[];
  date: string;
}

class EventData {
  constructor(
    readonly date: Date,
    readonly title: string,
    readonly link: string,
    readonly content: string[],
    readonly img: string
  ) {}
}

const Events: Component = () => {
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
            <div className="md:text-3xl">
              {("0" + data.date.getDate()).slice(-2)}
            </div>
            <div className="md:text-6xl">
              {("0" + (data.date.getMonth() + 1)).slice(-2)}
            </div>
            <div className="md:text-xl">{data.date.getFullYear()}</div>
          </div>
          <div className="flex-grow font-normal text-gray-800 flex flex-col md:w-3/4">
            <p className="p-4 leading-normal font-supply text-justify md:text-left text-sm md:text-xs">
              {data.content[0]}
              {data.content[1]}
            </p>
            <a
              target="_blank"
              href={data.link}
              className="mt-auto p-2 rounded-b-3xl md:rounded-b-none md:rounded-br-3xl text-center bg-green-hacked hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer text-xl text-white font-supply uppercase "
            >
              Zjistit více!
            </a>
          </div>
        </div>
      </div>
    );
  };

  const [events, setEvents] = createSignal<EventData[]>([]);

  const _dateDiffDays = (date: number): number => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const current = Date.now();
    return Math.floor((current - date) / _MS_PER_DAY);
  };

  const _stringContains = (string: string, array: string[]): boolean => {
    return array.some((v) => string.toUpperCase().includes(v));
  };

  onMount(async () => {
    const KEYWORDS: string[] = [
      "HACKDAYS",
      "KYBER",
      "CYBERSECURITY",
      "BEPECNOST.SSPS.CZ",
      //"TĚLO"
    ];
    const EVENTS_URL: string = "https://www.ssps.cz/wp-json/wp/v2/posts";
    const HEADERS: HeadersInit = {
      accept: "application/json",
      //"user-agent": "Stránka Bezpečnost SSPŠ a HackDays, stažení eventů z hlavního webu",
    };

    const filterEvents = (e: EventsApiInterface): boolean => {
      if (_dateDiffDays(Date.parse(e.date)) < 90) {
        if (
          _stringContains(e.title.rendered, KEYWORDS) ||
          _stringContains(e.content.rendered, KEYWORDS) ||
          e.tags.some((w) => _stringContains(w, KEYWORDS))
        ) {
          return true;
        }
      }

      return false;
    };

    await fetch(EVENTS_URL, { method: "GET", headers: HEADERS })
      .then((response) => response.json())
      .then((json: Array<EventsApiInterface>) => {
        const filtered = json.filter((e) => filterEvents(e));
        filtered.slice(0, 4).forEach((filteredEvent: EventsApiInterface) => {
          const date: Date = new Date(filteredEvent.date);
          const title: string = filteredEvent.title.rendered;
          const link: string = filteredEvent.link;
          const document: Document = new DOMParser().parseFromString(
            filteredEvent.content.rendered,
            "text/html"
          );
          const content: string[] = Array.from(
            document.getElementsByTagName("p")
          ).map((e) => e.innerText + "\n");
          const background: HTMLCollectionOf<HTMLImageElement> =
            document.getElementsByTagName("img");
          const imgSrc: string =
            background.length > 0
              ? background[0].getAttribute("src")!
              : defaultBg;

          setEvents([
            ...events(),
            new EventData(date, title, link, content, imgSrc),
          ]);
        });
      })
      .catch((error) => console.log(error));
  });

  return (
    <section
      id="akce"
      className="relative flex justify-center content-center	"
      style="background: repeating-linear-gradient(
        -45deg,
        black,
        black 10px,
        #444 10px,
        #444 11px
      );"
    >
      <div className="w-4/5 my-10 lg:my-16 2xl:my-32">
        <div
          className={`grid grid-cols-1 md:my-16 gap-16 ${
            events().length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          <For each={events()}>
            {(event, i) => (
              <div className="">
                <Event data={event} />
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default Events;
