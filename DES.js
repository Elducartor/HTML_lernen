/*neuer Plan:

funktion erstellen die rechtecke erstellt. (SVG)
64 rechtecke erstellen und in zwei arrays packen
die Kästchen mit einer for schleife zeichnen lassen

*/
let gesamt = [];
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
const rechteckBreite = 25;
const rechteckHoehe = 25;

// 64 rechtecke erstellen und in die Arrays packen.

for (let i = 0; i < anzahl_rechtecke; i++) {
    let xPosition = i * (rechteckBreite + 5);
    let xPosition2 = (i-32) * (rechteckBreite+5);
    if (i < anzahl_rechtecke/2) {gesamt.push(Rechtecke(xPosition,20,rechteckBreite,rechteckHoehe,"blue"));}
    else {gesamt.push(Rechtecke(xPosition2,60,rechteckBreite,rechteckHoehe,"blue"));}
}

function aufspalten(){
for (let i = 0;i < gesamt.length;i++) {
    if (i < gesamt.length/2) { Links.push(gesamt[i]);} else {Rechts.push(gesamt[i]);}
}
}
var binArray = [];
function Eingabe_zu_bin(hex)
{
    for(let i = 0; i < hex.length;i++){
    let binary = parseInt(hex[i], 16).toString(2);
        // Fehlende Nullen voranstellen, um 4 Bits zu erhalten
        while (binary.length < 4) {
            binary = "0" + binary;
        }
        // Jedes Bit separat zum Array hinzufügen
        for (let j = 0; j < binary.length; j++) {
            binArray.push(parseInt(binary[j]));
        }
    
    }
}
