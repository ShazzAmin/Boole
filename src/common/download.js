export const download = (fileName, value) => {
  const element = document.createElement("a");
  element.setAttribute("download", fileName);
  element.setAttribute("href", `data:text/plain,charset=utf-8,${encodeURIComponent(value)}`);
  element.click();
}

