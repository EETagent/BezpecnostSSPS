import { Component } from "solid-js";
import { createStore } from "solid-js/store";

const DAYS: Record<number, string> = {
  0: "Neděle",
  1: "Pondělí",
  2: "Úterý",
  3: "Středa",
  4: "Čtvrtek",
  5: "Pátek",
  6: "Sobota",
};

type FormFields = {
  input: string;
  output: string;
  secret: string;
  url: string;
  day: string;
};

type GeneratorJWTPayload = {
  email: string;
  name: string;
  surname: string;
  day: string;
};

const useForm = () => {
  const [form, setForm] = createStore<FormFields>({
    input: "",
    output: "",
    secret: "",
    url: "https://hackdays.eu/food/ucastnik/",
    day: DAYS[new Date().getDay()],
  });

  const setField = (fieldName: string, fieldValue: string) => {
    setForm({
      [fieldName]: fieldValue,
    });
  };

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    setForm({
      [fieldName]: inputElement.value,
    });
  };

  return { form, setField, updateFormField };
};

const base64url = (source: string) => {
  let encodedSource = btoa(source);
  encodedSource = encodedSource.replace(/=+$/, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
};

const encodeJWT = async (
  payloadInput: GeneratorJWTPayload,
  secret: string
): Promise<string> => {
  const JWTHeader = {
    typ: "JWT",
    alg: "HS256",
  };
  const header = base64url(JSON.stringify(JWTHeader));
  const payload = base64url(
    unescape(encodeURIComponent(JSON.stringify(payloadInput)))
  );
  let token = header + "." + payload;

  const genSignature = async (token: string): Promise<string> => {
    "use strict";
    const enc = new TextEncoder();
    const algorithm = { name: "HMAC", hash: "SHA-256" };
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      algorithm,
      false,
      ["sign", "verify"]
    );
    const signature = await crypto.subtle.sign(
      algorithm.name,
      key,
      enc.encode(token)
    );
    const digest = base64url(String.fromCharCode(...new Uint8Array(signature)));
    return digest;
  };
  const signature = await genSignature(token);
  token = token + "." + signature;
  return token;
};

const Generator: Component = () => {
  const { form, setField, updateFormField } = useForm();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setField("output", "");
    if (form["input"].slice(-1) !== "\n") {
      setField("input", form["input"] + "\n");
    }
    form["input"].split("\n").forEach(async (e) => {
      const [name, surname, email] = e.split(/\s+/);
      if (email != "" && name != "" && surname != "" && form.secret != "") {
        const payload: GeneratorJWTPayload = {
          email: email,
          name: name,
          surname: surname,
          day: form.day,
        };
        const jwt = await encodeJWT(payload, form.secret);
        const finalToken = form.url + jwt.replace(".", "@").replace(".", "@");
        const output = name + " " + surname + "\n" + finalToken + "\n\n";
        setField("output", form.output + output);
      }
    });
  };

  return (
    <div className="mx-auto min-h-screen m-7">
      <form onsubmit={handleSubmit} className="mx-auto flex flex-col w-[80%]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <input
            type="password"
            className="p-1 w-full rounded-lg"
            placeholder="Token secret"
            value={form.secret}
            onchange={updateFormField("secret")}
          />
          <input
            type="text"
            className="p-1 w-full mt-3 md:mt-0 md:ml-3 rounded-lg"
            placeholder="URL"
            value={form.url}
            onchange={updateFormField("url")}
          />
          <select
            className="p-1 w-full mt-3 md:mt-0 md:ml-3 rounded-lg"
            style="-webkit-appearance:none;"
            value={form.day}
            onchange={updateFormField("day")}
          >
            <option value="Neděle">Neděle</option>
            <option value="Sobota">Sobota</option>
            <option value="Pátek">Pátek</option>
            <option value="Čtvrtek">Čtvrtek</option>
            <option value="Středa">Středa</option>
            <option value="Úterý">Úterý</option>
            <option value="Pondělí">Pondělí</option>
          </select>
        </div>
        <div className="mt-6 flex flex-col md:flex-row items-center w-full">
          <textarea
            placeholder="Jméno Příjmení E-mail"
            className="p-2 w-full rounded-xl"
            rows="16"
            value={form.input}
            onchange={updateFormField("input")}
          ></textarea>
          <textarea
            // Na Safari &#13;&#10; newline nefunkční :(
            placeholder="Jméno Příjmení &#13;&#10;Token"
            className="p-2 mt-5 md:mt-0 md:ml-5 w-full rounded-xl"
            rows="16"
            value={form.output}
            readonly
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-3 rounded-3xl bg-green-hacked text-white font-supply uppercase no-underline hover:transition-colors hover:duration-300 hover:bg-green-hacked-darker hover:cursor-pointer"
        >
          Vytvořit tokeny
        </button>
      </form>
    </div>
  );
};

export default Generator;
