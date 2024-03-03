var zeichen = ["asd"];
var textElement = document.getElementById("text");

// Überprüfe die Anzahl der Zeichen
if (zeichen.length >= 2) {
  // Färbe den Text rot
  textElement.classList.add("rot");
} else {
  // Färbe den Text grün
  textElement.classList.add("gruen");
}
