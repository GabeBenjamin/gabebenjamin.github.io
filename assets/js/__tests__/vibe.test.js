/**
 * @jest-environment jsdom
 */
import { expect, jest } from "@jest/globals";
import addVibeListeners from "../vibe.js";

describe("When vibeListener is called it", () => {
  beforeEach(() => {
    window.gsap = {
      timeline: () => ({ fromTo: jest.fn(), to: jest.fn(), call: jest.fn() }),
    };

    document.body.innerHTML = `
     <div>
       <span is="span-button" data-vibe-src="/cat.gif" id="cat" class="vibe-button">vibe button</span>
       <div id="vibe-zone"></div>
     </div>
     `;
  });

  test("adds img tag to vibe-zone", () => {
    addVibeListeners(document.querySelectorAll("span.vibe-button"));

    const spanEl = document.getElementById("cat");
    spanEl.click();

    const vibeZone = document.getElementById("vibe-zone");
    const imgElements = vibeZone.getElementsByTagName("img");
    expect(imgElements.length).toBe(1);
  });

  test("adds img tag with src", () => {
    addVibeListeners(document.querySelectorAll("span.vibe-button"));

    const spanEl = document.getElementById("cat");
    spanEl.click();

    const imgEl = document.getElementsByTagName("img")[0];
    expect(imgEl.src).toBe("http://localhost/cat.gif");
  });

  test("adds img tag with class 'vibe'", () => {
    addVibeListeners(document.querySelectorAll("span.vibe-button"));

    const spanEl = document.getElementById("cat");
    spanEl.click();

    const imgEl = document.getElementsByTagName("img")[0];
    expect(imgEl.classList.contains("vibe")).toBeTruthy();
  });

  test("adds img tag with role='presentation'", () => {
    addVibeListeners(document.querySelectorAll("span.vibe-button"));

    const spanEl = document.getElementById("cat");
    spanEl.click();

    const imgEl = document.getElementsByTagName("img")[0];
    expect(imgEl.getAttribute("role")).toBe("presentation");
  });
});
