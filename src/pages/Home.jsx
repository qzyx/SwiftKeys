import RetryBtn from "../components/RetryBtn";
import Test from "../components/Test";
import TestSettings from "../components/TestSettings";

export default function Home() {
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
