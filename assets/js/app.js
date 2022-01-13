import SpanButton from "./span-button.js";
import addVibeListeners from "./vibe.js";

// Add custom span-button element
customElements.define("span-button", SpanButton, { extends: "span" });

// Set up vibe handlers
addVibeListeners(document.querySelectorAll("span.vibe-button"));
