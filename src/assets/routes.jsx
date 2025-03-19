import { createBrowserRouter } from "react-router";
import App from "../App";
import DashBoardPage from "../Pages/DashBoardPage";
import TransactionPage from "../Pages/TransactionPage";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <DashBoardPage /> },
      { path: "dashboard", element: <DashBoardPage /> },
      { path: "transactions", element: <TransactionPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
