/*neuer Plan:

funktion erstellen die rechtecke erstellt. (SVG)
64 rechtecke erstellen und in zwei arrays packen
die Kästchen mit einer for schleife zeichnen lassen

*/
let Links = [];
let Rechts = [];

function Rechtecke(x,y,breite,hoehe,farbe) {

    let rechteck = {
        x:x,
        y:y,
        hoehe : hoehe,
        breite:breite,
        farbe:farbe,

    };

    return rechteck;
}

var anzahl_rechtecke = 64;
const rechteckBreite = 10;
const rechteckHoehe = 10;

// 64 rechtecke erstellen und in die Arrays packen.

for (let i = 0; i < anzahl_rechtecke; i++) {
    let xPosition = i * (rechteckBreite + 5);
    let xPosition2 = (i-32) * (rechteckBreite+5);
    if (i < anzahl_rechtecke/2) {Links.push(Rechtecke(xPosition,20,rechteckBreite,rechteckHoehe,"blue"));}
    else {Rechts.push(Rechtecke(xPosition2,40,rechteckBreite,rechteckHoehe,"blue"));}
    console.log(xPosition2);
}

console.log("Inhalt von Links:", Links[5]);
console.log("Inhalt von Rechts:", Rechts[5]);
