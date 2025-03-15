import { Settings } from "lucide-react";

function MobileTestSettingsButton({ isOpen, setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="bg-secondary transition-all duration-250 focus:bg-tertiary cursor-pointer shadow-background px-6 hover:pr-10 py-2 hover:pl-2 md:hidden
        focus:text-secondary rounded-md font-karantina text-2xl text-primary border border-primary tracking-wide flex items-center group relative"
    >
      <span>Test Settings</span>
      <Settings className="  opacity-0 absolute right-2 group-hover:opacity-100 transition-opacity duration-250 ml-2" />
    </button>
  );
}

export default MobileTestSettingsButton;
