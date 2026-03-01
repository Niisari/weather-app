import { WeatherApp } from "./pages/weather-app.js";

export class App {
  constructor(root) {
    this.root = root;
  }

  init() {
    new WeatherApp(this.root).init();
  }
}
