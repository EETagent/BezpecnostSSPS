import {
  Component,
  createSignal,
  Switch,
  Match,
  Show,
  onMount,
} from "solid-js";

import { createStore } from "solid-js/store";

import { load, ReCaptchaInstance } from "recaptcha-v3";
const REACAPTCHA_SITE_KEY: string = "6Lcy1L0dAAAAAAMsrNsQg-3HHjRfpFjRAAnJcooR";

import GDPR from "../../assets/GDPR.pdf";
import bg from "../../assets/img/background/registrace-bg.jpg";

type FormFields = {
  name: string;
  email: string;
  message?: string;
  birthDate: string;
  captcha: string;
};

enum FormResponse {
  NOTSENT,
  SUCCESS,
  CAPTCHA,
  ERROR,
}

interface FormResponseJson {
  result: string;
  error?: string;
}

const HackDaysRegistrace: Component = () => {
  const submit = async (form: FormFields): Promise<FormResponse> => {
    const dataToSubmit = {
      name: form.name,
      email: form.email,
      message: form.message,
      birthDate: form.birthDate,
      captcha: form.captcha,
    };

    const response = await fetch("backend/mail.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });

    const responseJSON: FormResponseJson = await response.json();

    switch (responseJSON.result) {
      case "CAPTCHA":
        return FormResponse.CAPTCHA;
      case "ERROR":
        return FormResponse.ERROR;
      case "SUCCESS":
        return FormResponse.SUCCESS;
      default:
        return FormResponse.ERROR;
    }
  };

  const useForm = () => {
    const [form, setForm] = createStore<FormFields>({
      name: "",
      email: "",
      message: "",
      birthDate: "",
      captcha: "",
    });

    const clearField = (fieldName: string) => {
      setForm({
        [fieldName]: "",
      });
    };

    const setField = (fieldName: string, fieldValue: string) => {
      setForm({
        [fieldName]: fieldValue,
      });
    };

    const updateFormField = (fieldName: string) => (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      if (inputElement.type === "checkbox") {
        setForm({
          [fieldName]: !!inputElement.checked,
        });
      } else {
        setForm({
          [fieldName]: inputElement.value,
        });
      }
    };

    return { form, submit, setField, updateFormField, clearField };
  };

  const RegistrationForm: Component = () => {
    const ResponseBox: Component<{ text: string; callback?: VoidFunction }> = ({
      text,
      callback,
    }) => {
      const SvgButton: Component<{ callback?: VoidFunction }> = ({
        callback,
      }) => {
        return (
          <svg
            onclick={callback}
            className="block h-6 w-6 transform transition duration-500 hover:scale-125"
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
      return (
        <Show
          when={text === "E-mail úspěšně odeslán"}
          fallback={() => (
            <div className="mt-10 py-5 px-7 rounded-2xl bg-response-error border-solid border-red-800  text-center font-supply">
              <div className="flex flex-row justify-between">
                <span className="text-red-800">{text}</span>
                <SvgButton callback={callback} />
              </div>
            </div>
          )}
        >
          <div className="mt-10 py-5 px-7 rounded-2xl bg-response-success border-solid border-green-700  text-center font-supply">
            <div className="flex flex-row justify-between">
              <span className="text-green-700">{text}</span>
              <SvgButton callback={callback} />
            </div>
          </div>
        </Show>
      );
    };

    const [recaptcha, setRecaptcha] = createSignal<ReCaptchaInstance>();

    const [formStatus, setFormStatus] = createSignal<FormResponse>(
      FormResponse.NOTSENT
    );

    const [submitStatus, setSubmitStatus] = createSignal<boolean>(false);

    const { form, updateFormField, setField, submit } = useForm();

    const handleSubmit = (event: Event): void => {
      event.preventDefault();
      if (typeof recaptcha() !== "undefined") {
        recaptcha()!
          .execute("Register")
          .then(async (token) => {
            setField("captcha", token);
            setSubmitStatus(true);
            setFormStatus(await submit(form));
          })
          .catch(() => setFormStatus(FormResponse.CAPTCHA));
      } else {
        setFormStatus(FormResponse.CAPTCHA);
      }
    };

    const dismissReponse = () => {
      setFormStatus(FormResponse.NOTSENT);
    };

    onMount(async () => {
      await load(REACAPTCHA_SITE_KEY, {
        useRecaptchaNet: false,
        autoHideBadge: true,
      }).then((recaptcha) => {
        setRecaptcha(recaptcha);
      });
    });

    return (
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-full md:w-8/12"
        id="registration"
      >
        <Show when={formStatus() !== FormResponse.NOTSENT}>
          {setSubmitStatus(false)}
          <Switch>
            <Match when={formStatus() === FormResponse.SUCCESS}>
              <ResponseBox
                text="E-mail úspěšně odeslán"
                callback={dismissReponse}
              ></ResponseBox>
            </Match>
            <Match when={formStatus() === FormResponse.CAPTCHA}>
              <ResponseBox
                text="Chybná reCAPTCHA, zpráva nebyla odeslána. V případě dalších problémů nás kontaktujte."
                callback={dismissReponse}
              ></ResponseBox>
            </Match>
            <Match when={formStatus() === FormResponse.ERROR}>
              <ResponseBox
                text="Chyba serveru, zpráva nebyla odeslána."
                callback={dismissReponse}
              ></ResponseBox>
            </Match>
          </Switch>
        </Show>
        <Show when={submitStatus() === true}>
          <div className="text-white font-supply w-full mt-3 text-center md:text-left">Odesílání zprávy....</div>
        </Show>
        <div className="flex flex-row mt-7 transition ease-in-out delay-150  hover:-translate-y-1 duration-300">
          <input
            form="registration"
            required
            type="text"
            value={form.name}
            onChange={updateFormField("name")}
            placeholder="Jméno:"
            className="font-supply text-sm p-3 rounded-l-2xl outline-none w-full"
          />
          <select
            form="registration"
            required
            value={form.birthDate}
            onChange={updateFormField("birthDate")}
            className="rounded-r-2xl text-sm text-gray-400 font-supply outline-none border-solid border-l-2 text-center"
          >
            <option disabled selected value="">
              Rok nar.
            </option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
          </select>
        </div>

        <input
          form="registration"
          required
          type="email"
          value={form.email}
          onChange={updateFormField("email")}
          placeholder="E-mail"
          className="mt-7 font-supply text-sm p-3 rounded-2xl outline-none w-full transition ease-in-out delay-150  hover:-translate-y-1 duration-300 "
        />
        <div className="mt-7 flex flex-col w-full transition ease-in-out delay-150 hover:-translate-y-1 duration-300">
          <textarea
            form="registration"
            placeholder="Zpráva:"
            name=""
            value={form.message}
            onChange={updateFormField("message")}
            id=""
            className="mt-7 font-supply text-sm p-3 rounded-t-2xl resize-none outline-none"
          ></textarea>
          <div className="bg-white rounded-b-2xl">
            <div className="flex flex-row-reverse">
              <button
                form="registration"
                type="submit"
                className="w-4/6 p-2 text-sm text-white bg-green-hacked text-center font-supply uppercase rounded-br-2xl hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
              >
                Zaregistrovat se!
              </button>
            </div>
          </div>
        </div>
        <div className="mt-7 font-supply text-white inline-block w-8/12">
          <input
            form="registration"
            required
            type="checkbox"
            className="mr-2"
          />
          Souhlasím se{" "}
          <a
            className="underline hover:text-zinc-300"
            href={GDPR}
            target="_blank"
          >
            zpracováním osobních údajů
          </a>
        </div>
        <div className="mt-3 font-supply text-gray-500 text-xs w-8/12">
          <a href="mailto:registrace@hackdays.eu?subject=HackDays 2022 | Předběžná registrace přes webový formulář">
            Staré dobré: <span className="underline">záložní registrace</span>
          </a>
        </div>
      </form>
    );
  };
  return (
    <section
      id="registrace"
      className="relative flex items-center justify-center overflow-hidden "
    >
      <img
        className="absolute z-10 w-auto min-w-full min-h-full object-cover"
        src={bg}
        alt="Background image"
      />
      <div className="z-20 flex flex-col w-4/5 items-center md:items-start my-10 lg:my-16 2xl:my-32">
        <h2 className="font-sans text-white font-light uppercase md:text-5xl">
          Nezávazná
        </h2>
        <h1 className="mt-3 font-sans text-white font-bold uppercase text-3xl md:text-7xl">
          Registrace
        </h1>
        <RegistrationForm />
      </div>
    </section>
  );
};
export default HackDaysRegistrace;
