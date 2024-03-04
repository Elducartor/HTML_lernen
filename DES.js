function kästchen() {
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "1200");
svg.setAttribute("height", "2000");

var anzahl = 63;
var breite = 30;
var höhe = 20;
var startX = 250;
var startY = 50
var abstandX = 1;

for (var i = 0; i < anzahl; i++) {
    var x = startX + i * (breite + abstandX);
    var y = startY;
    if (i >= 16) {y = 90;x = startX + (i-16)*(breite + abstandX)};
    if (i >= 32) {y = 130;x = startX + (i-32)*(breite + abstandX)};
    if (i >= 48) {y = 170;x = startX + (i-48)*(breite + abstandX)};
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y",y);
  rect.setAttribute("width", breite);
  rect.setAttribute("height", höhe);
  rect.setAttribute("fill", "lightblue");
  svg.appendChild(rect);

  var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x + breite / 2);
  text.setAttribute("y", y+ höhe / 2);
  text.setAttribute("font-family", "Arial");
  text.setAttribute("font-size", "24");
  text.setAttribute("fill", "black");
  text.setAttribute("text-anchor", "middle");
  text.textContent = (i + 1);
  svg.appendChild(text);
}

document.body.appendChild(svg);
}
