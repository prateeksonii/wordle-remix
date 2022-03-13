import { MouseEventHandler, useEffect, useState } from "react";

export default (word: string) => {
  const [letters, setLetters] = useState<
    { index: number; value: string; color: string }[]
  >(
    Array.from({ length: 25 }, (val, i) => ({
      index: i,
      value: "",
      color: "white",
    }))
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [canContinue, setCanContinue] = useState<boolean>(false);

  useEffect(() => {
    if (canContinue) {
      return setCanContinue(false);
    }
    if (currentIndex != 0 && currentIndex % 5 === 0) {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });

  const keyHandler = (event: KeyboardEvent) => {
    if (canContinue) {
      setMessage("Submit to continue");
      return;
    }

    console.log(event);

    // FIXME: HANDLE KEYS OTHER THAN ALPHABETS
    setCurrentValue(currentValue + event.key);

    setLetters((letters) => {
      const newLetters = [...letters];
      newLetters[currentIndex] = {
        ...newLetters[currentIndex],
        value: event.key,
        color: "white",
      };
      return newLetters;
    });
    setCurrentIndex(currentIndex + 1);
  };

  const handleCheck: MouseEventHandler<HTMLButtonElement> = () => {
    if (word === currentValue) {
      setMessage("You guessed right!");
    } else {
      // color code value, continue

      for (let i = 0; i < 5; i++) {
        if (word[i] === currentValue[i]) {
          // TODO: complete this
        }
      }

      setCurrentValue("");
      setCanContinue(false);
    }
  };

  return { letters, handleCheck, canContinue, message };
};
