import { Settings, Settings2 } from "lucide-react";
import { useState } from "react";
import MobileTestSettingsForm from "./MobileTestSettingsForm";
import DesktopTestSettingsForm from "./DesktopTestSettingsForm";
import MobileTestSettingsButton from "./MobileTestSettingsButton";

export default function TestSettings() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-center w-full items-center h-28 mb-4">
        {/* Mobile button */}
        <MobileTestSettingsButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <DesktopTestSettingsForm />
      </div>

      {isOpen && (
        <MobileTestSettingsForm isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
}
