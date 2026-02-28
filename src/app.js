export class App {
  constructor(root) {
    this.root = root;
  }

  init() {
    this.root.innerHTML = `<h1>Weather App</h1>`;
  }
}
