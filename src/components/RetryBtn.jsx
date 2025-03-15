import { RotateCcw } from "lucide-react";

function RetryBtn() {
  return (
    <div className="flex w-full h-10 text-primary justify-center my-20 ">
      <button className=" p-3 hover:text-tertiary rounded-full transition-all duration-150 hover:bg-tertiary/20 cursor-pointer group   flex items-center ">
        <span className="rotate-0 group-hover:-rotate-180 focus:-rotate-180 transition-transform ease-in-out duration-550">
          <RotateCcw size={20}></RotateCcw>
        </span>
      </button>
    </div>
  );
}

export default RetryBtn;
