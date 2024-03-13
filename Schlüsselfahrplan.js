 let key = "1100101101001110101011001011100100111110100000000001110101010111";
let C = "";
let D = "";
//schlüsselfahrplan
//Rausfiltern der Paritätsbits.
var PC_1 = 
[
56, 48, 40, 32, 24, 16,  8,  0, 57, 49, 41, 33,
25, 17,  9,  1, 58, 50, 42, 34, 26, 18, 10,  2,
59, 51, 43, 35, 62, 54, 46, 38, 30, 22, 14,  6,
61, 53, 45, 37, 29, 21, 13,  5, 60, 52, 44, 36,
28, 20, 12,  4, 27, 19, 11,  3
];

var PC_2 = 
[
13,  16,  10,  23,   0,   4,   2,  27, 14,  5, 20,  9,
22,  18,  11,   3,  25,   7,  15,   6, 26, 19, 12,  1,
40,  51,  30,  36,  46,  54,  29,  39, 50, 44, 32, 47,
43,  48,  38,  55,  33,  52,  45,  41, 49, 35, 28, 31
];
var zweistep = [0,1,8,15];
var einstep = [2,3,4,5,6,7,9,10,11,12,13,14];
let Rundenzähler = 0;
function Schluesselkuerzen(key)
    {  
    let key_new = "";
    for (let i = 0;i < PC_1.length;i++)
    {
        let x = key[PC_1[i]];
        key_new = key_new + x;
    }
    return key_new;
    }

function Rundenschlüssel()
{
    if (Rundenzähler in zweistep)
    {
        let shifted = Schluesselkuerzen(key).slice(2) + Schluesselkuerzen(key).slice(0,2);
        C = shifted.slice(0,28)
        D = shifted.slice(28);
    }
    if (Rundenzähler in einstep)
    {
        let shifted = Schluesselkuerzen(key).slice(1) + Schluesselkuerzen(key).slice(0,1);
        C = shifted.slice(0,28)
        D = shifted.slice(28);
    }
    Rundenzähler++;
}
Rundenschlüssel(key);