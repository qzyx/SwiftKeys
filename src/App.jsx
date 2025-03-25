import { AnimatePresence, motion } from "framer-motion";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import Header from "./components/Header";

import Account from "./pages/Account";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <PageWrapper>
              <Settings />
            </PageWrapper>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <PageWrapper>
              <Account />
            </PageWrapper>
          }
        ></Route>
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.125 }}
    >
      {children}
    </motion.div>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header></Header>
          <AnimatedRoutes></AnimatedRoutes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
