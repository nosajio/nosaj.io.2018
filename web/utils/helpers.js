// Alias for querySelector
export const el = el => document.querySelector(el);

// Return a random entry from the array
export const randomIndex = arr => arr[Math.round(Math.random() * (arr.length - 1))];