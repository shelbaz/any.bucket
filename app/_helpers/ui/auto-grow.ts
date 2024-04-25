export const autoGrow = (element: HTMLElement, maxHeight = 300, minHeight?: number) => {
    if (!element) return;
  
    element.style.height = "5px";
    const generatedHeight = element.scrollHeight + 2;
  
    if (minHeight) {
      element.style.height = Math.max(minHeight, Math.min(generatedHeight, maxHeight)) + "px";
    } else {
      element.style.height = Math.min(generatedHeight, maxHeight) + "px";
    }
  
    if (generatedHeight > maxHeight) {
      element.classList.remove("no-scrollbar");
    } else if (!element.classList.contains("no-scrollbar")) {
      element.classList.add("no-scrollbar");
    }
  };