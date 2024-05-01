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
    var sprintPace = normalPace*2;
    //var sneakPace = normalPace/2; //todo
    //einzelne Tastenanschläge speichern
    var upKey;
    var leftKey;
    var rightKey;
    var downKey;
    var shiftKey;
    //var altKey;

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

    //todo Idee: Waffe auf Maus ausrichten
    //da muss dann die Variable playerAngle angepasst werden, 
    //je nachdem, wie weit die Maus vom Spieler weg ist

    // Spieler drehen
    ctx.save();
    //Neue (0, 0) Position setzen
    ctx.translate(playerX + player.width / 2, playerY + player.height / 2);
    ctx.rotate(playerAngle * Math.PI / 180 );
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
    if(shiftKey){
        schrittweite = sprintPace;
    }
    //todo auskommentiert, da preventDefault und stopPropagation nicht zu funktionieren scheinen, 
    //sneaken mit alt oder Ctrl wird also schwer. Es werden nämlich immer Tastenkombis getriggert
    /*else if(altKey){
        schrittweite = sneakPace;
    }*/else{
        schrittweite = normalPace;
    }
}

//todo Diese Funktion kann man bestimmt auch schöner machen.
//ChatGPT hat mir da schon Sachen vorgeschlagen. 
//Das ist aber optional, momentan funktioniert es nämlich
function updatePlayerPosition(ev){ 
    if (downKey && rightKey) {
        if (borderCheck(playerX + schrittweite / Math.sqrt(2), playerY + schrittweite / Math.sqrt(2))) {
            playerX += schrittweite / Math.sqrt(2);
            playerY += schrittweite / Math.sqrt(2);
        }
    }
    if (downKey && leftKey) {
        if (borderCheck(playerX - schrittweite / Math.sqrt(2), playerY + schrittweite / Math.sqrt(2))) {
            playerX -= schrittweite / Math.sqrt(2);
            playerY += schrittweite / Math.sqrt(2);
        }
    }
    if (upKey && rightKey) {
        if (borderCheck(playerX + schrittweite / Math.sqrt(2), playerY - schrittweite / Math.sqrt(2))) {
            playerX += schrittweite / Math.sqrt(2);
            playerY -= schrittweite / Math.sqrt(2);
        }
    }
    if (upKey && leftKey) {
        if (borderCheck(playerX - schrittweite / Math.sqrt(2), playerY - schrittweite / Math.sqrt(2))) {
            playerX -= schrittweite / Math.sqrt(2);
            playerY -= schrittweite / Math.sqrt(2);
        }
    }
    if (downKey && !leftKey && !rightKey) {
        if (borderCheck(playerX, playerY + schrittweite)) {
            playerY += schrittweite;
        }
    }
    if (upKey && !leftKey && !rightKey) {
        if (borderCheck(playerX, playerY - schrittweite)) {
            playerY -= schrittweite;
        }
    }
    if (leftKey && !upKey && !downKey) {
        if (borderCheck(playerX - schrittweite, playerY)) {
            playerX -= schrittweite;
        }
    }
    if (rightKey && !upKey && !downKey) {
        if (borderCheck(playerX + schrittweite, playerY)) {
            playerX += schrittweite;
        }
    }if (downKey && rightKey) {
        if (borderCheck(playerX + schrittweite, playerY + schrittweite)) {
            playerX += schrittweite;
            playerY += schrittweite;
        }
    }
    if (downKey && leftKey) {
        if (borderCheck(playerX - schrittweite, playerY + schrittweite)) {
            playerX -= schrittweite;
            playerY += schrittweite;
        }
    }
    if (upKey && rightKey) {
        if (borderCheck(playerX + schrittweite, playerY - schrittweite)) {
            playerX += schrittweite;
            playerY -= schrittweite;
        }
    }
    if (upKey && leftKey) {
        if (borderCheck(playerX - schrittweite, playerY - schrittweite)) {
            playerX -= schrittweite;
            playerY -= schrittweite;
        }
    }
    if (downKey && !leftKey && !rightKey) {
        if (borderCheck(playerX, playerY + schrittweite)) {
            playerY += schrittweite;
        }
    }
    if (upKey && !leftKey && !rightKey) {
        if (borderCheck(playerX, playerY - schrittweite)) {
            playerY -= schrittweite;
        }
    }
    if (leftKey && !upKey && !downKey) {
        if (borderCheck(playerX - schrittweite, playerY)) {
            playerX -= schrittweite;
        }
    }
    if (rightKey && !upKey && !downKey) {
        if (borderCheck(playerX + schrittweite, playerY)) {
            playerX += schrittweite;
        }
    }if (!rightKey && !upKey && !downKey && !leftKey) {
        playerX = playerX;
        playerY = playerY;
    }
    console.log(rightKey);
}

document.addEventListener('keydown', (event) => {
    if(event.key ==="w" || event.key=== "ArrowUp" || event.key ==="W"){
        upKey = true;
    }
    else if(event.key ==="a" || event.key=== "ArrowLeft" || event.key ==="A"){
        leftKey = true;
    }
    else if(event.key ==="s" || event.key=== "ArrowDown" || event.key ==="S"){
        downKey = true;
    }
    else if(event.key ==="d" || event.key=== "ArrowRight" || event.key ==="D"){
        rightKey = true;
    }else if(event.key ==="Shift"){
        shiftKey = true;
    }
    //todo auskommentiert, da preventDefault und stopPropagation nicht zu funktionieren scheinen, 
    //sneaken mit alt oder Ctrl wird also schwer. Es werden nämlich immer Tastenkombis getriggert
    /*else if(event.key ==="Alt" || (event.key ==="Alt" && (event.key === "d" || event.key === "D")) || (event.key ==="Alt" && (event.key === "w" || event.key === "W"))){
        event.preventDefault();
        event.stopPropagation();
        altKey = true;
    }*/
});
document.addEventListener('keyup', (event) => {
    if(event.key ==="w" || event.key=== "ArrowUp" || event.key ==="W"){
        upKey = false;
    }
    else if(event.key ==="a" || event.key=== "ArrowLeft" || event.key ==="A"){
        leftKey = false;
    }
    else if(event.key ==="s" || event.key=== "ArrowDown" || event.key ==="S"){
        downKey = false;
    }
    else if(event.key ==="d" || event.key=== "ArrowRight" || event.key ==="D"){
        rightKey = false;
        console.log("keinD");
    }else if(event.key ==="Shift"){
        shiftKey = false;
    }
    //todo auskommentiert, da preventDefault und stopPropagation nicht zu funktionieren scheinen, 
    //sneaken mit alt oder Ctrl wird also schwer. Es werden nämlich immer Tastenkombis getriggert
    /*else if(event.key ==="Alt"){ 
        event.preventDefault();
        event.stopPropagation();
        altKey = false;
    }*/
});
document.addEventListener("mousemove", mouseMoved);
document.addEventListener("mousedown", mouseClicked);
document.addEventListener("DOMContentLoaded", init, false);