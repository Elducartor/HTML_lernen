/*neuer Plan:

funktion erstellen die rechtecke erstellt. (SVG)
64 rechtecke erstellen und in zwei arrays packen
die Kästchen mit einer for schleife zeichnen lassen

*/
let rectangles = [];
let LundR0 = [];
let L = [];
let R = [];
function drawRectangles(ctx, rects) {
    for (let rect of rects) {
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
        ctx.fillStyle = rect.bitcolor
        ctx.fillText(rect.bit,rect.x +10, rect.y +10);
    }
}

function RechteckWerte(i,widthx,heighty,text,farbe){
        let x = i* (widthx + 5);
        let y = heighty;
        if (i >= 32)
        {y = heighty * 2 + 20;
        x = (i-32) *(widthx + 5);
        }
       
        let width = widthx;
        let height = heighty;
        let color = farbe;
        let bit = text[i];
        let bitcolor = "black";
        return {x,y,width,height,color,bit,bitcolor};
}

function RechteckeBauen(anzahl,widthx,heighty,text,farbe){
    let RechteckArray = [];
    for (let i = 0; i < anzahl;i++)
    { 
        RechteckArray.push(RechteckWerte(i,widthx,heighty,text,farbe));
    }
    return RechteckArray;
}

function Zeichnen(widthx,heighty,text,farbe){
    text = hexToBin(text);
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    rectangles = RechteckeBauen(64,widthx,heighty,text,farbe);
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
            await new Promise(resolve => setTimeout(resolve,1)); // Geschwindigkeit
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
    for (let x = 0; x < fertig_animiert.length;x++)
    {
        if ( x < 32)
        {L.push(fertig_animiert[x].bit);}
        if (x >= 32)
        {R.push(fertig_animiert[x].bit);}
    }
    LundR0.push(L);
    LundR0.push(R);
}

function fBox(Array,key1)
{
    let y = "";
    let SBoxeninhalt="";
    let R_new = "";
    let Sboxen = [];
    for ( let i = 0; i < Expansion.length;i++)
    {
        R_new += Array[Expansion[i]-1];
    }
    let abgleich =  Rundenschlüsselberechnen(key1);

    for ( let x = 0; x < R_new.length;x++)
    {

        if (R_new[x]=== abgleich[x]) {y = "0"} 
        else {y = "1"};
        SBoxeninhalt += y;
        if (SBoxeninhalt.length == 6) {
            Sboxen.push(SBoxeninhalt);
            SBoxeninhalt = "";
        } 
    }
     return Sboxenauslesen(Sboxen);
}

 //für die f-funktion
 var P_permutation = 
 [
 15,  6, 19, 20, 28, 11, 27, 16,  0,
 14, 22, 25,  4, 17, 30,  9,  1,  7,
 23, 13, 31, 26,  2,  8, 18, 12, 29,
 5, 21, 10,  3, 24
 ];

// Kommt nach dem EIngang vor der ersten Runde.
var Eingangspermutation = [
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
var Ausgangspermutation = [
    
    39,  7, 47, 15, 55, 23, 63, 31,
    38,  6, 46, 14,54, 22, 62, 30,
    37,  5, 45, 13, 53, 21, 61, 29,
    36,  4, 44, 12, 52, 20, 60, 28,
    35,  3, 43, 11, 51, 19, 59, 27,
    34,  2, 42, 10, 50, 18, 58, 26,
    33,  1, 41,  9, 49, 17, 57, 25,
    32,  0, 40,  8, 48, 16, 56, 24
    ]
// Expansion von R in der F-Funktion
var Expansion = [
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
var sbox1 = 
[
["14","04","13","01","02","15","11","08","03","10","06","12","05","09","00","07"],
["00","15","07","04","14","02","13","01","10","06","12","11","09","05","03","08"],
["04","01","14","08","13","06","02","11","15","12","09","07","03","10","05","00"],
["15","12","08","02","04","09","01","07","05","11","03","14","10","00","06","13"]
];

var sbox2 = 
[
["15","01","08","14","06","11","03","04","09","07","02","13","12","01","05","10"],
["03","13","04","07","15","02","08","14","12","00","01","10","06","09","11","05"],
["00","14","07","11","10","04","13","01","05","08","12","06","09","03","02","15"],
["13","08","10","01","03","15","04","02","11","06","07","12","00","05","14","09"]
];

var sbox3 = 
[
["10","00","09","14","06","03","15","05","01","13","12","07","11","04","02","08"],
["13","07","00","09","03","04","06","10","02","08","05","14","12","11","15","01"],
["13","06","04","09","08","15","03","00","11","01","02","12","05","10","14","07"],
["01","10","13","00","06","09","08","07","04","15","14","03","11","05","02","12"]
];

var sbox4 = 
[
["07","13","14","03","00","06","09","10","01","02","08","05","11","12","04","15"],
["13","08","11","05","06","15","00","03","04","07","02","12","01","10","14","09"],
["10","06","09","00","12","11","07","13","15","01","03","14","05","02","08","04"],
["03","15","00","06","10","01","13","08","09","04","05","11","12","07","02","14"]
];

var sbox5 =
[
["02","12","04","01","07","10","11","06","08","05","03","15","13","00","14","09"],
["14","11","02","12","04","07","13","01","05","00","15","10","03","09","08","06"],
["04","02","01","11","10","13","07","08","15","09","12","05","06","03","00","14"],
["11","08","12","07","01","14","02","13","06","15","00","09","10","04","05","03"]
];

var sbox6 =
[
["12","01","10","15","09","02","06","08","00","13","03","04","14","07","05","11"],
["10","15","04","02","07","12","09","05","06","01","13","14","00","11","03","08"],
["09","14","15","05","02","08","12","03","07","00","04","10","01","13","11","06"],
["04","03","01","12","09","05","15","10","11","14","01","70","06","00","08","13"]
];

var sbox7 = 
[
["04","11","02","14","15","00","08","13","03","12","09","07","05","10","06","01"],
["13","00","11","07","04","09","01","10","14","03","05","12","02","15","08","06"],
["01","04","11","13","12","03","07","14","10","15","06","08","00","05","09","02"],
["06","11","13","08","01","04","10","07","09","05","00","15","14","02","03","01"]
];

var sbox8 =
[
["13","02","08","04","06","15","11","01","10","09","03","14","05","00","12","07"],
["01","15","13","08","10","03","07","04","12","05","06","11","00","14","09","02"],
["07","11","04","01","09","12","14","02","00","06","10","13","15","03","05","08"],
["02","01","14","07","04","10","08","13","15","12","09","00","03","05","06","11"]
];

function Sboxenauslesen(Array)
{
    let new_Runden_L = "";
    for (let i = 0;i < 8;i++)
        {   
            console.log("folgende Sbox: " + i +1);
            let Sboxindexstart = (Array[i][0]*2 + Array[i][5]*1);
            let Sboxindexbits = Array[i][1] + Array[i][2] + Array[i][3] + Array[i][4];
            let sboxindex = parseInt(Sboxindexbits,2);
            console.log("Sboxenindexstart: " + Sboxindexstart);
            console.log("Sboxenindexbits:" + Sboxindexbits);
            console.log("die 4 Bits ergeben :" + sboxindex);
            if (i == 0)  {new_Runden_L += sbox1[Sboxindexstart][sboxindex];}
            if ( i == 1) {new_Runden_L += sbox2[Sboxindexstart][sboxindex];}
            if ( i == 2) {new_Runden_L += sbox3[Sboxindexstart][sboxindex];}
            if ( i == 3) {new_Runden_L += sbox4[Sboxindexstart][sboxindex];}
            if ( i == 4) {new_Runden_L += sbox5[Sboxindexstart][sboxindex];}
            if ( i == 5) {new_Runden_L += sbox6[Sboxindexstart][sboxindex];}
            if ( i == 6) {new_Runden_L += sbox7[Sboxindexstart][sboxindex];}
            if ( i == 7) {new_Runden_L += sbox8[Sboxindexstart][sboxindex];} 
        }
        
        return DezinBin(new_Runden_L);
}

function DezinBin(String)
{
    let entgültiger_output = "";
    var DezZahlen = 
    {
        "00": "0000",
        "01": "0001",
        "02": "0010",
        "03": "0011",
        "04": "0100",
        "05": "0101",
        "06": "0110",
        "07": "0111",
        "08": "1000",
        "09": "1001",
        "10": "1010",
        "11": "1011",
        "12": "1100",
        "13": "1101",
        "14": "1110",
        "15": "1111"
    };

    for (let i = 0; i < String.length; i += 2)
        {
            if (String[i] + String[i+1] in DezZahlen)
            {
                entgültiger_output += DezZahlen[String[i] + String[i+1]]
            }
        
        }   
    return entgültiger_output;
    }