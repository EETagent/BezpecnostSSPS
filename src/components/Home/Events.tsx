import { Component, createSignal, For, onMount } from "solid-js";

import defaultBg from "../../assets/img/background/intro-bg.jpg";

/**
 * Interface representing output of SSPS WordPress REST API
 */
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

/**
 * Class representating Event
 */
class EventData {
  /**
   * Create EventData
   * @param {Date} date Event date
   * @param {string} title Title of event
   * @param {string} link Link to event
   * @param {Array<string>} content Event content seperated by paragraphs
   * @param {string} img SRC for image
   */
  constructor(
    readonly date: Date,
    readonly title: string,
    readonly link: string,
    readonly content: Array<string>,
    readonly img: string
  ) {}
}

/**
 * Decode HTML entities
 * @param {string} input Input string
 * @returns {string} Decoded text
 */
const htmlEntitiesDecode = (input: string): string => {
  const tempArea: HTMLTextAreaElement = document.createElement("textarea");
  input = input.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
  input = input.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
  tempArea.innerHTML = input;
  const txt: string = tempArea.value;
  return txt;
};

/**
 * Component representing Event section
 * @returns {JSX.Element}
 */
const Events: Component = () => {
  /**
   * Component representing 1 event block
   * @param {EventData} data Event object with required values
   * @returns {JSX.Element}
   */
  const Event: Component<{ data: EventData }> = (props) => {
    return (
      <div class="flex h-full justify-between flex-col rounded-3xl bg-white border-solid border-2">
        <div
          class="w-full h-64 p-5 bg-top  bg-cover rounded-t-3xl flex text-center justify-center items-center text-white text-3xl uppercase font-supply leading-relaxed"
          style={`background-image:linear-gradient(rgba(103, 114, 41, 0.4), rgba(0, 0, 0, 0.9)), url(${props.data.img})`}
        >
          {trimTitle(props.data.title)}
        </div>
        <div class="h-full flex flex-col justify-between w-full md:flex-row rounded-b-3xl">
          <div class="py-2 flex flex-row justify-around md:rounded-bl-3xl font-supply leading-none text-white uppercase bg-black md:flex-col md:items-center md:justify-center md:w-1/4">
            <div class="md:text-3xl">
              {("0" + props.data.date.getDate()).slice(-2)}
            </div>
            <div class="md:text-6xl">
              {("0" + (props.data.date.getMonth() + 1)).slice(-2)}
            </div>
            <div class="md:text-xl">{props.data.date.getFullYear()}</div>
          </div>
          <div class="flex-grow font-normal text-gray-800 flex flex-col md:w-3/4">
            <p class="p-4 leading-normal font-supply text-justify md:text-left text-sm md:text-xs">
              {props.data.content[0]}
              {props.data.content[1]}
            </p>
            <a
              target="_blank"
              href={props.data.link}
              class="mt-auto p-2 rounded-b-3xl md:rounded-b-none md:rounded-br-3xl text-center bg-green-hacked hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer text-xl text-white font-supply uppercase "
            >
              Zjistit více!
            </a>
          </div>
        </div>
      </div>
    );
  };

  const [events, setEvents] = createSignal<EventData[]>([]);

  /**
   * Returns the difference between today's date and the argument in days
   * @constructor
   * @param {number} date Date to be compared with
   * @returns {number} Number of days to current date
   */
  /*const _dateDiffDays = (date: number): number => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const current = Date.now();
    return Math.floor((current - date) / _MS_PER_DAY);
  };*/

  /**
   * Check if string contains word from array
   * @param {string} string String to be compared to
   * @param {Array<string>} array Array with keywords
   * @returns {boolean} String contains some keyword from array
   */
  const _stringContains = (string: string, array: string[]): boolean => {
    return array.some((v) => string.toUpperCase().includes(v));
  };

  /**
   * Trim event title so it will fit into the block
   * @param {string} title String containing title
   * @returns {string} String containing trimed title
   */
  const trimTitle = (title: string): string => {
    const MAX_CHARACTERS_FIT = 42;

    title = title.trim();
    if (title.length <= MAX_CHARACTERS_FIT) {
      return title;
    }
    const separated = title.slice(0, MAX_CHARACTERS_FIT + 3).split(" ");
    separated.pop();
    return separated.join(" ") + "...";
  };

  onMount(async () => {
    const KEYWORDS: string[] = [
      "HACKDAYS",
      "KYBER",
      "CYBERSECURITY",
      "BEPECNOST.SSPS.CZ",
      //"TĚLO"
    ];
    const EVENTS_URL = "https://www.ssps.cz/wp-json/wp/v2/posts";
    const PARAMETERS = new URLSearchParams();
    PARAMETERS.append("per_page", "50");

    const HEADERS: HeadersInit = {
      accept: "application/json",
      //"user-agent": "Stránka Bezpečnost SSPŠ a HackDays, stažení eventů z hlavního webu",
    };

    /**
     * Callback for filter() validating fetched data
     * @param {EventsApiInterface} e
     * @returns {boolean} Event is valid
     */
    const filterEvents = (e: EventsApiInterface): boolean => {
      //if (_dateDiffDays(Date.parse(e.date)) < 90) {
      if (
        _stringContains(e.title.rendered, KEYWORDS) ||
        _stringContains(e.content.rendered, KEYWORDS) ||
        e.tags.some((w) => _stringContains(w, KEYWORDS))
      ) {
        return true;
      }
      //}

      return false;
    };

    await fetch(EVENTS_URL + "?" + PARAMETERS, {
      method: "GET",
      headers: HEADERS,
    })
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
              ? background[0].getAttribute("src") != null
                ? (background[0].getAttribute("src") as string)
                : defaultBg
              : defaultBg;

          setEvents([
            ...events(),
            new EventData(
              date,
              htmlEntitiesDecode(title),
              link,
              content,
              imgSrc
            ),
          ]);
        });
      })
      .catch((error) => console.log(error));
  });

  return (
    <section
      id="akce"
      class="relative flex justify-center content-center	"
      style="background: repeating-linear-gradient(
        -45deg,
        black,
        black 10px,
        #444 10px,
        #444 11px
      );"
    >
      <div class="w-4/5 my-10 lg:my-16 2xl:my-32">
        <div
          class={`grid grid-cols-1 md:my-16 gap-16 ${
            events().length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          <For each={events()}>
            {(event) => (
              <div class="">
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
