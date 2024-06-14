import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Customers from "./components/Pages/Customers.jsx";
import Sidebar from "./components/Pages/Sidebar.jsx";
import DashboardMain from "./components/Pages/DasboardMain.jsx";
import Equipment from "./components/Pages/Equipment.jsx";
import Inbox from "./components/Pages/Inbox.jsx";
import Invoice from "./components/Pages/Invoice.jsx";
import Reports from "./components/Pages/Reports.jsx";
import Notfoundd from "../additionalcomponents/Notfoundd.jsx";
// import './index.css';
import { useState, createContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import NewLogin from "./components/Pages/NewLogin.jsx";
import Settings from "./components/Pages/Settings.jsx";
import AuthContextProvider from "./Contexts/AuthContextProvider.jsx";
import UserManagement from "./components/Pages/UserManagement.jsx";
import SideBarWarehouseHandler from "./components/RoleBasedAccess/Warehouse handler/SideBarWarehouseHandler.jsx";
import CustomersWarehouseHandler from "./components/RoleBasedAccess/Warehouse handler/CustomersWarehouseHandler.jsx";
import InvoiceWarehouseHandler from "./components/RoleBasedAccess/Warehouse handler/Invoice/InvoiceWarehouseHandler.jsx";
import EquipmentWarehouseHandler from "./components/RoleBasedAccess/Warehouse handler/EquipmentWarehouseHandler.jsx";
import ReportsBackgroundInvoices from "./components/Reports/ReportsBackgroundInvoices.jsx";
import ReportsBackgroundCustomers from "./components/Reports/ReportsBackgroundCustomers.jsx";
import CashierDashBoard from "./components/RoleBasedAccess/Cashier/CashierDashboard.jsx";
import SidebarCashier from "./components/RoleBasedAccess/Cashier/SidebarCashier.jsx";
import CashierCustomers from "./components/RoleBasedAccess/Cashier/CashierCustomers.jsx";
import Swal from "sweetalert2";

export const AppCustomContext = createContext();

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const token = localStorage.getItem("token");
export default function App() {
  useEffect(() => {
    if (token) {
      try {
        const decoded = parseJwt(token); // Assuming you have jwt_decode imported
        setCurrentUser(decoded.userRole);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const [currentUser, setCurrentUser] = useState("");
  const [usernamee, setUsernamee] = useState("new dummy data");
  const [rolee, setRolee] = useState("new role data");
  const [show, setShow] = useState(false);

  const Buttonstyles = (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100px",
    height: "80px",
    borderRadius: 15,
    opacity: 0.8,
    m: 2,
  });
  const Buttonstyles2 = (theme) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "160px",
    height: "50px",
    color: "white",
    backgroundColor: (theme) => theme.palette.primary,
    border: "solid 1px",
    borderRadius: 5,
    opacity: 0.8,
    m: 2,
  });

  const theme = createTheme({
    typography: {
      fontFamily: [
        "-apple-system-",
        "BlinkMacSystemFont",
        "Roboto",
        "sans-serif",
      ].join(","),
    },
    // Define your theme here
    palette: {
      primary: {
        
        25:"#e5f9fc",
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

        //Blue shades
        // 50: '#e3f2fd',
        // 100: '#bbdefb',
        // 200: '#90caf9',
        // 300: '#64b5f6',
        // 400: '#42a5f5',
        // 500: '#2196f3',
        // 600: '#1e88e5',
        // 700: '#1976d2',
        // 800: '#1565c0',
        // 900: '#0d47a1',

        // purpleShades
        // 25: "#faf0fa",
        // 50: "#f3e5f5",
        // 100: "#e1bee7",
        // 200: "#ce93d8",
        // 300: "#ba68c8",
        // 400: "#ab47bc",
        // 500: "#9c27b0",
        // 600: "#8e24aa",
        // 700: "#7b1fa2",
        // 800: "#6a1b9a",
        // 900: "#4a148c",

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
          10: "#ffe6e6",
          50: "#FFCCCC",
          100: "#FF9999",
          200: "#FF6666",
          300: "#FF3333",
          400: "#FF0000",
          500: "#CC0000",
          600: "#990000",
          700: "#660000",
        },
        warning: {
          10: "#fff5e6",
          50: "#FFEB99",
          100: "#FFD966",
          200: "#FFC133",
          300: "#FFAD00",
          400: "#FF9900",
          500: "#FF8800",
          600: "#FF7700",
          700: "#FF6600",
          800: "#FF5500",
          900: "#FF4400",
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
    components: {
      MuiButton: {
        variants: [
          {
            props: { customvariant: "custom" },
            style: Buttonstyles,
          },
          {
            props: { customvariant2: "custom2" },
            style: Buttonstyles2,
          },
        ],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppCustomContext.Provider
        value={{
          usernamee,
          setUsernamee,
          rolee,
          setRolee,
          theme,
          show,
          setShow,
        }}
      >
        <Router>
          <AuthContextProvider>
            <Routes>
              {/* Routes without Sidebar */}

              <Route path="/" element={<NewLogin />} />
              {/* Other routes with Sidebar */}
              <Route
                path="/customers"
                element={
                  <>
                    <AdminAuth>
                      <Sidebar />
                      <Customers />
                    </AdminAuth>
                  </>
                }
              />
              <Route
                path="/DashboardMain"
                element={
                  <>
                    <AdminAuth>
                      <Sidebar />
                      <DashboardMain />
                    </AdminAuth>
                  </>
                }
              />
              <Route
                path="/Equipment"
                element={
                  <>
                    <AdminAuth>
                      <Sidebar />
                      <Equipment />
                    </AdminAuth>
                  </>
                }
              />
              <Route
                path="/Invoice"
                element={
                  <>
                    <AdminCashierAuth>
                      <Sidebar />
                      <Invoice />
                    </AdminCashierAuth>
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
              <Route
                path="/userManagement"
                element={
                  <>
                    <AdminAuth>
                      <Sidebar />
                      <UserManagement />
                    </AdminAuth>
                  </>
                }
              />
              <Route
                path="/Reports"
                element={
                  <>
                    <AdminAuth>
                      <Sidebar />
                      <Reports />
                    </AdminAuth>
                  </>
                }
              />

              <Route
                path="/Reports-invoices"
                element={
                  <>
                    <AdminAuth>
                      <Sidebar />
                      <ReportsBackgroundInvoices />
                    </AdminAuth>
                  </>
                }
              />
              <Route
                path="/Reports-customers"
                element={
                  <>
                    <AdminAuth>
                      <Sidebar />
                      <ReportsBackgroundCustomers />
                    </AdminAuth>
                  </>
                }
              />

              <Route
                path="/WH-dashboard"
                element={
                  <>
                    <WarehouseHandlerAuth>
                      <SideBarWarehouseHandler />
                      <DashboardMain />
                    </WarehouseHandlerAuth>
                  </>
                }
              />
              <Route
                path="/WH-customers"
                element={
                  <>
                    <WarehouseHandlerAuth>
                      <SideBarWarehouseHandler />
                      <CustomersWarehouseHandler />
                    </WarehouseHandlerAuth>
                  </>
                }
              />

              <Route
                path="/WH-invoice"
                element={
                  <>
                    <WarehouseHandlerAuth>
                      <SideBarWarehouseHandler />
                      <InvoiceWarehouseHandler />
                    </WarehouseHandlerAuth>
                  </>
                }
              />
              <Route
                path="/WH-equipment"
                element={
                  <>
                    <WarehouseHandlerAuth>
                      <SideBarWarehouseHandler />
                      <EquipmentWarehouseHandler />
                    </WarehouseHandlerAuth>
                  </>
                }
              />

              <Route
                path="/C-dashboard"
                element={
                  <>
                    <CashierAuth>
                      <SidebarCashier />
                      <DashboardMain/>
                    </CashierAuth>
                  </>
                }
              />
              <Route
                path="/C-invoice"
                element={
                  <>
                    <CashierAuth>
                      <SidebarCashier />
                      <Invoice />
                    </CashierAuth>
                  </>
                }
              />
              <Route
                path="/C-customer"
                element={
                  <>
                    <CashierAuth>
                      <SidebarCashier />
                      <CashierCustomers />
                    </CashierAuth>
                  </>
                }
              />
              <Route
                path="/C-equipment"
                element={
                  <>
                    <CashierAuth>
                      <SidebarCashier />
                      <Equipment />
                    </CashierAuth>
                  </>
                }
              />
              {/* 404 Route */}
              <Route path="*" element={<Notfoundd />} />
            </Routes>
          </AuthContextProvider>
        </Router>
      </AppCustomContext.Provider>
    </ThemeProvider>
  );
}

export const AdminAuth = ({ children }) => {
  const isAuthenticated = useAuth(["admin"]);
  return isAuthenticated ? children : null;
};
export const CashierAuth = ({ children }) => {
  const isAuthenticated = useAuth(["cashier"]);
  return isAuthenticated ? children : null;
};
export const WarehouseHandlerAuth = ({ children }) => {
  const isAuthenticated = useAuth(["warehouse handler"]);
  return isAuthenticated ? children : null;
};
export const AdminCashierAuth = ({ children }) => {
  const isAuthenticated = useAuth(["admin", "cashier"]);
  return isAuthenticated ? children : null;
};
const useAuth = (allowedRoles) => {
  const [currentUser, setCurrentUser] = useState("");
  const [roleChecked, setRoleChecked] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = parseJwt(token);
        setCurrentUser(decoded.userRole);
      } catch (error) {
        console.error("Error decoding token:", error);
      } finally {
        setRoleChecked(true);
      }
    } else {
      setRoleChecked(true);
    }
  }, [token]);

  useEffect(() => {
    if (roleChecked && !allowedRoles.includes(currentUser)) {
      const timer = Swal.fire({
        title: "Unauthorized",
        html: "Redirecting to login in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timerEl = Swal.getHtmlContainer().querySelector("b");
          const interval = setInterval(() => {
            if (timerEl) {
              timerEl.textContent = Swal.getTimerLeft();
            }
          }, 100);
          return () => clearInterval(interval);
        },
        willClose: () => {
          navigate("/");
        },
      });
    }
  }, [roleChecked, currentUser, navigate, allowedRoles]);

  return roleChecked && allowedRoles.includes(currentUser);
};
