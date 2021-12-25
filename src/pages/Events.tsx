import { Component, createSignal, For, onMount } from "solid-js";

import { EventData, Event } from "../components/Event";

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

const Events: Component = () => {
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
        filtered.forEach((filteredEvent: EventsApiInterface) => {
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
          const img: string | null = document
            .getElementsByTagName("img")[0]
            .getAttribute("src");

          setEvents([...events(), new EventData(date, title, link, content, img)]);
        });
      })
      .catch((error) => console.log(error));
  });
  return (
    <div
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
      <div className="w-4/5 my-10">
          <div className={`grid grid-cols-1 md:my-16 gap-16 ${events().length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
            <For each={events()}>{(event, i) => 
            <div className="">
              <Event data={event} />
            </div>
            }</For>
        </div>
      </div>
    </div>
  );
};

export default Events;
