// Alias for querySelector
export const el = el => document.querySelector(el);

// Return a random entry from the array
export const randomIndex = arr => arr[Math.round(Math.random() * (arr.length - 1))];

// Declarative debounce using promises
let debounceTimer;
export const debounce = ms => new Promise(resolve => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => resolve(), ms);
});