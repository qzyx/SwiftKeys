import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function RetryBtn({ handleReset }) {
  return (
    <button
      onClick={handleReset}
      className=" p-5 text-primary hover:text-tertiary rounded-full transition-all duration-150 hover:bg-tertiary/20 cursor-pointer group   flex items-center "
    >
      <span className="rotate-0 group-hover:-rotate-180 focus:-rotate-180 transition-transform ease-in-out duration-550">
        <RotateCcw size={30}></RotateCcw>
      </span>
    </button>
  );
}

export default RetryBtn;
