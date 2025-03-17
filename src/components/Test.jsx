import { useSelector } from "react-redux";
import { englishWords } from "../assets/words/english";
import React, { useState, useEffect } from "react";

function Test() {
  const option = useSelector((state) => state.testSettings.option);
  const count = useSelector((state) => state.testSettings.count);
  const font_size = useSelector((state) => state.settings.font_size);
  const [words, setWords] = useState([]);
  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // Get 10 random words when component mounts
  useEffect(() => {
    if (option === "words") {
      const randomWords = [];
      for (let i = 0; i < count; i++) {
        randomWords.push(get_random(englishWords));
      }
      setWords(randomWords);
    } else {
      // Get random letters
      const randomWords = [];
      for (let i = 0; i < 100; i++) {
        randomWords.push(get_random(englishWords));
      }
      setWords(randomWords);
    }
  }, [option, count]);

  return (
    <div
      className={`flex px-2 sm:px-6 md:px-10 lg:px-12 flex-wrap text-secondary overflow-hidden  ${
        font_size === "sm"
          ? "text-md max-h-[4.5rem]"
          : font_size === "md"
          ? "text-xl max-h-[6rem]"
          : font_size === "lg"
          ? "text-2xl max-h-[7.5rem]"
          : font_size === "xl"
          ? "text-3xl max-h-[8.5rem]"
          : "text-4xl max-h-[9rem]"
      }`}
    >
      {words.map((word, index) => (
        <div key={index} className="word p-[3px]">
          {Array.from(word).map((letter, i) => (
            <span className="letter" key={i}>
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Test;
