import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./components/Pages/Customers.jsx";
import Sidebar from "./components/Pages/Sidebar.jsx";
import DashboardMain from "./components/Pages/DasboardMain.jsx";
import Equipment from "./components/Pages/Equipment.jsx";
import Inbox from "./components/Pages/Inbox.jsx";
import Invoice from "./components/Pages/Invoice.jsx";
import Reports from "./components/Pages/Reports.jsx";
import Notfoundd from "../additionalcomponents/Notfoundd.jsx";

import {useState, createContext} from 'react'

export const AppCustomContext = createContext();

function App() {
  const [usernamee,setUsernamee]=useState('new dummy data');
  const [rolee,setRolee]=useState('new role data');

  return (
    <>
    <AppCustomContext.Provider value={{usernamee,setUsernamee,rolee,setRolee}}>
      <Router>
        <Routes>
          {/* Routes without Sidebar */}
          <Route path="/" element={<Login />} />
          {/* Other routes with Sidebar */}
          <Route path="/customers" element={
          <>
                <Sidebar />
                <Customers />
          </>
            }
          />
          <Route
            path="/DashboardMain"
            element={
              <>
                <Sidebar />
                <DashboardMain />
              </>
            }
          />
          <Route
            path="/Equipment"
            element={
              <>
                <Sidebar />
                <Equipment />
              </>
            }
          />
          <Route
            path="/Inbox"
            element={
              <>
                <Sidebar />
                <Inbox />
              </>
            }
          />
          <Route
            path="/Invoice"
            element={
              <>
                <Sidebar />
                <Invoice />
              </>
            }
          />
          <Route
            path="/Reports"
            element={
              <>
                <Sidebar />
                <Reports />
              </>
            }
          />
          {/* 404 Route */}
          <Route path="*" element={<Notfoundd />} />
        </Routes>
      </Router>
      </AppCustomContext.Provider>
    </>
  );
}

export default App;
