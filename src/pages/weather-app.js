import logo from "../assets/images/logo.svg";
export class WeatherApp {
  constructor(root) {
    this.root = root;
  }

  render() {
    this.root.innerHTML = `
    <main class="main__wrapper">
      
      <header class="header__wrapper">
        <div class="header__container">
          <div class="header__logo">
            <img src="${logo}" alt="logo"/>
            <p>Weather Now</p>
          </div>

          <div class="units__container">
            <button class="units__button">
            </button>
          </div>
        </div>
      </header>
      
    </main>
    `;
  }
}
