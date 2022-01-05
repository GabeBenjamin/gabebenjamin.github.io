function addSpanEventHandlers() {
  const spanElements = document.querySelectorAll('span[role="button"]');

  spanElements.forEach((spanElement) => {
    spanElement.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
        spanElement.click();
      }
    });
  });
}

export default addSpanEventHandlers;
