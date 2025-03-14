import { Settings } from "lucide-react";

export default function TestSettings() {
  return (
    <div className="flex justify-center w-full items-center h-40 ">
      <button
        className="bg-secondary transition-all duration-250 focus:bg-tertiary cursor-pointer shadow-background px-6 hover:pr-10 py-2 hover:pl-2
      focus:text-secondary rounded-md font-karantina text-2xl text-primary border border-primary tracking-wide flex items-center group relative"
      >
        <span className=" ">Test Settings</span>
        <span className="  opacity-0 absolute right-2 group-hover:opacity-100 transition-opacity duration-250 ml-2">
          <Settings></Settings>
        </span>
      </button>
    </div>
  );
}
