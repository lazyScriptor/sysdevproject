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
// import './index.css'

import { useState, createContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material";
import NewLogin from "./components/Pages/NewLogin.jsx";
import Settings from "./components/Pages/Settings.jsx";

export const AppCustomContext = createContext();

function App() {
  const [usernamee, setUsernamee] = useState("new dummy data");
  const [rolee, setRolee] = useState("new role data");

  const theme = createTheme({
    // Define your theme here
    palette: {
      primary: {
        // 50: "#e0f7fa",
        // 100: "#b2ebf2",
        // 200: "#80deea",
        // 300: "#4dd0e1",
        // 400: "#26c6da",
        // 500: "#00bcd4",
        // 600: "#00acc1",
        // 700: "#0097a7",
        // 800: "#00838f",
        // 900: "#006064",

        //Blue shades
        // 50: "#e3f2fd",
        // 100: "#bbdefb",
        // 200: "#90caf9",
        // 300: "#64b5f6",
        // 400: "#42a5f5",
        // 500: "#2196f3",
        // 600: "#1e88e5",
        // 700: "#1976d2",
        // 800: "#1565c0",
        // 900: "#0d47a1",

        // purpleShades
        
        50: "#f3e5f5",
        100: "#e1bee7",
        200: "#ce93d8",
        300: "#ba68c8",
        400: "#ab47bc",
        500: "#9c27b0",
        600: "#8e24aa",
        700: "#7b1fa2",
        800: "#6a1b9a",
        900: "#4a148c",

        //orange shades
        // 50: "#FFF3E0",
        // 100: "#FFE0B2",
        // 200: "#FFCC80",
        // 300: "#FFB74D",
        // 400: "#FFA726",
        // 500: "#FF9800",
        // 600: "#FB8C00",
        // 700: "#F57C00",
        // 800: "#EF6C00",
        // 900: "#E65100",

        error: {
          10:"#ffe6e6",
          50: "#FFCCCC",
          100: "#FF9999",
          200: "#FF6666",
          300: "#FF3333",
          400: "#FF0000",
          500: "#CC0000",
          600: "#990000",
          700: "#660000",
        },
        monochromic: "#00C9B6",
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
        value={{ usernamee, setUsernamee, rolee, setRolee, theme }}
      >
        <Router>
          <Routes>
            {/* Routes without Sidebar */}
            <Route path="/" element={<NewLogin />} />
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
            <Route
              path="/Settings"
              element={
                <>
                  <Sidebar />
                  <Settings />
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
