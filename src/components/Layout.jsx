import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="">
      <Header></Header>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
