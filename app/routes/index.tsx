import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { LinksFunction, LoaderFunction, useLoaderData } from "remix";

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
  const [letters, setLetters] = useState<{ index: number; value: string }[]>(
    Array.from({ length: 25 }, (val, i) => ({ index: i, value: "" }))
  );

  const { word } = useLoaderData<{ word: string }>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [currentValue, setCurrentValue] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
    if (currentIndex > 4) {
      setMessage("Submit to continue");
      return;
    }

    setCurrentValue(event.target.value);

    if (event.nativeEvent.inputType === "insertText") {
      setLetters((letters) => {
        const newLetters = [...letters];
        newLetters[currentIndex] = {
          ...newLetters[currentIndex],
          value: event.target.value.at(-1)!,
        };
        return newLetters;
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCheck: MouseEventHandler<HTMLButtonElement> = () => {
    if (word === currentValue) {
      setMessage("You guessed right!");
    } else {
      // color code value
    }
  };

  return (
    <div className="screen">
      <h1>Wordle</h1>

      <div className="container">
        <input type="text" autoFocus onChange={handleChange} />
        <div className="grid">
          {letters.map((letter, i) => (
            <div key={i} className="box">
              {letter.value}
            </div>
          ))}
          <button className="btn-check" onClick={handleCheck}>
            Check
          </button>
        </div>
        {message}
      </div>
    </div>
  );
}
