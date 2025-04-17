import { createBrowserRouter } from "react-router";
import App from "../App";
import DashBoardPage from "../Pages/DashBoardPage";
import TransactionPage from "../Pages/TransactionPage";
import ErrorPage from "../Pages/ErrorPage";
import CategoryPage from "../Pages/CategoryPage";
import ReportPage from "../Pages/ReportPage";
import SettingsPage from "../Pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <DashBoardPage /> },
      { path: "dashboard", element: <DashBoardPage /> },
      { path: "transactions", element: <TransactionPage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "reports", element: <ReportPage /> },
      {path: "settings", element: <SettingsPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
