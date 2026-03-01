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
            <img 
            src="${logo}" 
            alt="logo"/>
          </div>

          <div class="units__container">
            <button class="units__button">
              <img 
              src="${icons.iconUnits}" 
              alt="units icon"
              width="14"
              height="auto"
              class="units__wheel"/>
              <p class="units__text">Units</p>
              <svg 
              width="10" 
              height="auto" 
              fill="none" 
              viewBox="0 0 13 8">
              <path 
              fill="#fff" 
              d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section class="main__section">
        <div class="main__container">

          <div class="search__container">
            <h1 class="search__title">How's the sky looking today?</h1>

            <div class="search__form">
              <input 
              type="text" 
              class="search__input"
              placeholder="Search for a city..."/>
                <img 
                src="${icons.iconSearch}" 
                alt="search icon"
                class="search__icon"
                width="19"
                height="auto"/>
                <button class="search__button">
                  Search
                </button>
            </div>
          </div>

          <div class="info__container">
            <div class="info__card">
              <div class="info__card--top">
                <h2 class="info__card--title">Prague, Czechia</h2>
                <span class="info__card--date">Tuesday, Aug 5, 2025</span>
              </div>
              <div class="info__card--bottom">
                <span class="info__card--icon">
                <img 
                src="${icons.iconSunny}" 
                alt="sunny icon"
                width="120"
                height="auto"/>
                </span>
                <span class="info__card--temp">20°</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
    `;
  }
}
