export class UnitsMenu {
  static render(units) {
    const checkIcon = `
      <svg class="units__checkmark" width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4.5 8.5L11 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

    // Determine the master switch button text
    const isMetric =
      units.temp === "celsius" && units.wind === "kmh" && units.precip === "mm";
    const switchText = isMetric ? "Switch to Imperial" : "Switch to Metric";

    return `
      <div class="units__dropdown ${units.isOpen ? "show" : ""}" id="units-dropdown">
        <button class="units__switch-btn" type="button">${switchText}</button>
        
        <div class="units__group">
          <p class="units__label">Temperature</p>
          <label class="units__option">
            <span>Celsius (°C)</span>
            <input type="radio" name="temp" value="celsius" ${units.temp === "celsius" ? "checked" : ""}>
            ${checkIcon}
          </label>
          <label class="units__option">
            <span>Fahrenheit (°F)</span>
            <input type="radio" name="temp" value="fahrenheit" ${units.temp === "fahrenheit" ? "checked" : ""}>
            ${checkIcon}
          </label>
        </div>

        <div class="units__group">
          <p class="units__label">Wind Speed</p>
          <label class="units__option">
            <span>km/h</span>
            <input type="radio" name="wind" value="kmh" ${units.wind === "kmh" ? "checked" : ""}>
            ${checkIcon}
          </label>
          <label class="units__option">
            <span>mph</span>
            <input type="radio" name="wind" value="mph" ${units.wind === "mph" ? "checked" : ""}>
            ${checkIcon}
          </label>
        </div>

        <div class="units__group">
          <p class="units__label">Precipitation</p>
          <label class="units__option">
            <span>Millimeters (mm)</span>
            <input type="radio" name="precip" value="mm" ${units.precip === "mm" ? "checked" : ""}>
            ${checkIcon}
          </label>
          <label class="units__option">
            <span>Inches (in)</span>
            <input type="radio" name="precip" value="in" ${units.precip === "in" ? "checked" : ""}>
            ${checkIcon}
          </label>
        </div>
      </div>
    `;
  }
}
