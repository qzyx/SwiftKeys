import { useSelector } from "react-redux";
import RetryBtn from "../components/RetryBtn";
import Test from "../components/Test";
import TestSettings from "../components/TestSettings";
import useSettings from "../hooks/useSettings";

export default function Home() {
  const max_line_width = useSelector((state) => state.settings.max_line_width);
  const theme = useSettings();

  return (
    <div className="w-full">
      <div>
        <TestSettings></TestSettings>
      </div>
      <div className={`flex justify-center max-w-[${max_line_width}%] `}>
        <Test></Test>
      </div>
      <div>
        <RetryBtn></RetryBtn>
      </div>
    </div>
  );
}
