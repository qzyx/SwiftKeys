import { Settings, Settings2 } from "lucide-react";
import { useState } from "react";
import MobileTestSettingsForm from "./MobileTestSettingsForm";
import DesktopTestSettingsForm from "./DesktopTestSettingsForm";
import MobileTestSettingsButton from "./MobileTestSettingsButton";
import { useSelector } from "react-redux";

export default function TestSettings() {
  const count = useSelector((state) => state.testSettings.count);
  const option = useSelector((state) => state.testSettings.option);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-center w-full items-center h-28 mb-4">
        {/* Mobile button */}
        <MobileTestSettingsButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <DesktopTestSettingsForm count={count} option={option} />
      </div>

      {isOpen && (
        <MobileTestSettingsForm
          count={count}
          option={option}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
