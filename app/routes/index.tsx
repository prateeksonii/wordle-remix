import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import useGame from "~/hooks/useGame";

import stylesUrl from "../styles/index/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = () => {
  return {
    word: "today",
  };
};

export default function () {
  const { word } = useLoaderData<{ word: string }>();

  const { canContinue, handleCheck, letters, message } = useGame(word);

  return (
    <div className="screen">
      <h1>Wordle</h1>

      <div className="container">
        <div className="grid">
          {letters.map((letter, i) => (
            <div key={i} className="box">
              {letter.value}
            </div>
          ))}
          <button
            className="btn-check"
            onClick={handleCheck}
            disabled={!canContinue}
          >
            Check
          </button>
        </div>
        {message}
      </div>
    </div>
  );
}
