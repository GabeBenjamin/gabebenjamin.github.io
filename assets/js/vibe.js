const vibeMap = {
  team: "/assets/vibes/power-rangers.gif",
  codebase: "/assets/vibes/typing-cat.gif",
  challenges: "/assets/vibes/thinking-spiderman.gif",
  cook: "/assets/vibes/salt-bae.gif",
  bake: "/assets/vibes/baking-pusheen.gif",
  "video-games": "/assets/vibes/dancing-mario-bros.gif",
  cat: "/assets/vibes/vibing-cat.gif",
};

const pxPerSecond = 200;
const minimumTime = 2;

/**
 * Animate the vibe element using GreenSock
 *
 * @param {Element} vibeEl
 */
function animateVibe(vibeEl) {
  const maxHeight = window.innerHeight - vibeEl.offsetHeight;
  const maxWidth = window.innerWidth - vibeEl.offsetWidth;
  const randX = Math.random() * maxWidth;
  // Always ensure the vibe will go in the top 2/3rds of the screen
  const randY = Math.random() * (maxHeight * 0.66) + maxHeight * 0.33;
  const randRotate = Math.random() * 180 - 90;
  const vibeSeconds = Math.min(minimumTime, randY / pxPerSecond);

  const timeline = window.gsap.timeline();

  // Animate the vibe to randomly get thrown up and fall down
  timeline.to(vibeEl, {
    y: -1 * randY,
    opacity: 1,
    rotation: randRotate / 2,
    duration: vibeSeconds / 2,
    ease: "power1.out",
    scale: 1.5,
    startAt: { x: randX, y: 0, opacity: 0, scale: 1 },
  });
  timeline.to(vibeEl, {
    y: 0,
    opacity: 0,
    rotation: randRotate,
    duration: vibeSeconds / 2,
    ease: "power1.in",
    scale: 1,
  });

  // Remove the element after animation
  timeline.call(() => vibeEl.remove());
}

/**
 * Create the associate vibe element and add it to the DOM
 *
 * @param {Element} target
 */
function vibeClicked(target) {
  const vibeSrc = vibeMap[target.id];

  if (!vibeSrc) {
    return;
  }

  const vibeZone = document.getElementById("vibe-zone");

  // Create a img element for the vibe
  const gifEl = document.createElement("img");
  gifEl.src = vibeSrc;
  gifEl.classList.add("vibe");
  gifEl.setAttribute("role", "presentation");

  // Add the vibe element to the vibe zone
  vibeZone.appendChild(gifEl);

  // Animate the vibe
  animateVibe(gifEl);
}

/**
 * Preload the images on startup so things are ready whenever the user clicks on a vibe
 */
const images = new Array();
function preloadVibeImages() {
  let i = 0;
  Object.values(vibeMap).forEach((vibeSrc) => {
    const tempImage = new Image();
    tempImage.src = vibeSrc;
    images.push(tempImage);
  });
}
preloadVibeImages();

/**
 * Adds vibe functionality on click to the passed in elements
 *
 * @param {NodeList} elements
 */
function addVibeListeners(elements) {
  elements.forEach((vibeEl) => {
    vibeEl.addEventListener("click", () => vibeClicked(vibeEl));
  });
}

export default addVibeListeners;
