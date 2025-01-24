import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {Toaster} from "sonner";
import {BrowserRouter} from "react-router-dom";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster richColors />
        </BrowserRouter>
    </React.StrictMode>,
);
