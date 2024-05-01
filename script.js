//Globale Variablen
    //#region Variablen
    var canvas, ctx; 

    //Maus
    var mouseX = 0; 
    var mouseY = 0; 

    //Images
    var background;

    //Player
    var player;
    var frame=0;
    var playerX = 500;
    var playerY = 500;
    var schrittweite;
    var normalPace = 2;
    //var sprintPace = normalPace*2;  //todo Sprintfunktion und Sneakfunktion werden später eingebaut
    //var sneakPace = normalPace/2; //todo
    //Tastenanschläge speichern
    var keysPressed = {};

//#endregion


function init() {
    //Setup
    canvas = document.getElementById("myCanvas");
    canvas.style.border="red 3px solid";
    ctx = canvas.getContext("2d");

    //Bilder
    background = document.getElementById("imgBackground");

    //player
    player = document.getElementById("ufo");//todo id ufo umbenennen
    playerX -= player.width/2;
    playerY -= player.height/2;

    //Gameloop starten
    setInterval(gameLoop,16); //FPS = 1000/diese Zahl
}

function borderCheck(x,y){
    if((x)>=0 && (x) <= canvas.width-player.width && (y) >=0 && (y) <= canvas.height-player.height){
        return true;
    }
    else{
        return false;
    }
}

function gameLoop() {
    update(); 
    draw();
}

function update() {
    paceChanger();
    updatePlayerPosition();
}

function draw() {
    // Hintergrund
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawWorld();

    drawPlayer();
}

function drawPlayer(){
    var playercenter = player.width / 2;
    frame += 0.2;
    // Berechne die Differenz zwischen der Mausposition und der Spielerposition
    var dx = mouseX - (playerX + player.width / 2);
    var dy = mouseY - (playerY + player.height / 2);
    
    // Berechne den Winkel zwischen der Spielerposition und der Mausposition
    var angle = Math.atan2(dy, dx);
    
    // Winkel in Grad umwandeln
    var playerAngle = angle * (180 / Math.PI);
    
    // Spieler drehen
    ctx.save();
    ctx.translate(playerX + player.width / 2, playerY + player.height / 2);
    ctx.rotate(playerAngle * Math.PI / 180);
    ctx.drawImage(player, -player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore();
}

function drawWorld(){
    ctx.drawImage(background, 0,0);
}

function mouseClicked(ev){
    //Wenn geklickt 
    console.log(mouseX, mouseY);
}

function mouseMoved(ev){
    mouseX = ev.clientX - canvas.offsetLeft; 
    mouseY = ev.clientY - canvas.offsetTop;
}

function paceChanger(ev){ //todo
    /*if(keysPressed['Shift']){
        schrittweite = sprintPace;
    }else if(keysPressed['Alt']){
        schrittweite = sneakPace;
    }else{*/
        schrittweite = normalPace;
    //}
}

function updatePlayerPosition(ev){
    if (keysPressed['s'] && keysPressed['d']) {
        if (borderCheck(playerX + schrittweite, playerY + schrittweite)) {
            playerX += schrittweite / Math.sqrt(2);
            playerY += schrittweite / Math.sqrt(2);
        }
    }
    if (keysPressed['s'] && keysPressed['a']) {
        if (borderCheck(playerX - schrittweite, playerY + schrittweite)) {
            playerX -= schrittweite / Math.sqrt(2);
            playerY += schrittweite / Math.sqrt(2);
        }
    }
    if (keysPressed['w'] && keysPressed['d']) {
        if (borderCheck(playerX + schrittweite, playerY - schrittweite)) {
            playerX += schrittweite / Math.sqrt(2);
            playerY -= schrittweite / Math.sqrt(2);
        }
    }
    if (keysPressed['w'] && keysPressed['a']) {
        if (borderCheck(playerX - schrittweite, playerY - schrittweite)) {
            playerX -= schrittweite / Math.sqrt(2);
            playerY -= schrittweite / Math.sqrt(2);
        }
    }
    if (keysPressed['s'] && !keysPressed['a'] && !keysPressed['d']) {
        if (borderCheck(playerX, playerY + schrittweite)) {
            playerY += schrittweite;
        }
    }
    if (keysPressed['w'] && !keysPressed['a'] && !keysPressed['d']) {
        if (borderCheck(playerX, playerY - schrittweite)) {
            playerY -= schrittweite;
        }
    }
    if (keysPressed['a'] && !keysPressed['w'] && !keysPressed['s']) {
        if (borderCheck(playerX - schrittweite, playerY)) {
            playerX -= schrittweite;
        }
    }
    if (keysPressed['d'] && !keysPressed['w'] && !keysPressed['s']) {
        if (borderCheck(playerX + schrittweite, playerY)) {
            playerX += schrittweite;
        }
    }if (keysPressed['s'] && keysPressed['d']) {
        if (borderCheck(playerX + schrittweite, playerY + schrittweite)) {
            playerX += schrittweite;
            playerY += schrittweite;
        }
    }
    if (keysPressed['s'] && keysPressed['a']) {
        if (borderCheck(playerX - schrittweite, playerY + schrittweite)) {
            playerX -= schrittweite;
            playerY += schrittweite;
        }
    }
    if (keysPressed['w'] && keysPressed['d']) {
        if (borderCheck(playerX + schrittweite, playerY - schrittweite)) {
            playerX += schrittweite;
            playerY -= schrittweite;
        }
    }
    if (keysPressed['w'] && keysPressed['a']) {
        if (borderCheck(playerX - schrittweite, playerY - schrittweite)) {
            playerX -= schrittweite;
            playerY -= schrittweite;
        }
    }
    if (keysPressed['s'] && !keysPressed['a'] && !keysPressed['d']) {
        if (borderCheck(playerX, playerY + schrittweite)) {
            playerY += schrittweite;
        }
    }
    if (keysPressed['w'] && !keysPressed['a'] && !keysPressed['d']) {
        if (borderCheck(playerX, playerY - schrittweite)) {
            playerY -= schrittweite;
        }
    }
    if (keysPressed['a'] && !keysPressed['w'] && !keysPressed['s']) {
        if (borderCheck(playerX - schrittweite, playerY)) {
            playerX -= schrittweite;
        }
    }
    if (keysPressed['d'] && !keysPressed['w'] && !keysPressed['s']) {
        if (borderCheck(playerX + schrittweite, playerY)) {
            playerX += schrittweite;
        }
    }
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true; // Setze die Taste als gedrückt
});
document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key]; // Entferne die Taste aus dem Array, wenn sie losgelassen wird
});
document.addEventListener("mousemove", mouseMoved);
//document.addEventListener("keydown", keyboardPressed);
document.addEventListener("mousedown", mouseClicked);
document.addEventListener("DOMContentLoaded", init, false);