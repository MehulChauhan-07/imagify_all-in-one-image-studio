import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Home from "./pages/Home-v1";
import Home from "./pages/Home_v2"
// import Result from "./pages/Result";
import Result from "./pages/Result_v2";
// import BuyCredit from "./pages/BuyCredit";
import BuyCredit from "./pages/BuyCredit_v2";
// import Navbar from "./components/Layout/Navbar";
// import Footer from "./components/Layout/Footer";
import Footer from "./components/Layout/Footer_v2";
import Navbar from "./components/Layout/Navbar_v2";

import Login from "./components/auth/Login";
import { AppContext } from "./context/AppContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { showLogin } = React.useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orannge-50">
      <ToastContainer position="bottom-right" />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
