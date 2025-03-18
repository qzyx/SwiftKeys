import { useSelector } from "react-redux";
import { englishWords } from "../assets/words/english";
import React, { useState, useEffect, use } from "react";
import RetryBtn from "./RetryBtn";

function Test() {
  const option = useSelector((state) => state.testSettings.option);
  const count = useSelector((state) => state.testSettings.count);
  const font_size = useSelector((state) => state.settings.font_size);
  const [words, setWords] = useState([]);
  const reset_key = useSelector((state) => state.settings.quick_start);

  const [history, setHistory] = useState([]);
  console.log(history);
  const [wordIndex, setWordIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);
  let currentKey = { wordIndex, keyIndex };
  console.log(currentKey);
  console.log("wordIndex", wordIndex);
  console.log("keyIndex", keyIndex);
  let expectedWord = words[wordIndex];
  let expectedKey = expectedWord ? expectedWord[keyIndex] : "";

  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  useEffect(() => {
    const handleResetKeyPress = (event) => {
      if (event.key === reset_key) {
        handleReset();
      }
    };

    document.addEventListener("keydown", handleResetKeyPress);

    return () => {
      document.removeEventListener("keydown", handleResetKeyPress);
    };
  }, [reset_key]);

  // Get words when component mounts or when option/count changes
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
    setWordIndex(0);
    setKeyIndex(0);
  }

  // Fix for key event handler
  useEffect(() => {
    function handleKeyDown(event) {
      console.log("key", event.key);
      // If we don't have words yet, or we've reached the end, do nothing
      if (!expectedWord) return;

      // Stop event propagation to prevent both handlers from firing
      event.stopPropagation();

      // Handle correct key
      if (event.key === expectedKey) {
        console.log("Correct key");
        if (keyIndex === expectedWord.length - 1) {
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: true,
              last: true,
            },
          ]);
          // Move to next word

          setWordIndex((prev) => prev + 1);
          setKeyIndex(0);
        } else {
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: true,
              last: false,
            },
          ]);

          // Move to next letter in current word
          setKeyIndex((prev) => prev + 1);
        }
      } else {
        console.log("Incorrect key");

        if (keyIndex === expectedWord.length - 1) {
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: false,
              last: true,
            },
          ]);
          // Move to next word
          setWordIndex((prev) => prev + 1);
          setKeyIndex(0);
        } else {
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: false,
              last: false,
            },
          ]);
          // Move to next letter in current word
          setKeyIndex((prev) => prev + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Proper cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expectedWord, expectedKey, keyIndex, wordIndex]);

  useEffect(() => {
    setHistory([]);
  }, [words]);
  return (
    <div className="flex flex-col">
      <div
        className={`flex px-2  font-mono sm:px-6 md:px-10 lg:px-12 flex-wrap text-secondary overflow-hidden  ${
          font_size === "sm"
            ? "text-md max-h-[4.5rem] gap-x-1.5"
            : font_size === "md"
            ? "text-xl max-h-[5rem] gap-x-2"
            : font_size === "lg"
            ? "text-2xl max-h-[8rem] gap-x-3"
            : font_size === "xl"
            ? "text-3xl max-h-[9rem] gap-x-4"
            : "text-4xl max-h-[10rem] gap-x-5"
        }`}
      >
        {words.map((word, index) => (
          <div key={index} className={`word `}>
            {Array.from(word).map((letter, i) => {
              const historyItem = history.find(
                (item) => item.wordIndex === index && item.keyIndex === i
              );
              return (
                <span
                  className={`letter ${
                    historyItem
                      ? historyItem.value
                        ? "text-tertiary"
                        : "text-red-600"
                      : ""
                  } ${index === wordIndex && i === keyIndex ? "relative" : ""}`}
                  key={i}
                >
                  {index === wordIndex && i === keyIndex && (
                    <span className="absolute -left-[1px] top-0 bottom-0 w-0.5 bg-primary animate-pulse"></span>
                  )}
                  {letter}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        <RetryBtn handleReset={handleReset}></RetryBtn>
      </div>
    </div>
  );
}

export default Test;
