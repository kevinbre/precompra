import "./assets/fontawesome/css/fontawesome.min.css";
import "./assets/fontawesome/css/regular.min.css";
import "./assets/fontawesome/css/solid.min.css";
import "./assets/fontawesome/css/light.min.css";
import "./assets/fontawesome/css/all.min.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
        <Toaster richColors />
    </React.StrictMode>,
);
