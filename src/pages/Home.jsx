import { useSelector } from "react-redux";
import RetryBtn from "../components/RetryBtn";
import Test from "../components/Test";
import TestSettings from "../components/TestSettings";
import useSettings from "../hooks/useSettings";

export default function Home() {
  const theme = useSettings();

  return (
    <div className="w-full">
      <div>
        <TestSettings></TestSettings>
      </div>
      <div className="flex justify-center w-full  ">
        <Test></Test>
      </div>
      <div>
        <RetryBtn></RetryBtn>
      </div>
    </div>
  );
}
