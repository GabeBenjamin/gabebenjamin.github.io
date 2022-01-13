/** A span element that acts like a button */
class SpanButton extends HTMLSpanElement {
  constructor() {
    super();

    // Add the ability to "click" the SpanButton with the keyboard like a button
    this.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
        this.click();
      }
    });
  }

  connectedCallback() {
    // Add attributes to make the span act more like a button
    this.setAttribute("role", "button");
    this.setAttribute("aria-pressed", "false");
    this.setAttribute("tabindex", "0");
  }
}

export default SpanButton;
