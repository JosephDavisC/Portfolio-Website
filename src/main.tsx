import { initOutboundTracking, initPageTracking } from "@/lib/track";
import React from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import App from "./App";
import "./index.css";

initOutboundTracking();
initPageTracking();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </React.StrictMode>
);
