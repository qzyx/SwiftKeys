import { useSelector, useDispatch } from "react-redux";
import { wordsPerMinute } from "../features/Test/TestFunctions";
import { setTopWpm } from "../features/UserStatsSlice/UserStatsSlice";
import { useState, useEffect } from "react";
import { Crown, Clock, Trophy, ArrowRight } from "lucide-react";

export default function TestResult({ history, time, option, count }) {
  const correctWords = countCorrectWords(history);
  const wpm = wordsPerMinute(correctWords, time / 1000);
  const [isPersonalBest, setIsPersonalBest] = useState(false);

  const dispatch = useDispatch();

  const topWpm = useSelector((state) => state.userStats.userStats.topWpm);

  useEffect(() => {
    if (wpm > topWpm) {
      dispatch(setTopWpm(wpm));
      setIsPersonalBest(true);
    }
  }, [wpm, topWpm, dispatch]);

  function countCorrectWords(arr) {
    let correctWordCount = 0;
    let currentGroup = [];

    // Process all items in the history array
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (item.last === "space") {
        // When we hit a space, we check if the current group has any errors
        const hasError = currentGroup.some((obj) => obj.value === false);

        // If no errors, increment the correct word count
        if (currentGroup.length > 0 && !hasError) {
          correctWordCount++;
        }

        // Reset current group for the next word
        currentGroup = [];
      } else {
        // Add this character to the current word group
        currentGroup.push(item);
      }
    }

    // Don't forget to check the last group if it's not followed by a space
    if (currentGroup.length > 0) {
      const hasError = currentGroup.some((obj) => obj.value === false);
      if (!hasError) {
        correctWordCount++;
      }
    }

    return correctWordCount;
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="backdrop-blur-md bg-white/30 dark:bg-secondary-800/30 rounded-2xl border border-white/20 dark:border-secondary-700/20 shadow-xl overflow-hidden transition-all">
        <div className="bg-gradient-to-r from-primary/10 to-transparent p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary mb-2">
            Test Complete
          </h2>
          <p className="text-secondary-600 dark:text-secondary-300 text-lg">
            Here's how you performed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-10">
          {/* WPM Main Card */}
          <div className="md:col-span-7 bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl duration-300 transform hover:-translate-y-1 border border-secondary-100 dark:border-secondary-700">
            <div className="relative h-full flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-primary/80 uppercase tracking-wide flex items-center">
                    <span>Your Speed</span>
                  </h3>

                  {isPersonalBest && (
                    <div className="flex items-center bg-primary text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">
                      <Crown className="h-3 w-3 mr-1" />
                      New Record!
                    </div>
                  )}
                </div>

                <div className="flex items-baseline mt-8">
                  <span className="text-7xl md:text-8xl font-bold text-primary">
                    {wpm}
                  </span>
                  <span className="ml-2 text-xl text-primary/70">WPM</span>

                  {isPersonalBest && (
                    <span className="absolute top-6 right-6">
                      <Crown className="h-12 w-12 text-primary opacity-10" />
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 h-2 bg-gradient-to-r from-primary to-primary/5 w-full"></div>
            </div>
          </div>

          {/* Stats Cards - Right Column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            {/* Test Type Card */}
            <div className="flex-1 bg-white dark:bg-secondary-800 rounded-xl p-5 shadow-md border-t border-l border-white/50 dark:border-secondary-700/50 transition-all hover:shadow-lg duration-300 transform hover:-translate-y-0.5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-primary">
                  Test Format
                </h3>
              </div>
              <div className="mt-2">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-xl font-semibold text-primary capitalize">
                      {option}
                    </span>
                    <ArrowRight className="h-4 w-4 mx-2 text-primary/50" />
                    <span className="text-2xl font-mono font-bold text-primary">
                      {count}
                    </span>
                    {option === "time" && (
                      <span className="text-sm ml-1 text-primary/60">
                        seconds
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Best Card */}
            <div className="flex-1 bg-white dark:bg-secondary-800 rounded-xl p-5 shadow-md border-t border-l border-white/50 dark:border-secondary-700/50 transition-all hover:shadow-lg duration-300 transform hover:-translate-y-0.5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-primary">
                  Personal Best
                </h3>
              </div>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-mono font-bold text-primary">
                  {topWpm}
                </span>
                <span className="text-sm ml-1 text-primary/60">WPM</span>
                {isPersonalBest && (
                  <span className="ml-2 text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Just Beaten!
                  </span>
                )}
              </div>
            </div>

            {/* Additional card slot for future expansion */}
          </div>
        </div>
      </div>
    </div>
  );
}
