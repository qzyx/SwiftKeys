import { useSelector, useDispatch } from "react-redux";
import { wordsPerMinute } from "../features/Test/TestFunctions";
import { setTopWpm } from "../features/UserStatsSlice/UserStatsSlice";
import { useState, useEffect } from "react";
import { Crown, Clock, Trophy } from "lucide-react";

export default function TestResult({ history, time, option, count }) {
  const [isPersonalBest, setIsPersonalBest] = useState(false);
  const dispatch = useDispatch();
  const wpm = wordsPerMinute(
    history.filter((item) => item.last === true).length,
    time / 1000
  );
  const topWpm = useSelector((state) => state.userStats.userStats.topWpm);

  useEffect(() => {
    if (wpm > topWpm) {
      dispatch(setTopWpm(wpm));
      setIsPersonalBest(true);
    }
  }, [wpm, topWpm, dispatch]);

  console.log("Top Wpm", topWpm);

  return (
    <div className="w-full rounded-xl max-w-3xl mx-auto my-12 p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800/40 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary dark:text-primary">
          Test Results
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* WPM Card */}
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 relative overflow-hidden">
          <div className="flex flex-col items-center">
            <div className="relative">
              {isPersonalBest && (
                <div className="absolute -top-1 -right-12 bg-primary text-white px-10 py-1 rotate-45 transform text-xs font-bold">
                  NEW BEST!
                </div>
              )}
              <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                {isPersonalBest && <Crown className="h-5 w-5 text-primary" />}
                WORDS PER MINUTE
              </h3>
            </div>
            <div className="text-7xl font-mono font-bold text-primary my-6 relative">
              {wpm}
              {isPersonalBest && (
                <span className="absolute -top-3 -right-6">
                  <Crown className="h-8 w-8 text-primary" />
                </span>
              )}
            </div>
            <div className="h-1.5 w-32 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="col-span-1 space-y-4">
          {/* Test Type Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-bold text-primary">Test Type</h3>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-primary capitalize">
                {option}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-mono font-bold text-primary">
                  {count}
                </span>
                {option === "time" && (
                  <span className="text-sm text-primary/80">seconds</span>
                )}
              </div>
            </div>
          </div>

          {/* Personal Best Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-3">
              <Trophy className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-bold text-primary">Personal Best</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-mono font-bold text-primary">
                {topWpm}
              </span>
              <span className="text-sm ml-1 text-primary/80">WPM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
