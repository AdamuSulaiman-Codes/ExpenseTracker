import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./assets/routes.jsx";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
