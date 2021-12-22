import { Component, createSignal, Switch, Match, Show } from "solid-js";

import { createStore } from "solid-js/store";

import { load } from 'recaptcha-v3'
const REACAPTCHA_SITE_KEY: string = "6Lcy1L0dAAAAAAMsrNsQg-3HHjRfpFjRAAnJcooR";

import ResponseBox from "./RegistrationFormResponseBox";

type FormFields = {
  name: string;
  email: string;
  message?: string;
  birthDate: string;
};

enum FormResponse {
  NotSent,
  Success,
  Captcha,
  Error,
}

const submit = (form: FormFields) => {
  const dataToSubmit = {
    name: form.name,
    email: form.email,
    message: form.message,
    birthDate: form.birthDate,
  };
  console.log(`submitting ${JSON.stringify(dataToSubmit)}`);
  return FormResponse.Success;
};

const useForm = () => {
  const [form, setForm] = createStore<FormFields>({
    name: "",
    email: "",
    message: "",
    birthDate: "",
  });

  const clearField = (fieldName: string) => {
    setForm({
      [fieldName]: "",
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

  return { form, submit, updateFormField, clearField };
};

const RegistrationForm: Component = () => {
  const [formStatus, setFormStatus] = createSignal(FormResponse.NotSent);

  const { form, updateFormField, submit } = useForm();

  const handleSubmit = (event: Event): void => {
    event.preventDefault();
    setFormStatus(submit(form));

    load(REACAPTCHA_SITE_KEY, {
      useRecaptchaNet: true,
      autoHideBadge: true
    }).then((recaptcha) => {
      recaptcha.execute('Register').then((token) => {
        console.log(token) 
      })
    })
    
  };

  const dismissReponse = () => {
    setFormStatus(FormResponse.NotSent);
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="w-8/12"
      id="registration"
    >
      <Show when={formStatus() !== FormResponse.NotSent}>
        <Switch>
          <Match when={formStatus() === FormResponse.Success}>
            <ResponseBox
              text="E-mail úspěšně odeslán"
              callback={dismissReponse}
            ></ResponseBox>
          </Match>
          <Match when={formStatus() === FormResponse.Captcha}>
            <ResponseBox
              text="Chybná reCAPTCHA"
              callback={dismissReponse}
            ></ResponseBox>
          </Match>
          <Match when={formStatus() === FormResponse.Error}>
            <ResponseBox
              text="Chyba serveru"
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
          href="https://hackdays.eu/GDPR.pdf"
        >
          zpracováním osobních údajů
        </a>
      </div>
    </form>
  );
};

export default RegistrationForm;
