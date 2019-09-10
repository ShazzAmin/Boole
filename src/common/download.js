export const download = (fileName, value) => {
  const data = new Blob([value], { type: 'text/plain;charset=utf-8;' });
  if(navigator.msSaveBlob){ // Edge
    navigator.msSaveBlob(data, fileName);
  }
  else{
    const element = document.createElement("a");
    element.target = "_blank";
    element.download = fileName;
    element.href = URL.createObjectURL(data);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

