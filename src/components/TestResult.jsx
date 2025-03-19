import { wordsPerMinute } from "../features/Test/TestFunctions";

export default function TestResult({ history, time, option, count }) {
  return (
    <div className="w-full rounded-lg max-w-2xl mx-auto my-8 flex justify-around p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800/40 shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
      <div className="font-mono flex-col items-center flex gap-3 text-primary transition-all duration-300   px-4 py-2 rounded-md">
        <span className="text-2xl font-bold uppercase tracking-wide">WPM</span>
        <span className="text-5xl font-semibold">
          {wordsPerMinute(
            history.filter((item) => item.last === true).length,
            time / 1000
          )}
        </span>
        <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2"></div>
      </div>

      <div className="font-mono flex-col items-center flex gap-3 text-primary transition-all duration-300   px-4 py-2 rounded-md">
        <span className="text-2xl font-bold uppercase tracking-wide">
          Test type
        </span>
        <div className="flex gap-2 items-baseline">
          <span className="text-2xl font-semibold capitalize">{option}</span>
          <span className="text-3xl font-semibold">
            {count}
            {option === "time" && <span className="text-xl ml-1">seconds</span>}
          </span>
        </div>
        <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2"></div>
      </div>
    </div>
  );
}
