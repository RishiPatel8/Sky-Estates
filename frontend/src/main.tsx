import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import App from "./App";
import "./index.css";
import { api } from "./api/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher: (resource) => api.get(resource).then((res) => res.data),
          revalidateOnFocus: false,
        }}
      >
        <App />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);

