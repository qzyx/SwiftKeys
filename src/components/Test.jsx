import { englishWords } from "../assets/words/english";
import React, { useState, useEffect } from "react";

function Test() {
  const [words, setWords] = useState([]);
  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  // Get 10 random words when component mounts
  React.useEffect(() => {
    const randomWords = [];
    for (let i = 0; i < 10; i++) {
      randomWords.push(get_random(englishWords));
    }
    setWords(randomWords);
  }, []);

  return (
    <div className="flex w-[80%] flex-wrap text-secondary text-xl">
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
