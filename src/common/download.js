export const download = (fileName, value) => {
  const element = document.createElement("a");
  element.target = "_blank";
  element.download = fileName;
  element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(value)}`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

