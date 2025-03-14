import { RotateCcw } from "lucide-react";

function RetryBtn() {
  return (
    <div className="flex w-full h-10 text-primary justify-center my-20">
      <button className="px-5 py-2 hover:text-tertiary transition-all duration-150 cursor-pointer group bg-secondary rounded-md flex items-center gap-2">
        <span>Reset</span>
        <span className="rotate-0 group-hover:-rotate-160 focus:-rotate-180 transition-transform ease-in-out duration-550">
          <RotateCcw size={20}></RotateCcw>
        </span>
      </button>
    </div>
  );
}

export default RetryBtn;
