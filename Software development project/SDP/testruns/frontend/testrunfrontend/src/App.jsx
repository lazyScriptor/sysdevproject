import { useState, createContext } from "react";
// step 1: import create context
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

//step 2 : create context
export const AppCustomeContext = createContext();


function App() {
  const [name, setName] = useState("Dummy");


  const handle=()=>{

  }

  return (
    <>
      {/* step 3 */}
      <AppCustomeContext.Provider value={{ name, setName }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </AppCustomeContext.Provider>
    </>
  );
}

export default App;
