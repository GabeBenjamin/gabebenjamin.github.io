/**
 * @jest-environment jsdom
 */
import SpanButton from "../span-button";

describe("addSpanEventHandlers", () => {
  beforeAll(() => {
    customElements.define("span-button", SpanButton, { extends: "span" });
  });

  beforeEach(() => {
    document.body.innerHTML = `
    <div>
      <span is="span-button" id="span">span button<span>
    </div>
    `;
  });

  test("enter keypress triggers span-button onClick handler", () => {
    const stub = jest.fn();
    const spanEl = document.querySelector('span[is="span-button"]');
    spanEl.onclick = stub;

    const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
    spanEl.dispatchEvent(enterKeyEvent);

    expect(stub).toBeCalled();
  });

  test("spacebar keypress triggers span-button onClick handler", () => {
    const stub = jest.fn();
    const spanEl = document.getElementById("span");
    spanEl.onclick = stub;

    const spaceBarKeyEvent = new KeyboardEvent("keydown", { key: "Spacebar" });
    spanEl.dispatchEvent(spaceBarKeyEvent);

    expect(stub).toBeCalled();
  });

  test("space key triggers span-button onClick handler", () => {
    const stub = jest.fn();
    const spanEl = document.getElementById("span");
    spanEl.onclick = stub;

    const spaceKeyEvent = new KeyboardEvent("keydown", { key: " " });
    spanEl.dispatchEvent(spaceKeyEvent);

    expect(stub).toBeCalled();
  });
});
