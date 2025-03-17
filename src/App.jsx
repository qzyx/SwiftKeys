import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import { useEffect } from "react";

export default function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/account" element={<Account />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
