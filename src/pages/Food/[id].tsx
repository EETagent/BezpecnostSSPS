import { useParams } from "solid-app-router";
import { Component, createResource } from "solid-js";

const Food: Component = () => {
  const params = useParams();

  interface TokenInterface {
    surname: string;
    forname: string;
    day: string;
  }

  interface ResponseJson {
    result: boolean;
    error?: string;
  }

  const validateToken = async (token: string): Promise<boolean> => {
    const response = await fetch("/backend/food/validate.php", {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    const responseValue: ResponseJson = await response.json();

    return responseValue.result === true;
  };

  const parseToken = async (token: string): Promise<TokenInterface | null> => {
    if ((await validateToken(token)) == true) {
      return JSON.parse(decodeURIComponent(escape(atob(token.split(".")[1]))));
    }
    return null;
  };

  const decodeToken = async (token: string) => {
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRnJhbnRpxaFlayIsInN1cm5hbWUiOiJaYWtvcGFsIiwiZGF5IjoiUMOhdGVrIn0.BaY1yaa4Lhs6n2oUOD-C3BmAnAWVQv-BVgite2mg06w";
    const parsedToken: TokenInterface | null = await parseToken(token);
    console.log(parsedToken);
  };

  const [user] = createResource(() => params.id, decodeToken);
  return <div className="text-6xl text-white">{user.name}</div>;
};

export default Food;
