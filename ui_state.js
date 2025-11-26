// ui_state.js (stub seguro)
// Si no tienes estado UI aún, deja este archivo así.
// Más adelante lo llenamos sin romper imports.

window.UIState = window.UIState || {
  theme: "dark",
  history: [],
  set(key, value){ this[key] = value; },
  get(key){ return this[key]; }
};