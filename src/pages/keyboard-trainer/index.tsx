import { useEffect, useState } from "react";
import "./styles.css";

const URL = "https://fish-text.ru/get?";

const KeyboardTrainer = () => {
  const [leftText, setLeftText] = useState<string>("");
  const [rightText, setRightText] = useState<string>("");

  const getNewText = (): void => {
    console.log("getNewText");
    fetch(URL + "&type=sentence&number=1").then((res) =>
      res
        .json()
        .then(({ text }) =>
          setRightText((prev) =>
            prev.concat(prev.length > 0 ? " " + text : text)
          )
        )
    );
  };

  useEffect(() => getNewText(), []);

  const handleKeyPress = (event: KeyboardEvent) => {
    const letter = event.key;

    if (rightText.length < 20) {
      getNewText();
    }

    if (rightText.length > 0 && letter === rightText[0]) {
      setLeftText((prev) => prev.concat(letter));
      setRightText((prev) => prev.slice(1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rightText]);

  return (
    <div className='wrapper' onKeyDown={(e) => console.log(e)}>
      <div className='left'>{leftText}</div>
      <div className='right'>{rightText}</div>
    </div>
  );
};

export default KeyboardTrainer;
