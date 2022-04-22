import { Link } from "solid-app-router";
import { Component } from "solid-js";

import "giscus";
/**
 * Component representing discussion page
 * @returns {JSX.Element}
 */
const Discussion: Component = () => {
  return (
    <section
      id="discussion"
      className="min-w-screen min-h-screen mx-auto py-10 flex flex-col items-center  overflow-hidden text-white leading-relaxed"
    >
      <div className="my-10">
        <Link
          href="/"
          className="px-6 py-3 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
      <section class="w-[90%] md:w-[80%]" id="questions-and-answers">
        {
          // Umlčení errorů u této webové komponenty importované z "giscus"
          // @ts-ignore:next-line}
          <giscus-widget
            repo="EETagent/BezpecnostSSPS"
            repo-id="R_kgDOGkH5TA"
            category="Q&A"
            category-id="DIC_kwDOGkH5TM4CBC3A"
            mapping="specific"
            term="diskuseWeb"
            reactions-enabled="1"
            emit-metadata="0"
            input-position="bottom"
            theme="dark"
            lang="en"
            loading="lazy"
            crossorigin="anonymous"
            async
          />
        }
      </section>
    </section>
  );
};
export default Discussion;
