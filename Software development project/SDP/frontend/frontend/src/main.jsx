import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack"; // Import SnackbarProvider
import ContextProvider from "./Contexts/PopupContextProvider.jsx";
import InvoiceContextProvider from "./Contexts/InvoiceContextProvider.jsx";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Admin from "./components/Dashboards/Admin.jsx";
// import Notfoundd from "../additionalcomponents/Notfoundd.jsx";
// import Profiles from "../additionalcomponents/Profiles.jsx";

// import Customers from './components/Pages/Customers.jsx'
// import Sidebar from './components/Pages/Sidebar.jsx'
// import DashboardMain from './components/Pages/DasboardMain.jsx'
// import Equipment from './components/Pages/Equipment.jsx'
// import Inbox from './components/Pages/Inbox.jsx'
// import Invoice from './components/Pages/Invoice.jsx'
// import Reports from './components/Pages/Reports.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Notfoundd />,
//   },
//   {
//     path: "/Admin",
//     element: <Admin />,
//   },
//   {
//     path: "/profiles",
//     element: <Profiles />,
//   },
//   {
//     path: "profiles/:profileId",
//     element: <Profiles/>
//   },

//   {
//     path: "/customers",
//     element: <Customers />,
//   },
//   {
//     path: "/Sidebar",
//     element: <Sidebar />,
//   },
//   {
//     path: "/DashboardMain",
//     element: <DashboardMain />,
//   },
//   {
//     path: "/Equipment",
//     element: <Equipment />,
//   },
//   {
//     path: "/Inbox",
//     element: <Inbox/>
//   },
//   {
//     path: "/Invoice",
//     element: <Invoice />,
//   },
//   {
//     path: "/Reports",
//     element: <Reports/>
//   }
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <InvoiceContextProvider>
      <SnackbarProvider maxSnack={3}>
        {/* <RouterProvider router={router} /> */}
        <App />
      </SnackbarProvider>
      </InvoiceContextProvider>
    </ContextProvider>
  </React.StrictMode>
);
