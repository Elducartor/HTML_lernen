/*neuer Plan:

funktion erstellen die rechtecke erstellt. (SVG)
64 rechtecke erstellen und in zwei arrays packen
die Kästchen mit einer for schleife zeichnen lassen

*/
let rectangles = [];
function drawRectangles(ctx, rects) {
    for (let rect of rects) {
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
        ctx.fillStyle = rect.bitcolor
        ctx.fillText(rect.bit,rect.x +10, rect.y +10);
    }
}

function RechteckWerte(i,widthx,heighty,text){
        let x = i* (widthx + 5);
        let y = heighty;
        if (i >= 32)
        {y = heighty * 2 + 20;
        x = (i-32) *(widthx + 5);
        }
       
        let width = widthx;
        let height = heighty;
        let color = "white";
        let bit = text[i];
        let bitcolor = "black";
        return {x,y,width,height,color,bit,bitcolor};
}

function RechteckeBauen(anzahl,widthx,heighty,text){
    let RechteckArray = [];
    for (let i = 0; i < anzahl;i++)
    { 
        RechteckArray.push(RechteckWerte(i,widthx,heighty,text));
    }
    return RechteckArray;
}

function Zeichnen(widthx,heighty,text){
    text = hexToBin(text);
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    rectangles = RechteckeBauen(64,widthx,heighty,text);
    drawRectangles(ctx,rectangles);
}
    function hexToBin(text){
        if (text.length < 16) {return "zu kurz"}
        if (text.length > 16) {return "zu lang"}
        let Eingabe_bits = "";
        var Hexzahlen = {
            "0": "0000",
            "1": "0001",
            "2": "0010",
            "3": "0011",
            "4": "0100",
            "5": "0101",
            "6": "0110",
            "7": "0111",
            "8": "1000",
            "9": "1001",
            "A": "1010",
            "a": "1010",
            "B": "1011",
            "b": "1011",
            "C": "1100",
            "c": "1100",
            "D": "1101",
            "d": "1101",
            "E": "1110",
            "e": "1110",
            "F": "1111",
            "f": "1111"
        }
    
    for (let i = 0; i < text.length; i++)
    {
      if (text[i] in Hexzahlen){
        Eingabe_bits += Hexzahlen[text[i]]; 
      }
      else { window.alert("Blöd?");}
    }

    return Eingabe_bits;
}
// Eventlistener für Klickereignisse auf dem Canvas hinzufügen
canvas.addEventListener('click', function(event) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    // Mausposition relativ zum Canvas ermitteln
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
    // Überprüfen, ob das geklickte Rechteck getroffen wurde
    for (let rect of rectangles) {
        if (mouseX >= rect.x && mouseX <= (rect.x + rect.width) &&
            mouseY >= rect.y && mouseY <= (rect.y + rect.height)) {
            // Farbe des Rechtecks ändern (z. B. von "white" auf "red")
            rect.color = "red";
            // Canvas neu zeichnen, um die Änderung anzuzeigen
            drawRectangles(ctx, rectangles);
            break; // Schleife beenden, da nur ein Rechteck geändert werden soll
        }
    }
});

async function buttonClicked() {
    let canvas1 = document.getElementById("canvas1");
    let ctx1 = canvas1.getContext("2d");
    let fertig_animiert = [];
    Animationsarray = JSON.parse(JSON.stringify(rectangles));
    for (let i = 0; i < 64; i++) {
        let index = Eingangspermutation[i];
        let a = rectangles[index].x;
        let b = Animationsarray[i].x;
        let c = rectangles[index].y;
        let d = Animationsarray[i].y;
        console.log(rectangles);
        while (a != b || c != d) {
            ctx1.clearRect(rectangles[index].x, rectangles[index].y, rectangles[index].width, rectangles[index].height);
            
            if (a < b) a += 5;
            if (c < d) c += 5;
            if (a > b) a -= 5;
            if (c > d) c -= 5;

            rectangles[index].x = a;
            rectangles[index].y = c;

            ctx1.fillStyle = rectangles[index].color;
            ctx1.fillRect(rectangles[index].x, rectangles[index].y, rectangles[index].width, rectangles[index].height);
            ctx1.fillStyle = rectangles[index].bitcolor;
            ctx1.fillText(rectangles[index].bit, rectangles[index].x + 10, rectangles[index].y + 10);
            await new Promise(resolve => setTimeout(resolve,20));
            
            if ( fertig_animiert.length >= 1)
            {for (let x = 0; x < fertig_animiert.length; x++) {
                ctx1.fillStyle = fertig_animiert[x].color;
                ctx1.fillRect(fertig_animiert[x].x, fertig_animiert[x].y, fertig_animiert[x].width, fertig_animiert[x].height);
                ctx1.fillStyle = fertig_animiert[x].bitcolor;
                ctx1.fillText(fertig_animiert[x].bit, fertig_animiert[x].x + 10, fertig_animiert[x].y + 10);
                }
            }
        }
        fertig_animiert.push(rectangles[index]);
    }
}
       
    

// Kommt nach dem EIngang vor der ersten Runde.
Eingangspermutation = [
    57,49,41,33,25,17,9,1,
    59,51,43,35,27,19,11,3,
    61,53,45,37,29,21,13,5,
    63,55,47,39,31,23,15,7,
    56,48,40,32,24,16,8,0,
    58,50,42,34,26,18,10,2,
    60,52,44,36,28,20,12,4,
    62,54,46,38,30,22,14,6
];

// kommt vor dem Output des DES
Ausgangspermutation = [
    40,8,48,16,56,24,64,32,
    39,7,47,15,55,23,63,31,
    38,6,46,14,54,22,62,30,
    37,5,45,13,53,21,61,29,
    36,4,44,12,52,20,60,28,
    35,3,43,11,51,19,59,27,
    34,2,42,10,50,18,58,26,
    33,1,41,9,49,17,57,25
];
// Expansion von R in der F-Funktion
Expansion = [
    32,1,2,3,4,5,
    4,5,6,7,8,9,
    8,9,10,11,12,13,
    12,13,14,15,16,17,
    16,17,18,19,20,21,
    20,21,22,23,24,25,
    24,25,26,27,28,29,
    28,29,30,31,32,1
];
//s-boxen in der F-funktion
sbox1 = 
[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7,
0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8,
4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0,
15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13];

sbox2 = 
[15,1,8,14,6,11,3,4,9,7,2,13,12,1,5,10,
 3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5,
0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15,
13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9];

sbox3 = 
[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8,
13,7,,0,9,3,4,6,10,2,8,5,14,12,11,15,1,
13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7,
1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12
];

sbox4 = 
[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15,
13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9,
10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4,
3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14
];

sbox5 =
[
2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9,
14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6,
4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14,
11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3];

sbox6 =
[
12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11,
10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8,
9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6,
4,3,1,12,9,5,15,10,11,14,1,70,6,0,8,13
];

sbox7 = 
[
4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1,
13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6,
1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2,
6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,1
];

sbox8 =
[
13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7,
1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2,
7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8,
2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11
];
//für die f-funktion
P_permutation = 
[16,7,20,21,29,12,28,17,
1,15,23,26,5,18,31,10,
2,8,24,14,32,27,3,9,
19,13,30,6,22,11,4,25];

//schlüsselfahrplan
//Rausfiltern der Paritätsbits.
PC_1 = [
57,49,41,33,25,17,9,1,
58,50,42,34,26,18,10,2,
59,51,43,35,27,19,11,3,
60,52,44,36,63,55,47,39,
31,23,15,7,62,54,46,38,
30,22,14,6,61,53,45,37,
29,21,13,5,28,20,12,4
];

PC_2 = [
14,17,11,24,1,5,3,28,
15,6,21,10,23,19,12,4,
26,8,16,7,27,20,13,2,
41,52,31,37,47,55,30,40,
51,45,33,48,44,49,39,56,
34,53,46,42,50,36,29,32
];

