import { useState ,useEffect} from "react";
import "./App.css";
import InputArea from "./components/InputArea";
import LoginPage from "./pages/LoginPage";
import AuthorizedPage from './pages/AuthorizedPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnAuthorizedPage from './pages/UnAuthorized' 



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/authorize" element={<AuthorizedPage/>}/>
        <Route path="/unauthorized" element={<UnAuthorizedPage/>}/>
      </Routes>

    </Router>
      
      
    </>
  );
}

export default App;
