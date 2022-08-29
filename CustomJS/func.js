function fetchJSON(filePath) {
    var xmlFile = new XMLHttpRequest();
    xmlFile.open("get", filePath, false);
    xmlFile.send();
    var xmlDoc = xmlFile.responseText;
    const data = JSON.parse(xmlDoc);
  
    return data;
  }