import "./styles/global.css";
import "./styles/reset.css";

import App from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  new App(root).init();
});
