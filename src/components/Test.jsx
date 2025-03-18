import { useSelector } from "react-redux";
import { englishWords } from "../assets/words/english";
import React, { useState, useEffect } from "react";
import RetryBtn from "./RetryBtn";

function Test() {
  const option = useSelector((state) => state.testSettings.option);
  const count = useSelector((state) => state.testSettings.count);
  const font_size = useSelector((state) => state.settings.font_size);
  const [words, setWords] = useState([]);
  const reset_key = useSelector((state) => state.settings.quick_start);
  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === reset_key) {
        handleReset();
      }
    });
  }, [reset_key]);
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
  function handleReset() {
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
  }
  return (
    <div className="flex flex-col">
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
          <div
            key={index}
            className={`word ${
              font_size === "sm"
                ? "p-[2px]"
                : font_size === "md"
                ? "p-[3px]"
                : font_size === "lg"
                ? "p-[4px]"
                : font_size === "xl"
                ? "p-[5px]"
                : "p-[6px]"
            }`}
          >
            {Array.from(word).map((letter, i) => (
              <span className="letter" key={i}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div >
        <RetryBtn handleReset={handleReset}></RetryBtn>
      </div>
    </div>
  );
}

export default Test;
