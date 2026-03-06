import logo from "../assets/images/logo.svg";
import icons from "../assets/images/icons/icons.js";
import { UnitsMenu } from "../components/UnitsMenu.js";
import { HourlyMenu } from "../components/HourlyMenu.js";
import { getWeatherData } from "../api/WeatherApi.js";

export class WeatherApp {
  constructor(root) {
    this.root = root;
    this.weatherData = null;

    // Default units state
    this.units = {
      temp: "celsius",
      wind: "kmh",
      precip: "mm",
      isOpen: false,
    };
  }

  getWeatherIcon(iconId) {
    const iconMap = {
      snow: icons.iconSnow,
      rain: icons.iconRain,
      fog: icons.iconOvercast,
      cloudy: icons.iconOvercast,
      "partly-cloudy-day": icons.iconPartlyCloudy,
      "partly-cloudy-night": icons.iconPartlyCloudy,
      "clear-day": icons.iconSunny,
      "clear-night": icons.iconSunny,
      thunderstorm: icons.iconStorm,
      "showers-day": icons.iconDrizzle,
      "showers-night": icons.iconDrizzle,
    };
    return iconMap[iconId] || icons.iconSunny;
  }

  // --- Formatting Helpers ---
  formatTemp(temp) {
    if (this.units.temp === "fahrenheit")
      return `${Math.round((temp * 9) / 5 + 32)}°`;
    return `${Math.round(temp)}°`;
  }

  formatWind(wind) {
    if (this.units.wind === "mph") return `${(wind * 0.621371).toFixed(1)} mph`;
    return `${wind} km/h`;
  }

  formatPrecip(precip) {
    const amount = precip || 0;
    if (this.units.precip === "in") return `${(amount / 25.4).toFixed(2)} in`;
    return `${amount} mm`;
  }

  async handleSearch() {
    const searchInput = this.root.querySelector(".search__input");
    const city = searchInput.value.trim();
    if (!city) return;

    try {
      const data = await getWeatherData(city);
      this.weatherData = data;
      this.render();
    } catch (error) {
      alert(`Could not find that city: ${error.message}`);
    }
  }

  initEvents() {
    // 1. Search Logic
    const searchBtn = this.root.querySelector(".search__button");
    const searchInput = this.root.querySelector(".search__input");
    searchBtn?.addEventListener("click", () => this.handleSearch());
    searchInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });

    // 2. Units Logic
    const unitsButton = this.root.querySelector("#units-button");
    const unitsDropdown = this.root.querySelector("#units-dropdown");
    const switchBtn = this.root.querySelector(".units__switch-btn");
    const unitRadios = this.root.querySelectorAll(
      '.units__option input[type="radio"]',
    );

    if (unitsButton) {
      unitsButton.onclick = (e) => {
        e.stopPropagation();
        this.units.isOpen = !this.units.isOpen;
        this.render();
      };
    }

    // Individual Radio Button Logic
    unitRadios.forEach((radio) => {
      radio.onchange = (e) => {
        // e.target.name is 'temp', 'wind', or 'precip'
        // e.target.value is the unit (e.g., 'fahrenheit')
        this.units[e.target.name] = e.target.value;
        this.units.isOpen = true; // Keep menu open to see the change
        this.render();
      };
    });

    // Master Switch Logic (All-in-one toggle)
    if (switchBtn) {
      switchBtn.onclick = (e) => {
        e.stopPropagation();
        const isCurrentlyMetric = this.units.temp === "celsius";
        this.units = isCurrentlyMetric
          ? { temp: "fahrenheit", wind: "mph", precip: "in", isOpen: true }
          : { temp: "celsius", wind: "kmh", precip: "mm", isOpen: true };
        this.render();
      };
    }

    // 3. Hourly Dropdown Logic
    const hourlyButton = this.root.querySelector("#hourly-btn");
    const hourlyDropdown = this.root.querySelector("#hourly-dropdown");
    if (hourlyButton) {
      hourlyButton.onclick = (e) => {
        e.stopPropagation();
        hourlyDropdown?.classList.toggle("show");
      };
    }

    // Global click to close units
    document.onclick = (e) => {
      if (
        this.units.isOpen &&
        !unitsButton.contains(e.target) &&
        !unitsDropdown.contains(e.target)
      ) {
        this.units.isOpen = false;
        this.render();
      }
    };
  }

  render() {
    if (!this.weatherData) {
      this.root.innerHTML = this.getInitialHTML();
      this.initEvents();
      return;
    }

    const current = this.weatherData.currentConditions;
    const days = this.weatherData.days;

    this.root.innerHTML = `
    <main class="main__wrapper">
      <header class="header__wrapper">
        <div class="header__container">
          <div class="header__logo"><img src="${logo}" alt="logo"/></div>
          <div class="units__container">
            <button class="units__button" type="button" id="units-button">
              <img src="${icons.iconUnits}" alt="units icon" width="14" class="units__wheel"/>
              <p class="units__text">Units</p>
              <svg width="10" height="auto" fill="none" viewBox="0 0 13 8">
                <path fill="#fff" d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/>
              </svg>
            </button>
            ${UnitsMenu.render(this.units)}
          </div>
        </div>
      </header>

      <section class="main__section">
        <div class="main__container">
          <div class="search__container">
            <h1 class="search__title">How's the sky looking today?</h1>
            <div class="search__form">
              <input type="text" class="search__input" placeholder="Search for a city..." value="${this.weatherData.address || ""}"/>
              <img src="${icons.iconSearch}" alt="search icon" class="search__icon" width="19"/>
              <button class="search__button">Search</button>
            </div>
          </div>

          <div class="main__content--grid">
            <section class="info__container">
              <div class="info__card">
                <div class="info__card--top">
                  <h2 class="info__card--title">${this.weatherData.resolvedAddress}</h2>
                  <span class="info__card--date">${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}</span>
                </div>
                <div class="info__card--bottom">
                  <span class="info__card--icon"><img src="${this.getWeatherIcon(current.icon)}" alt="icon" width="120"/></span>
                  <span class="info__card--temp">${this.formatTemp(current.temp)}</span>
                </div>
              </div>
            </section>

            <section class="forecast__details--grid">
              ${this.renderDetail("Feels Like", this.formatTemp(current.feelslike))}
              ${this.renderDetail("Humidity", `${current.humidity}%`)}
              ${this.renderDetail("Wind", this.formatWind(current.windspeed))}
              ${this.renderDetail("Precipitation", this.formatPrecip(current.precip))}
            </section>

            <section class="daily__forecast--section">
              <h2 class="daily__forecast--title02">Daily Forecast</h2>
              <div class="daily__forecast--grid">
                ${days
                  .slice(0, 7)
                  .map((day) => this.renderDailyCard(day))
                  .join("")}
              </div>
            </section>

            <section class="hourly__forecast--section">
              <div class="hourly__forecast--top">
                <h2 class="hourly__forecast--title">Hourly Forecast</h2>
                <button class="hourly__forecast--btn" type="button" id="hourly-btn">
                  Today
                  <svg width="10" height="auto" fill="none" viewBox="0 0 13 8">
                    <path fill="#fff" d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/>
                  </svg>               
                </button>
                ${HourlyMenu.render()}
              </div>
              <div class="hourly__forecast--flex">
                ${days[0].hours
                  .filter((_, i) => i % 3 === 0)
                  .map((hour) => this.renderHourlyCard(hour))
                  .join("")}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
    `;

    this.initEvents();
  }

  getInitialHTML() {
    return `
      <div class="search__container initial-view" style="margin-top: 150px; text-align: center;">
         <h1 class="search__title">How's the sky looking today?</h1>
         <div class="search__form">
            <input type="text" class="search__input" placeholder="Search for a city..."/>
            <button class="search__button">Search</button>
         </div>
      </div>
    `;
  }

  renderDetail(title, value) {
    return `
      <div class="forecast__details--card">
        <h3 class="forecast__details--title">${title}</h3>
        <span class="forecast__details--text">${value}</span>
      </div>`;
  }

  renderDailyCard(day) {
    const dayName = new Date(day.datetime).toLocaleDateString("en-US", {
      weekday: "short",
    });
    return `
      <div class="daily__forecast--card">
        <h3 class="daily__forecast--title">${dayName}</h3>
        <span class="daily__forecast--icon"><img src="${this.getWeatherIcon(day.icon)}" alt="icon" width="80"/></span>
        <div class="daily__forecast--bottom">
          <span class="daily__forecast--temp">${this.formatTemp(day.tempmax)}</span>
          <span class="daily__forecast--feels">${this.formatTemp(day.tempmin)}</span>
        </div>
      </div>`;
  }

  renderHourlyCard(hour) {
    const time = hour.datetime.split(":").slice(0, 2).join(":");
    return `
      <div class="hourly__forecast--card">
        <div class="hourly__forecast--time">
          <img src="${this.getWeatherIcon(hour.icon)}" alt="icon" width="30"/>
          <span>${time}</span>
        </div>
        <div class="hourly__forecast--temp"><span>${this.formatTemp(hour.temp)}</span></div>
      </div>`;
  }
}
