import { get_random, wordsPerMinute } from "../features/Test/TestFunctions";
import { useDispatch, useSelector } from "react-redux";
import { englishWords } from "../assets/words/english";
import React, { useState, useEffect, use, useRef, useDebugValue } from "react";

import RetryBtn from "./RetryBtn";
import TestResult from "./TestResult";
import { p, text } from "framer-motion/client";
import {
  setCompleted,
  setTotal,
} from "../features/UserStatsSlice/UserStatsSlice";
import { AnimatePresence, motion } from "framer-motion";

function Test() {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const total = useSelector((state) => state.userStats.userStats.total);
  const topWpm = useSelector((state) => state.userStats.userStats.topWpm);
  const completed = useSelector((state) => state.userStats.userStats.completed);
  const option = useSelector((state) => state.testSettings.option);
  const count = useSelector((state) => state.testSettings.count);
  const font_size = useSelector((state) => state.settings.font_size);
  const [words, setWords] = useState([]);
  const reset_key = useSelector((state) => state.settings.quick_start);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);

  const [waitingForSpace, setWaitingForSpace] = useState(false);
  const [pushOfset, setPushOfset] = useState(0);
  const [curPos, setCurPos] = useState([]);
  let expectedWord = words[wordIndex];
  // If waiting for space, expect a space character, otherwise expect the next letter
  let expectedKey = waitingForSpace
    ? " "
    : expectedWord
    ? expectedWord[keyIndex]
    : "";

  useEffect(() => {
    setTypingStarted(false);
    setHistory([]);
    setKeyIndex(0);
    setWordIndex(0);
    setWaitingForSpace(false);
    setIsFinished(false);
    setTime(0);
    setCurPos([]);
    setPushOfset(0);
  }, [words]);

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

  useEffect(() => {
    const handleResetKeyPress = (event) => {
      event.preventDefault();
      if (event.key === reset_key) {
        handleReset();
      }
    };

    document.addEventListener("keydown", handleResetKeyPress);

    return () => {
      document.removeEventListener("keydown", handleResetKeyPress);
    };
  }, [reset_key, count, option]);

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

  // Key event handler
  useEffect(() => {
    function handleBackspace() {
      setHistory((prev) => [...prev.slice(0, -1)]);

      if (keyIndex === 0 && wordIndex === 0) {
        return;
      }
      if (keyIndex === 0 && wordIndex !== 0) {
        setWordIndex((prev) => prev - 1);
        setKeyIndex(words[wordIndex - 1].length);
        setWaitingForSpace(true);
        return;
      }
      if (keyIndex === words[wordIndex].length) {
        setKeyIndex(words[wordIndex].length - 1);
        setWaitingForSpace(false);
        return;
      }
      if (keyIndex !== 0 && keyIndex !== words[wordIndex].length) {
        setKeyIndex((prev) => prev - 1);
        return;
      }
    }
    function handleKeyDown(event) {
      if (!typingStarted && event.key !== reset_key) {
        setTypingStarted(true);
        dispatch(setTotal(total + 1));
      }

      // Stop event propagation
      event.stopPropagation();
      if (event.key === "Backspace") {
        handleBackspace();
        return;
      }
      // Handle correct key
      if (event.key === expectedKey) {
        if (waitingForSpace) {
          // We were waiting for a space and got it - move to next word
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: -1, // Special value for space
              value: true,
              last: "space",
            },
          ]);

          setWaitingForSpace(false);
          setWordIndex((prev) => prev + 1);
          setKeyIndex(0);
        } else if (keyIndex === expectedWord.length - 1) {
          // Last letter in word - mark as correct and set waiting for space
          if (option === "words") {
            if (wordIndex === count - 1) {
              setIsFinished(true);
              dispatch(setCompleted(completed + 1));
            }
          }
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: true,
              last: true,
            },
          ]);

          setKeyIndex((prev) => prev + 1); // Move past the end of the word
          setWaitingForSpace(true); // Now wait for space before next word
        } else {
          // Normal case - correct letter in the middle of a word

          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: true,
              last: false,
            },
          ]);

          setKeyIndex((prev) => prev + 1);
        }
      } else if (event.key !== "Backspace") {
        // Incorrect key logic
        if (waitingForSpace) {
          null;
        } else if (keyIndex === expectedWord.length - 1) {
          if (option === "words") {
            if (wordIndex === count - 1) {
              setIsFinished(true);
            }
          }
          // Last letter in word but incorrect
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: false,
              last: true,
            },
          ]);

          setKeyIndex((prev) => prev + 1);
          setWaitingForSpace(true); // Still need space for next word
        } else {
          // Incorrect letter in the middle of a word
          setHistory((prev) => [
            ...prev,
            {
              wordIndex: wordIndex,
              keyIndex: keyIndex,
              value: false,
              last: false,
            },
          ]);

          setKeyIndex((prev) => prev + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expectedWord, expectedKey, keyIndex, wordIndex, waitingForSpace]);

  useEffect(() => {
    if (option === "time") {
      if (time === count * 1000) {
        setIsFinished(true);
        dispatch(setCompleted(completed + 1));
      }
    }
  }, [time, count, option]);

  const startTimeRef = useRef(null);
  const requestIdRef = useRef(null);

  useEffect(() => {
    let startTime;

    const updateTimer = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      setTime(Math.floor(elapsedTime));
      if (option === "time" && elapsedTime >= count * 1000) {
        setIsFinished(true);
        dispatch(setCompleted(completed + 1));
        return;
      }

      requestIdRef.current = requestAnimationFrame(updateTimer);
    };

    if (typingStarted && !isFinished) {
      requestIdRef.current = requestAnimationFrame(updateTimer);
    }
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [typingStarted, isFinished, option, count]);
  return isFinished ? (
    <AnimatePresence mode="wait">
      <TestResult
        history={history}
        option={option}
        count={count}
        time={time}
      ></TestResult>
    </AnimatePresence>
  ) : (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.125 }}
        className="flex flex-col"
      >
        <div
          className={`flex px-2  font-mono sm:px-6 md:px-10 lg:px-12 flex-wrap text-secondary overflow-hidden  ${
            font_size === "sm"
              ? "text-md max-h-[6rem] gap-x-2"
              : font_size === "md"
              ? "text-xl max-h-[7.2rem] gap-x-2"
              : font_size === "lg"
              ? "text-2xl max-h-[8rem] gap-x-3"
              : font_size === "xl"
              ? "text-3xl max-h-[9rem] gap-x-4"
              : "text-4xl max-h-[10rem] gap-x-5"
          }`}
        >
          {words.map((word, index) => (
            <div
              key={index}
              id="word"
              style={{ transform: `translateY(-${pushOfset}rem)` }}
              className={` relative  `}
            >
              {waitingForSpace && index === wordIndex && (
                <span>
                  <span
                    className={`absolute  top-1/2 -translate-y-1/2 ${
                      font_size === "sm"
                        ? "h-3.5 w-1.5 -right-1.5"
                        : font_size === "md"
                        ? "h-8 w-2 -right-2"
                        : font_size === "lg"
                        ? "h-10 w-2.5 -right-2.5"
                        : font_size === "xl"
                        ? "h-12 w-3 -right-3"
                        : "h-14 w-3.5 -right-4"
                    } bg-secondary rounded-sm `}
                  ></span>
                </span>
              )}
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
                    } ${
                      index === wordIndex && i === keyIndex && !waitingForSpace
                        ? "relative"
                        : ""
                    }`}
                    key={i}
                  >
                    {index === wordIndex &&
                      i === keyIndex &&
                      !waitingForSpace && (
                        <span
                          id="cursor"
                          className=" absolute -left-[1px] top-0 bottom-0 w-0.5 bg-primary animate-pulse"
                        ></span>
                      )}
                    {letter}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex gap-5 w-full justify-center items-center mt-15 relative">
          {option === "time" ? (
            <div className="text-secondary font-mono text-3xl flex flex-col gap-2 items-center absolute left-2 sm:left-6 md:left-10 lg:left-12 bottom-5">
              <span>{(time / 1000).toFixed(2)}</span>
              <span className="h-1 w-10 bg-secondary"></span>
              <span>{count}</span>
            </div>
          ) : (
            <div className="text-secondary font-mono text-3xl flex flex-col gap-2 items-center absolute left-2 sm:left-6 md:left-10 lg:left-12 bottom-5 ">
              <span>{history.filter((item) => item.last === true).length}</span>
              <span className="h-1 w-10 bg-secondary"></span>
              <span>{count}</span>
            </div>
          )}
          <RetryBtn handleReset={handleReset} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Test;
