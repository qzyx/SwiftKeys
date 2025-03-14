import RetryBtn from "./RetryBtn";
import Test from "./Test";
import TestSettings from "./TestSettings";

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
