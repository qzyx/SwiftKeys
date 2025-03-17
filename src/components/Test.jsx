import { useSelector } from "react-redux";
import { englishWords } from "../assets/words/english";
import React, { useState, useEffect } from "react";

function Test() {
  const option = useSelector((state) => state.testSettings.option);
  const count = useSelector((state) => state.testSettings.count);
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
    <div className="flex w-[80%] flex-wrap text-secondary max-h-40 overflow-y-hidden text-xl">
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
