import { Link } from "solid-app-router";
import { Component } from "solid-js";

import polygonWebP from "../assets/img/about-polygon.webp";
import polygon from "../assets/img/about-polygon.jpg";

const About: Component = () => {
  const Article: Component<{ title: string; text: string }> = ({
    title,
    text,
  }) => {
    return (
      <article>
        <h1 className="my-10 font-supply text-center text-2xl md:text-[2.5vw]">{title}</h1>
        <p className="text-justify text-gray-200 md:text-[1.25vw]">{text}</p>
      </article>
    );
  };
  return (
    <section
      id="about"
      className="w-[80%] mx-auto py-10 flex flex-col items-center justify-center overflow-hidden text-white leading-relaxed"
    >
      <div className="mt-10">
        <Link
          href="/"
          className="mt-6 px-6 py-3 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
      <Article
        title="Nový obor Kybernetická bezpečnost"
        text="Žádost o spuštění pilotního ověřování nového oboru Kybernetická bezpečnost na dvou středních školách v ČR podal na MŠMT Svaz průmyslu a obchodu ČR. Ten oslovil v rámci sektorové dohody o kybernetické bezpečnosti naši Smíchovskou střední průmyslovou školu a brněnskou střední školu informatiky s nabídkou, aby na nich byl tento nový obor pilotován od školního roku 2017/2018. Na pilotním ověřování nového oboru, stejně jako na jeho obsahu, bude probíhat spolupráce skupin v Praze a Brně, přičemž v Praze půjde o odborné firmy a organizace (např. Cisco, CZ.NIC, Alef Nula, AFCEA), ČVUT a naši SSPŠ, v Brně pak o VUT, další odborné firmy a oslovenou střední školu. Obsah předmětů tak budou tvořit odborníci z praxe, což dává velké předpoklady na takovou výuku, kterou následně absolventi oboru v praxi skutečně využijí. Na doplnění přidáváme tři odpovědi ředitele školy Ing. Radko Sáblíka z jeho rozhovoru pro média na toto téma."
      />
      <picture className="mt-10">
        <source srcset={polygonWebP} type="image/webp" />
        <img className="rounded-3xl" src={polygon} alt="Kybernetický polygon" />
      </picture>
      <Article
        title="Proč byla oslovena právě vaše škola, aby pilotovala nový obor Kybernetická bezpečnost?"
        text="„Naše škola se před deseti roky podílela na tvorbě Rámcového vzdělávacího programu oboru Informační technologie, podle kterého se nyní učí v celé České republice. Navíc jsme se již před oslovením kybernetickou bezpečností zabývali. Proto jsme nejspíš byli vyzváni ke spolupráci, čehož si velmi vážím a beru to i jako ocenění naší dobré práce a pověsti na poli výuky informačních technologií. Ocenění pro vedení školy, pedagogy, absolventy i studenty, ti všichni velmi dobře spolupracují na rozvoji školy i na mnoha projektech z oblasti Internetu věcí či kybernetické bezpečnosti.“"
      />
      <Article
        title="Proč jste se na vaší škole začali zabývat právě kybernetickou bezpečností?"
        text="„Domnívám se, že tato oblast byla dlouho podceňována. Zatímco na vývoji různých aplikací se velmi usilovně pracovalo, jejich zabezpečení bylo významně podceněno. Přitom nejde jen o často zmiňovanou kybernetickou šikanu, či o krádeže dat, ale i o ovlivňování veřejného mínění či dokonce útoky na soudržnost celých firem i států. Vždyť kybernetická bezpečnost byla i jedním z hlavních témat zasedání NATO v Polsku. Proto jsme se sami začali zabývat touto oblastí, konat osvětu na školách, pořádat workshopy pro učitele i žáky. V budoucnosti chceme nabídnout absolventy, kteří budou schopni zastat velmi odborné pracovní pozice, či pokračovat v daném oboru na vysoké škole. Odborníků na kybernetickou bezpečnost bude dle odhadu jen v České republice chybět v brzké době na dvanáct tisíc, v Evropské unii se pak mluví o statisících.“"
      />
      <Article
        title="Co považujete za největší nebezpečí v této oblasti?"
        text="„V této době se nejvíce hovoří o kyberšikaně či o krádežích dat, která jsou poté různým způsobem zneužita. Ale mnozí si neuvědomují, že s nástupem tak zvaného Internetu věcí a Průmyslu 4.0, dojde k propojení doslova miliard zařízení. Což bude na jednu stranu skvělé, ovšem jen do té doby, než do systému pronikne záškodník, který buď neúmyslně díky své hlouposti, či záměrně, díky své zlovolnosti či kriminální činnosti, provede takový zásah, který může znamenat i ztrátu na lidských životech. Co by znamenala změna frekvence kardiostimulátoru či dávky inzulínu, je asi každému jasné. Stejně tak, pokud někdo záměrně změní dráhu letadla, nastavení parametrů, které povedou k výbuchu v továrně, elektrárně a podobně. Za obrovské nebezpečí také považuji tak zvanou kybernetickou válku, kdy podsouváním zavádějících informací, šířením polopravd a lží, lze zmanipulovat veřejné mínění, což může de facto rozložit celou společnost, vyvolat nepokoje, nebo dokonce zajistit propuknutí násilí až pogromů. Zde dle mého máme také velký dluh, na což poukazuje ve své zprávě i BIS.“"
      />
    </section>
  );
};
export default About;
