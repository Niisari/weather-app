export const errorMessage = () => {
  return `
    <div class="error__container">
      <svg class="error__icon-main" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 18 18">
        <path fill="#ACACB7" d="M9 .531c4.781 0 8.719 3.938 8.719 8.719 0 4.816-3.938 8.719-8.719 8.719A8.717 8.717 0 0 1 .281 9.25C.281 4.469 4.184.531 9 .531Zm4.957 3.762c-2.566-2.566-6.574-2.707-9.316-.563l9.879 9.88c2.144-2.743 2.003-6.75-.563-9.317Zm-9.95 9.95c2.567 2.566 6.575 2.706 9.317.562l-9.879-9.88c-2.144 2.743-2.004 6.75.563 9.317Z"/>
      </svg>
      <h1 class="error__title">Something went wrong</h1>
      <p class="error__text">We couldn't connect to the server (API error). Please try again in a few moments.</p>
      <button type="button" class="error__btn" id="error-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.26l5.67-5.67"/>
        </svg>
        Retry
      </button>
    </div>
  `;
};
