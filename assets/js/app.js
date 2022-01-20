import SpanButton from "./span-button.js";
import addVibeListeners from "./vibe.js";

// Add custom span-button element
customElements.define("span-button", SpanButton, { extends: "span" });

// Set up vibe handlers
addVibeListeners(document.querySelectorAll("span.vibe-button"));

// Preload the images on startup so things are ready whenever the user clicks on a vibe
const images = new Array();
const allVibeSources = [
  ...document.querySelectorAll("span[data-vibe-src]"),
].map((el) => el.dataset.vibeSrc);
allVibeSources.forEach((vibeSrc) => {
  const tempImage = new Image();
  tempImage.src = vibeSrc;
  images.push(tempImage);
});
