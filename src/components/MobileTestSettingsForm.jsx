import { RectangleEllipsis, Settings2, Timer, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCount, setOption } from "../features/Test/TestSettingsSlice";

export default function MobileTestSettingsForm({
  setIsOpen,
  isOpen,
  option,
  count,
}) {
  const node = useRef();
  const dispatch = useDispatch();
  const [animationClass, setAnimationClass] = useState("animate-slide-in");

  const handleClose = () => {
    setAnimationClass("animate-slide-out");
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  function handleOutsideClick(event) {
    if (node.current && !node.current.contains(event.target)) {
      handleClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setAnimationClass("animate-slide-in");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={node}
      className={`z-10 inser-0  w-72 bg-secondary ${animationClass} border-primary border-l-2 border-t-2 border-b-2 fixed top-[50%] translate-y-[-50%] right-0 rounded-l-xl flex flex-col items-center`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between w-full font-karantina text-2xl px-4 py-2 rounded-t-xl text-primary">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="button"
        >
          <X></X>
        </button>
        <span className="text-xl">Test Settings</span>
      </div>
      <div className="flex flex-col gap-4 items-center mt-4 text-primary font-karantina text-2xl w-full shadow-md pb-8">
        <button
          onClick={() => dispatch(setOption("words"))}
          className={`w-25 py-2 rounded-full shadow-md border-background border flex items-center justify-center gap-3 ${
            option === "words"
              ? "bg-primary text-secondary"
              : "bg-secondary hover:shadow-xl hover:scale-105 transition-all duration-150"
          }`}
        >
          Words
          <RectangleEllipsis></RectangleEllipsis>
        </button>
        <button
          onClick={() => dispatch(setOption("time"))}
          className={`w-25 button py-2 rounded-full shadow-md border-background border flex items-center justify-center gap-3 ${
            option === "time"
              ? "bg-primary text-secondary"
              : "bg-secondary hover:shadow-xl hover:scale-105 transition-all duration-150"
          }`}
        >
          Time
          <Timer></Timer>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 items-center text-tertiary">
        {[5, 10, 20, 30, 40].map((num) => (
          <button
            onClick={() => dispatch(setCount(num))}
            key={num}
            className={`w-25 transition-all duration-250 py-2 rounded-full   border-background border flex items-center justify-center gap-3 ${
              count === num
                ? "bg-primary text-secondary"
                : "bg-secondary hover:shadow-xl hover:scale-105 transition-all duration-150 cursor-pointer"
            }`}
          >
            {num}
          </button>
        ))}
        <div className="my-10">
          <button className="w-30 button  transition-all duration-150 py-2 rounded-full bg-secondary  border-background border flex items-center justify-center gap-2 font-karantina text-2xl hover:bg-background hover:text-primary">
            Custom <Settings2></Settings2>
          </button>
        </div>
      </div>
    </div>
  );
}
