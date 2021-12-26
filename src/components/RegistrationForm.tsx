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

import ResponseBox from "./RegistrationFormResponseBox";

import GDPR from "../assets/GDPR.pdf";

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
}

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
    case FormResponse.CAPTCHA.toString():
      return FormResponse.CAPTCHA;
    case FormResponse.ERROR.toString():
      return FormResponse.ERROR;
    default:
      return FormResponse.SUCCESS;
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
  const [recaptcha, setRecaptcha] = createSignal<ReCaptchaInstance>();

  const [formStatus, setFormStatus] = createSignal<FormResponse>(
    FormResponse.NOTSENT
  );

  const { form, updateFormField, setField, submit } = useForm();

  const handleSubmit = (event: Event): void => {
    event.preventDefault();
    if (typeof recaptcha() !== "undefined") {
      recaptcha()!
        .execute("Register")
        .then(async (token) => {
          setField("captcha", token);
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
        <input form="registration" required type="checkbox" className="mr-2" />
        Souhlasím se{" "}
        <a
          className="underline hover:text-zinc-300"
          href={GDPR}
          target="_blank"
        >
          zpracováním osobních údajů
        </a>
      </div>
    </form>
  );
};

export default RegistrationForm;
