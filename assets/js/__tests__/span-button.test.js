/**
 * @jest-environment jsdom
 */
import addSpanEventHandlers from "../span-button";

describe("addSpanEventHandlers", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div>
      <span id="span" role="button">span button<span>
    </div>
    `;
  });

  test("makes span button click on enter key", () => {
    const stub = jest.fn();
    const spanEl = document.getElementById("span");
    spanEl.onclick = stub;
    const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });

    addSpanEventHandlers();
    spanEl.dispatchEvent(enterKeyEvent);

    expect(stub).toBeCalled();
  });

  test("makes span button click on spacebar key", () => {
    const stub = jest.fn();
    const spanEl = document.getElementById("span");
    spanEl.onclick = stub;
    const spaceBarKeyEvent = new KeyboardEvent("keydown", { key: "Spacebar" });

    addSpanEventHandlers();
    spanEl.dispatchEvent(spaceBarKeyEvent);

    expect(stub).toBeCalled();
  });

  test("makes span button click on space key", () => {
    const stub = jest.fn();
    const spanEl = document.getElementById("span");
    spanEl.onclick = stub;
    const spaceKeyEvent = new KeyboardEvent("keydown", { key: " " });

    addSpanEventHandlers();
    spanEl.dispatchEvent(spaceKeyEvent);

    expect(stub).toBeCalled();
  });
});
