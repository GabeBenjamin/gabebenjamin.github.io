const pxPerSecond = 200;
const minimumTime = 2;
const vibeCountThreshold = 25;
let numVibes = 0;

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
  timeline.fromTo(
    vibeEl,
    { x: randX, y: 0, opacity: 0, scale: 1 },
    {
      y: -1 * randY,
      opacity: 1,
      rotation: randRotate / 2,
      duration: vibeSeconds / 2,
      ease: "power1.out",
      scale: 1.5,
      immediateRender: true,
    }
  );
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
 * Updates the vibe counter based on the number of vibes clicked
 *
 * Shows only if we've reached the vibeCountThreshold
 */
function updateVibeCount() {
  if (numVibes < vibeCountThreshold) {
    return;
  }

  const vibeCounterEl = document.getElementById("vibe-count");
  vibeCounterEl.innerText = `${numVibes} vibes`;

  if (numVibes == vibeCountThreshold) {
    vibeCounterEl.style.display = "block";
    const timeline = window.gsap.timeline();
    timeline.from(vibeCounterEl, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "ease.in",
    });
  }
}

/**
 * Track the vibe click as an event in Google Analytics mostly for fun :)
 */
function trackVibeClick(target) {
  gtag("event", "click", {
    event_category: "Vibe",
    event_label: target.dataset.vibeName,
    value: numVibes,
  });
}

/**
 * Create the associate vibe element and add it to the DOM
 *
 * @param {Element} target
 */
function vibeClicked(target) {
  const vibeSrc = target.dataset.vibeSrc;

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

  // Update vibe count
  numVibes += 1;
  updateVibeCount();

  // Track vibe click
  trackVibeClick(target);
}

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
