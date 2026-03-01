import logo from "../assets/images/logo.svg";
import icons from "../assets/images/icons/icons.js";
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
              <img src="${icons.iconUnits}" alt="units icon"/>
              <p class="units__text">Units</p>
              <img src="${icons.iconDropdown}" alt="dropdown icon"/>
            </button>
          </div>
        </div>
      </header>

    </main>
    `;
  }
}
