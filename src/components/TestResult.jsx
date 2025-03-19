export default function TestResult({ history, time }) {
  return (
    <div className="bg-red-500 w-full h-10">
      <div className="font-mono text-3xl flex gap-5 text-primary">
        <span className="">WPM</span>
        {/* pass time in seconds */}
        <span>
          {wordsPerMinute(
            history.filter((item) => item.last === true).length,
            time / 1000
          )}
        </span>
      </div>
    </div>
  );
}
