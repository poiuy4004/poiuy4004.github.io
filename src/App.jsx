
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./layout/Header";

import Home from "./Pages/Home";

import Sidebar from "./layout/Sidebar";

import Bubbles from "./layout/Bubbles"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      <Sidebar />
      <Bubbles />
    </BrowserRouter>
  );
}

export default App;
