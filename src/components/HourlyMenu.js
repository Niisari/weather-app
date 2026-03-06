// HourlyMenu.js
export class HourlyMenu {
  static render(days = []) {
    return `
      <div class="hourly__dropdown" id="hourly-dropdown">
        ${days
          .slice(0, 7)
          .map((day, index) => {
            const dayName =
              index === 0
                ? "Today"
                : new Date(day.datetime).toLocaleDateString("en-US", {
                    weekday: "long",
                  });
            return `
            <button class="hourly__option" type="button" data-index="${index}">
              ${dayName}
            </button>
          `;
          })
          .join("")}
      </div>
    `;
  }
}
