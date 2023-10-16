import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./layout/Header";

import Home from "./Pages/Home";

import Sidebar from "./layout/Sidebar";
import SidebarOpener from "./layout/SidebarOpener"
import Footer from "./layout/Footer";

import Bubbles from "./layout/Bubbles"

function App() {
  const [sidebarOpen,setSidebarOpen] = useState(window.innerWidth>768? true : false)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      {sidebarOpen? <Sidebar /> : null}
      <Footer />
      {window.innerWidth>768
      ? <SidebarOpener sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      : null
      }
      <Bubbles />
    </BrowserRouter>
  );
}

export default App;
