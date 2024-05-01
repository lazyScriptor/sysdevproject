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

import { useState, createContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material";

export const AppCustomContext = createContext();

function App() {
  const [usernamee, setUsernamee] = useState("new dummy data");
  const [rolee, setRolee] = useState("new role data");

  const theme = createTheme({
    // Define your theme here
    palette: {
      primary: {
        50: "#e0f7fa",
        100: "#b2ebf2",
        200: "#80deea",
        300: "#4dd0e1",
        400: "#26c6da",
        500: "#00bcd4",
        600: "#00acc1",
        700: "#0097a7",
        800: "#00838f",
        900: "#006064",
        monochromic:"#00C9B6",
      },
      secondary: {
        main: "#00ff00",
      },
      ps: { main: "#00ff00" },
      common: {
        maincolour1: "red",
        maincolour2: "green",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppCustomContext.Provider
        value={{ usernamee, setUsernamee, rolee, setRolee }}
      >
        <Router>
          <Routes>
            {/* Routes without Sidebar */}
            <Route path="/" element={<Login />} />
            {/* Other routes with Sidebar */}
            <Route
              path="/customers"
              element={
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
    </ThemeProvider>
  );
}

export default App;