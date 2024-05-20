//kommende Features
//doneT Laufanimation
    //Quelle Bilder für Spritesheet: https://opengameart.org/content/animated-top-down-survivor-player
//doneT Waffe wechseln
//todo Nahkampfangriff
//todoS Schießen
    //anderen Waffen Start deffinieren
    //shotgun drei Projektile pro Schuss (ggf. mit begrenzter Reichweite)
        //Schaden des einzelnen Projektils ist nur bei 50%
    //Unterschiedliche Delay zwischen den Schüssen in Abhängigkeit der Waffen
    //unterschiedliche Schussgeschwindigkeit 
        //Shotgun schnell aber nicht so weit 
        //handgun langsam
        //rifle deutlich schneller als handgun 
    //auch Reload
    //aber unendlich Munition in Reserve
//todo Berechnung Winkel verstehen (also die Mathematik dahinter)
//todoS map
    //mehrere Level
    //evtl. Level automatisch generieren (Rougelike)
    //collision Detection 
//todoT Gegner (mit Health Bar)
    //evtl. Bildquelle: https://opengameart.org/content/animated-top-down-zombie
    //hit detection mit modulo? Torben fragen
    //evtl. line of sight etablieren, damit die Gegner nur auf einen zulaufen, wenn sie einen sehen
        //wenn sie einen nicht sehen, dann random bewegen
        // wenn sie gegen eine Wand laufen, etwas andere Richtung ausprobieren, weil die sonst festhängen
//todoT Inventar
    //man sieht in einer Anzeige unten konstant alle Waffen und kann mit dem Mausrad durchscrollen
        //Quelle Waffensymbole: https://vladpenn.itch.io/weapon
    //oder mit den Zahlen durch die Waffen wechseln
//todoT Health Bar (bspw. oben links)
    //mit Logik, Spieler soll Schaden bekommen können
//todo Audio
//todo Einstellungsmöglichkeiten
    //Musik switch
    //Soundeffekte switch
    //evtl. Schwierigkeitsgrad
//todoS irgendwann Startbildschirm
//todo Highscore
    //Punktesystem, bspw. ein Zombie gibt 10 Punkte
    // sollen wir ganz einfach in Cookies abspeicher können -> Name sollte nicht highsocre sein, sondern auf das Speil bezogen
    // Cookies sollen wohl nur eine Zeile Code sein in JS 
//todo evtl. Mauern bauen/Eingänge temporär verschließen (CoD Zombies)
    //Coin System, um die Coins ausgeben zu können
//todo falls noch Zeit da ist:
    //Waffe genau auf die Maus ausrichten (abhängig von der Entfernung der Maus zum Player)
    //Größe automatisch an die Fenstergröße anpassen
    //Nachladen mit Spritesheets animieren
//Bug: 
    //Diagonal läuft man schneller
//todo Credits (u.a. Bilder vom Player)

//Globale Variablen
    //#region Variablen
    var canvas, ctx; 
    var backgroundCanvas, backgroundCtx;

    let gameStarted = false; 
    //Maus
    var mouseX = 0; 
    var mouseY = 0; 

    //Images
    var background;
    var imgWall;

    //Hitbox 
    var hitboxPlayer = {
        width: 80,
        height: 80,
        calibrationX: 40,
        calibrationY: 15
    }
    var hitboxEnemy = {
        width: 80,
        height: 80,
        calibrationX: 0,
        calibrationY: 0
    }

    //Waffen 
    var reloadHandgun; 
    var reloadRifle;
    var reloadShotgun;

    var handgun = {
        shotspeed: 20, 
        initWeaponOffset: {
            x: 40, 
            y: 28
        },
        hitboxShot: {
            width: 3,
            height: 3,
            calibrationX: 0,
            calibrationY: 0
        },
        damage: 20, 
        numberOfShots: 10,
        tempNumberofShots: 10,
        delayPerShot: 0.2, 
        tempDelayPerShot: 0,
        reloadAnimation: {
            reloadSprite: null,
            currentFrame: 0,
            totalFrames: 5,
            frameDuration: 100,
            lastFrameTime: Date.now(),
            isPlaying: false,
            offSetX: -15,
            offSetY: +4,
        },
    } 
    var shotgun = {
        shotspeed: 20, 
        initWeaponOffset: {
            x: 65, 
            y: 24
        },
        hitboxShot: {
            width: 3,
            height: 3,
            calibrationX: 0,
            calibrationY: 0
        },
        damage: 17,
        numberOfShots: 5,
        tempNumberofShots: 5,
        delayPerShot: 0.5, 
        tempDelayPerShot: 1,
        reloadAnimation: {
            reloadSprite: null,
            currentFrame: 0,
            totalFrames: 5,
            frameDuration: 200,
            lastFrameTime: Date.now(),
            isPlaying: false,
            offSetX: -1,
            offSetY: +2,
        },
    }
    var rifle = {
        shotspeed: 20, 
        initWeaponOffset: {
            x: 65, 
            y: 24
        },
        hitboxShot: {
            width: 3,
            height: 3,
            calibrationX: 0,
            calibrationY: 0
        },
        damage: 30,
        numberOfShots: 20,
        tempNumberofShots: 20,
        delayPerShot: 0,
        tempDelayPerShot: 0, 
        reloadAnimation: {
            reloadSprite: null,
            currentFrame: 0,
            totalFrames: 5,
            frameDuration: 150,
            lastFrameTime: Date.now(),
            isPlaying: false,
            offSetX: -1,
            offSetY: +2,
        },
    }

    var knife= {
        damage: 100,
        range: 100,
        numberOfShots: "∞",
        tempNumberofShots: "∞",
    }

    //Player
    var player;
    var feet;
    var frame=0;
    var playerX = 650;
    var playerY = 300;
    var feetX = playerX;
    var feetY = playerY;
    var schrittweite;
    var normalPace = 3;
    var sprintPace = normalPace*2;
    var playerAngle;

    //Messer
    var meleeAttackSheet;
    var meleeAttackAnimation = {
        currentFrame: 0,
        totalFrames: 3, // Assuming the sprite sheet has 5 frames
        frameDuration: 100, // Duration of each frame in milliseconds
        lastFrameTime: Date.now(), // Timestamp of the last frame update
        isPlaying: false // Indicates if the animation is currently playing
    };

    //Gegner
    var enemySpeed = 2;
    var activeEnemys = [];
    var zombieWalk;
    var zombieAttack;

    //einzelne Tastenanschläge speichern
    var upKey;
    var leftKey;
    var rightKey;
    var downKey;
    var shiftKey;

    //Ausrichtung zwischen Maus und Spieler
    var dx; 
    var dy; 
    var angle; 

    //Schuss
    activeShots = [];
    var shotRadius = handgun.hitboxShot.width; 
    var weaponOffsetX;
    var weaponOffsetY; 

    //Inventar
    var inventory = {
        handgun: {
            isOwned: true,
            isEquipped: true
        },
        rifle: {
            isOwned: true,
            isEquipped: false
        },
        shotgun: {
            isOwned: true,
            isEquipped: false
        },
        knife: {
            isOwned: true,
            isEquipped: false
        },
        currentWeapon: handgun,
        health: 100,
        maxHealth: 100
    }
    var scrollDown;
    var scrollUp;

    var invHandgun, invRifle, invShotgun, invKnife;

    var invDrawing = {
        startingPointX: 50,
        startingPointY: 750,
        imageWidth: 152,
        imageHeight: 77,
    }

    //map 
    const tileW = 50; 
    const tileH = 50; 

    const gridRows = 15; 
    const gridCols = 28;

    var activeWalls = []; 

    var initalMap = [
        [0,0,'x',0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0,'x',0,,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ['x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0],
        [0,0,'x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]; 

    var map = [];

    var mapTeile = [
        [
            [1,1],
            [0,1]
        ],
        [
            [1,0],
            [1,1]
        ],
        [
            [0,1],
            [1,1]
        ],
        [
            [0,1,0],
            [1,1,1]
        ],
        [
            [1,1,1]
        ],
        [
            [1,1,1],
            [1],
        ],
        [
            [1],
            [1],
            [1]
        ],
        [
            [1,1],
            [1],
            [1]
        ],
        [
            [1,1],
            [1],
            [1]
        ],
        [
            [1,1,1],
            [1],
            [1]
        ],
        [
            [1,1],
            [0,1,1],
            [0,0,1,1]
        ],
    ]

//#endregion

function init() {
    //Setup
    canvas = document.getElementById("myCanvas");
    canvas.style.border="red 3px solid";
    ctx = canvas.getContext("2d");

    backgroundCanvas = document.getElementById("backgroundCanvas");
    backgroundCanvas.style.border="green 3px solid";
    backgroundCtx = backgroundCanvas.getContext("2d");

    //Bilder
    background = document.getElementById("imgBackground");
    imgWall = document.getElementById("imgWall");

    //player
    player = document.getElementById("handgun");
    //playerX -= player.width/2;
    //playerY -= player.height/2;

    feet = document.getElementById("feet");

    zombieWalk = document.getElementById("zombieWalk");
    zombieAttack = document.getElementById("zombieAttack");

    meleeAttackSheet = document.getElementById("meleeAttack");

    invHandgun = document.getElementById("invHandgun");
    invRifle = document.getElementById("invRifle");
    invShotgun = document.getElementById("invShotgun");
    invKnife = document.getElementById("invKnife");

    reloadHandgun = document.getElementById("reloadHandgun");
    handgun.reloadAnimation.reloadSprite = reloadHandgun;

    reloadRifle = document.getElementById("reloadRifle");
    rifle.reloadAnimation.reloadSprite = reloadRifle;

    reloadShotgun = document.getElementById("reloadShotgun");
    shotgun.reloadAnimation.reloadSprite = reloadShotgun;

    gameStarted = true;

    //generateMapTeile(12);

    generateMap();

    //Gameloop starten
    setInterval(gameLoop,16); //FPS = 1000/diese Zahl
}

// ist noch nicht ausgereift 
// wenn man das noch irgendwie implementiert bekommt wäre das super
// function generateMapTeile(count) {

//     for (let i = 0; i < count; i++) {
//         const rows = Math.floor(Math.random() * 3) + 1; // Zufällige Anzahl von Zeilen (1 bis 3)
//         const cols = Math.floor(Math.random() * 4) + 1; // Zufällige Anzahl von Spalten (1 bis 4)

//         const teil = [];
//         let hasOne = false;

//         for (let r = 0; r < rows; r++) {
//             const row = [];
//             for (let c = 0; c < cols; c++) {
//                 const value = Math.floor(Math.random() * 2);
//                 if (value === 1) hasOne = true;
//                 row.push(value);
//             }
//             teil.push(row);
//         }

//         // Wenn das Teil keine 1 hat, eine zufällige Position auf 1 setzen
//         if (!hasOne) {
//             const randomRow = Math.floor(Math.random() * rows);
//             const randomCol = Math.floor(Math.random() * cols);
//             teil[randomRow][randomCol] = 1;
//         }

//         mapTeile.push(teil);
//     }
// }

function generateMap(){

    for(let eachRow = 0; eachRow < gridRows; eachRow++) {
        for(let eachCol = 0; eachCol < gridCols; eachCol++){
            if(initalMap[eachRow][eachCol] === 'x'){
                const randomIndexForMapTeile = Math.floor(Math.random() * mapTeile.length);

                let mapTeil = mapTeile[randomIndexForMapTeile];

                if (mapTeil) {
                    for(let eachRowMapTeil = 0; eachRowMapTeil < mapTeil.length; eachRowMapTeil++) {
                        for(let eachColMapTeil = 0; eachColMapTeil < mapTeil[eachRowMapTeil].length; eachColMapTeil++){
                            if(initalMap[eachRow + eachRowMapTeil] !== undefined && initalMap[eachRow + eachRowMapTeil][eachCol + eachColMapTeil] !== undefined) {
                                initalMap[eachRow + eachRowMapTeil][eachCol + eachColMapTeil] = mapTeil[eachRowMapTeil][eachColMapTeil];
                            }
                            
                        }
                    }
                }else{
                    initalMap[eachRow][eachCol] = 0; 
                }
                
            }
        }
    }

    map = initalMap; 
}

function borderCheck(x, y, hitbox){
    let isNotCollision = true; 

    x += hitbox.calibrationX;
    y += hitbox.calibrationY;
    if((x)>=0 && (x) <= canvas.width-hitbox.width && (y) >=0 && (y) <= canvas.height-hitbox.height){
        isNotCollision = true;
    }
    else{
        isNotCollision = false;
    }

    const objectLeft = x;
    const objectRight = x + hitbox.width; 
    const objectTop = y; 
    const objectBottom = y + hitbox.height; 

    if(isNotCollision){
        for(let i = 0; i < activeWalls.length; i++){
            const currentWall = activeWalls[i]; 
    
            const wallLeft = currentWall.x; 
            const wallRight = currentWall.x + tileW; 
            const wallTop = currentWall.y; 
            const wallBottom = currentWall.y + tileH; 
    
            if(objectRight > wallLeft && objectLeft < wallRight && objectBottom > wallTop && objectTop < wallBottom){
                isNotCollision = false;
                break;
            }else{
                isNotCollision = true;  
            }
        }
    }
    
    
    return isNotCollision; 
}

function gameLoop() {
    update(); 
    draw();
}

function update() {
    paceChanger();
    updatePlayerPosition();
    updateReloadAnimation();
    updateMeleeAttackAnimation();
    updateEnemyAttackCooldown();
    updateEnemyAttackAnimation();
    attackPlayer();
    checkPlayerHealth();
}

function draw() {
    // Hintergrund
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawWorld();
    drawMap();

    drawBackground();

    drawPlayer();

    enemyHit();

    drawEnemy();

    drawShots();
}

function drawMap(){
    for(let eachRow = 0; eachRow < gridRows; eachRow++) {
        for(let eachCol = 0; eachCol < gridCols; eachCol++){
            if(map[eachRow][eachCol] === 1) {
                var wall = {
                    x: tileW*eachCol,
                    y: tileH*eachRow, 
                };
                activeWalls.push(wall);
                //todo muss noch weggemacht werden, wenn wir es nicht mehr brauchen
                // ctx.fillStyle = "black";
                // ctx.fillRect(wall.x, wall.y, tileW, tileH);
                ctx.drawImage(imgWall, wall.x,wall.y);
            }
        }
    }
}

function drawBackground(){
    //healthbar
    //aktuelle HP berechnen
    var playerHealthPercentage = (inventory.health/inventory.maxHealth) * 500;
    //Hintergrund der Health Bar
    backgroundCtx.fillStyle = 'red';
    backgroundCtx.fillRect(0, 20, 500, 50);

    //gefüllter Teil der Health Bar
    backgroundCtx.fillStyle = 'green';
    backgroundCtx.fillRect(0, 20, playerHealthPercentage, 50);
    backgroundCtx.fillStyle = 'black';
    backgroundCtx.font = "45px Verdana";
    backgroundCtx.fillText(inventory.health, 20, 60);


    //current ammo
    backgroundCtx.clearRect(1200, 750, 500, 100);

    let currentAmmo = inventory.currentWeapon.tempNumberofShots;
    let maxAmmo = inventory.currentWeapon.numberOfShots;
    let ammoText = `${currentAmmo} / ${maxAmmo}`;
    backgroundCtx.fillText(ammoText, 1200, 800);

    
    //inventory
    backgroundCtx.clearRect(invDrawing.startingPointX-10, invDrawing.startingPointY, invDrawing.imageWidth*4+20, invDrawing.imageHeight +5);
    if(!inventory.handgun.isOwned){
        backgroundCtx.globalAlpha = 0.7;
        backgroundCtx.fillStyle="gray";
        backgroundCtx.drawImage(invHandgun, invDrawing.startingPointX, invDrawing.startingPointY);
        backgroundCtx.fillRect(invDrawing.startingPointX, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.globalAlpha = 1;
    }else if(inventory.handgun.isOwned){
        backgroundCtx.fillStyle="gray";
        backgroundCtx.fillRect(invDrawing.startingPointX, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.drawImage(invHandgun, invDrawing.startingPointX, invDrawing.startingPointY);
    }
    if(!inventory.rifle.isOwned){
        backgroundCtx.globalAlpha = 0.7;
        backgroundCtx.fillStyle="gray";
        backgroundCtx.drawImage(invRifle, invDrawing.startingPointX+invDrawing.imageWidth, invDrawing.startingPointY);
        backgroundCtx.fillRect(invDrawing.startingPointX+invDrawing.imageWidth, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.globalAlpha = 1;
    }else if(inventory.rifle.isOwned){
        backgroundCtx.fillStyle="gray";
        backgroundCtx.fillRect(invDrawing.startingPointX+invDrawing.imageWidth, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.drawImage(invRifle, invDrawing.startingPointX+invDrawing.imageWidth, invDrawing.startingPointY);
    }
    if(!inventory.shotgun.isOwned){
        backgroundCtx.globalAlpha = 0.7;
        backgroundCtx.fillStyle="gray";
        backgroundCtx.drawImage(invShotgun, invDrawing.startingPointX+invDrawing.imageWidth*2, invDrawing.startingPointY);
        backgroundCtx.fillRect(invDrawing.startingPointX+invDrawing.imageWidth*2, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.globalAlpha = 1;
    }else if(inventory.shotgun.isOwned){
        backgroundCtx.fillStyle="gray";
        backgroundCtx.fillRect(invDrawing.startingPointX+invDrawing.imageWidth*2, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.drawImage(invShotgun, invDrawing.startingPointX+invDrawing.imageWidth*2, invDrawing.startingPointY);
    }
    if(!inventory.knife.isOwned){
        backgroundCtx.globalAlpha = 0.7;
        backgroundCtx.fillStyle="gray";
        backgroundCtx.drawImage(invKnife, invDrawing.startingPointX+invDrawing.imageWidth*3, invDrawing.startingPointY);
        backgroundCtx.fillRect(invDrawing.startingPointX+invDrawing.imageWidth*3, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.globalAlpha = 1;
    }else if(inventory.knife.isOwned){
        backgroundCtx.fillStyle="gray";
        backgroundCtx.fillRect(invDrawing.startingPointX+invDrawing.imageWidth*3, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.drawImage(invKnife, invDrawing.startingPointX+invDrawing.imageWidth*3, invDrawing.startingPointY);
    }

    if(inventory.currentWeapon === handgun){
        backgroundCtx.beginPath();
        backgroundCtx.lineWidth = 5;
        backgroundCtx.rect(invDrawing.startingPointX, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.stroke();
    }else if(inventory.currentWeapon === rifle){
        backgroundCtx.beginPath();
        backgroundCtx.lineWidth = 5;
        backgroundCtx.rect(invDrawing.startingPointX+invDrawing.imageWidth, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.stroke();
    }else if(inventory.currentWeapon === shotgun){
        backgroundCtx.beginPath();
        backgroundCtx.lineWidth = 5;
        backgroundCtx.rect(invDrawing.startingPointX+invDrawing.imageWidth*2, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.stroke();
    }else if(inventory.currentWeapon === knife){
        backgroundCtx.beginPath();
        backgroundCtx.lineWidth = 5;
        backgroundCtx.rect(invDrawing.startingPointX+invDrawing.imageWidth*3, invDrawing.startingPointY, invDrawing.imageWidth, invDrawing.imageHeight);
        backgroundCtx.stroke();
    } 
}

function calculatePositioningBetweenMouseAndPlayer (){
    // Berechne die Differenz zwischen der Mausposition und der Spielerposition
    dx = mouseX - (playerX + player.width / 2);
    dy = mouseY - (playerY + player.height / 2);
    
    // Berechne den Winkel zwischen der Spielerposition und der Mausposition
    angle = Math.atan2(dy, dx);
}

function drawPlayer(){
    var initWeaponOffsetX; 
    var initWeaponOffsetY;

    //var playercenter = player.width / 2;
    if(inventory.handgun.isEquipped){
        player = document.getElementById("handgun");
        initWeaponOffsetX = handgun.initWeaponOffset.x;
        initWeaponOffsetY = handgun.initWeaponOffset.y;
    }else if(inventory.rifle.isEquipped){
        player = document.getElementById("rifle");
        initWeaponOffsetX = rifle.initWeaponOffset.x;
        initWeaponOffsetY = rifle.initWeaponOffset.y;
    }else if(inventory.shotgun.isEquipped){
        player = document.getElementById("shotgun");
        initWeaponOffsetX = shotgun.initWeaponOffset.x;
        initWeaponOffsetY = shotgun.initWeaponOffset.y;
    }else if(inventory.knife.isEquipped){
        player = document.getElementById("knife");
    }
    
    frame += 0.2;

    //todo: Hitbox player anzeigen -> muss wieder weg 
    ctx.beginPath();
    ctx.rect(playerX+hitboxPlayer.calibrationX, playerY+hitboxPlayer.calibrationY, hitboxPlayer.width, hitboxPlayer.height);
    ctx.stroke();

    calculatePositioningBetweenMouseAndPlayer(); 
    
    // Winkel in Grad umwandeln
    playerAngle = angle * (180 / Math.PI) - 5;

    //todo Idee: Waffe auf Maus ausrichten
    //da muss dann die Variable playerAngle angepasst werden, 
    //je nachdem, wie weit die Maus vom Spieler weg ist

    // Spieler drehen
    ctx.save();
    //Neue (0, 0) Position setzen
    ctx.translate(playerX + player.width / 2, playerY + player.height / 2);

    // Vor der Rotation den Punkt (80, 60) relativ zum Spieler berechnen
    weaponOffsetX = initWeaponOffsetX * Math.cos(playerAngle * Math.PI / 180) - initWeaponOffsetY * Math.sin(playerAngle * Math.PI / 180);
    weaponOffsetY = initWeaponOffsetX * Math.sin(playerAngle * Math.PI / 180) + initWeaponOffsetY * Math.cos(playerAngle * Math.PI / 180);

    ctx.rotate(playerAngle * Math.PI / 180 );
    //Füße malen
    if(isMoving()){
        ctx.drawImage(
            feet, 
            Math.floor(frame % 6)*feet.width / 6, 0,
            feet.width / 6, feet.height, 
            -feet.width/6/2 - 25, -feet.height/2 + 8, 
            feet.width / 6, feet.height 
        );
    }
    if(meleeAttackAnimation.isPlaying){
        ctx.drawImage(
            meleeAttackSheet, 
            meleeAttackAnimation.currentFrame * meleeAttackSheet.width/3,0,
            meleeAttackSheet.width/3, meleeAttackSheet.height,
            -meleeAttackSheet.width/3/2, -meleeAttackSheet.height/2 + 15,
            meleeAttackSheet.width/3, meleeAttackSheet.height
        )
    }else if(inventory.currentWeapon != knife && inventory.currentWeapon.reloadAnimation.isPlaying){
        ctx.drawImage(
            inventory.currentWeapon.reloadAnimation.reloadSprite,
            inventory.currentWeapon.reloadAnimation.currentFrame * inventory.currentWeapon.reloadAnimation.reloadSprite.width/inventory.currentWeapon.reloadAnimation.totalFrames,
            0,
            inventory.currentWeapon.reloadAnimation.reloadSprite.width/inventory.currentWeapon.reloadAnimation.totalFrames,
            inventory.currentWeapon.reloadAnimation.reloadSprite.height,
            -inventory.currentWeapon.reloadAnimation.reloadSprite.width/inventory.currentWeapon.reloadAnimation.totalFrames/2 + inventory.currentWeapon.reloadAnimation.offSetX,
            -inventory.currentWeapon.reloadAnimation.reloadSprite.height/2 + inventory.currentWeapon.reloadAnimation.offSetY,
            inventory.currentWeapon.reloadAnimation.reloadSprite.width/inventory.currentWeapon.reloadAnimation.totalFrames,
            inventory.currentWeapon.reloadAnimation.reloadSprite.height
        )
    }else{
        ctx.drawImage(player, -player.width / 2, -player.height / 2, player.width, player.height);
    }
    ctx.restore(); 
}

function calculatePositioningBetweenMouseAndWeapon() {
    // Berechne die Differenz zwischen der Mausposition und der Position der Waffe
    var dxWeapon = mouseX - (playerX + weaponOffsetX + player.width / 2);
    var dyWeapon = mouseY - (playerY + weaponOffsetY + player.height / 2);
    
    // Berechne den Winkel zwischen der Waffe und der Mausposition
    angle = Math.atan2(dyWeapon, dxWeapon);
}

function calculatePositionBetweenEnemyAndPlayer(currentEnemy) {
    var dxEnemy = (playerX + player.width / 2)-(currentEnemy.x + hitboxEnemy.width/2);
    var dyEnemy = (playerY + player.height / 2)-(currentEnemy.y + hitboxEnemy.height/2);

    angle = Math.atan2(dyEnemy, dxEnemy);
}

function spawnEnemy (startX = 500, startY = 500){
    // Erstelle ein neues Zombieobjekt mit der Richtung und Position des Spielers
    var enemy = {
        x: 500,
        y: 500,
        dx: 0,
        dy: 0,
        health: 100,
        maxHealth: 100,
        attackRange: 80,
        isOnCooldown: false,
        lastAttack: Date.now(),
        attackCooldown: 2000, //2 Sekunden
        damagePending: false,
        enemyAttackAnimation: {
            currentFrame: 0,
            totalFrames: 2, // Assuming the sprite sheet has 5 frames
            frameDuration: 200, // Duration of each frame in milliseconds
            lastFrameTime: Date.now(), // Timestamp of the last frame update
            isPlaying: false // Indicates if the animation is currently playing
        },
        evadeDx: 0,
        evadeDy: 0, 
        evadeTime: 0
    };

    // Füge den Schuss zum Array der aktiven Schüsse hinzu
    activeEnemys.push(enemy);
}

function calculateDistance(enemyX, enemyY, x = 0, y = 0){
    let distance = Math.sqrt(((playerX + player.width/2) - (enemyX + hitboxEnemy.width/2 + x)) ** 2 + ((playerY + player.height/2) - (enemyY + hitboxEnemy.height/2 + y)) ** 2);
    return distance
}

function drawEnemy (){

    for (let j = 0; j < activeEnemys.length; j++) {
        var enemy = activeEnemys[j];
        calculatePositionBetweenEnemyAndPlayer(enemy);
        enemy.dx = Math.cos(angle) * enemySpeed;
        enemy.dy = Math.sin(angle) * enemySpeed; 

        if(enemy.health > 0){
            if(borderCheck(enemy.x + enemy.dx, enemy.y + enemy.dy, hitboxEnemy)){
                enemy.x += enemy.dx;
                enemy.y += enemy.dy;
            } 
            else {
                let arrayDistance = [];

                // Potentielle Bewegungen in vier Richtungen
                let potentialMoves = [
                    { x: enemySpeed, y: 0 },
                    { x: -enemySpeed, y: 0 },
                    { x: 0, y: enemySpeed },
                    { x: 0, y: -enemySpeed }
                ];

                // Überprüfung jeder möglichen Bewegung
                for (let move of potentialMoves) {
                    if (borderCheck(enemy.x + move.x, enemy.y + move.y, hitboxEnemy)) {
                        let distance = calculateDistance(enemy.x + move.x, enemy.y + move.y);
                        arrayDistance.push({ ...move, distance });
                    }
                }

                let tempDx;
                let tempDy;

                // Finden der besten Bewegung (die zum Spieler führt)
                if (arrayDistance.length > 0) {
                    let bestMove = arrayDistance.reduce((min, move) => move.distance < min.distance ? move : min);

                    tempDx = bestMove.x;
                    tempDy = bestMove.y;
                }

                if(enemy.evadeTime > 0 && borderCheck(enemy.x + enemy.evadeDx, enemy.y + enemy.evadeDy, hitboxEnemy)) {
                    // Wenn eine Ausweichbewegung aktiv ist, diese nutzen
                    enemy.x += enemy.evadeDx;
                    enemy.y += enemy.evadeDy;
                    enemy.evadeTime--;
                } else if (tempDx !== undefined && tempDy !== undefined) {
                    // Wenn keine Ausweichbewegung aktiv ist, aber eine alternative Bewegung möglich ist
                    enemy.x += tempDx;
                    enemy.y += tempDy;
                    // Ausweichbewegung speichern und Zeit setzen
                    enemy.evadeDx = tempDx;
                    enemy.evadeDy = tempDy;
                    enemy.evadeTime = 90; // Zeit für die Ausweichbewegung (kann angepasst werden)
                }
            }
            

            var zombieAngle = angle * (180 / Math.PI) - 5;
            ctx.save();
            //Neue (0, 0) Position setzen
            ctx.translate(enemy.x + hitboxEnemy.width / 2, enemy.y + hitboxEnemy.height / 2);
            ctx.rotate(zombieAngle * Math.PI / 180 );
            /*if(isMoving()){*/  //evtl. später was einbauen, dass der sich nicht im Stillstand bewegt. Momentan läuft er aber immer, also passt das erstmal so.
            if(enemy.enemyAttackAnimation.isPlaying){
                ctx.drawImage(
                    zombieAttack, 
                    enemy.enemyAttackAnimation.currentFrame * zombieAttack.width/2,0,
                    zombieAttack.width/2, zombieAttack.height,
                    -zombieAttack.width/2/2, -zombieAttack.height/2,
                    zombieAttack.width/2, zombieAttack.height
                )
            }else{
                ctx.drawImage(
                    zombieWalk, Math.floor(frame % 9)*zombieWalk.width / 9, 0,
                    zombieWalk.width / 9, zombieWalk.height, 
                    -zombieWalk.width/9/2 , -zombieWalk.height/2, 
                    zombieWalk.width / 9, zombieWalk.height 
                );
            }
            
                
            /*}*/
                    ctx.restore(); 

            //aktuelle HP berechnen
            var healthPercentage = (enemy.health/enemy.maxHealth) * hitboxEnemy.width;
            //Hintergrund der Health Bar
            ctx.fillStyle = 'gray';
            ctx.fillRect(enemy.x, enemy.y - 10, hitboxEnemy.width, 10);

            //gefüllter Teil der Health Bar
            ctx.fillStyle = 'red';
            ctx.fillRect(enemy.x, enemy.y - 10, healthPercentage, 10);

            ctx.beginPath();
            ctx.rect(enemy.x, enemy.y, hitboxEnemy.width, hitboxEnemy.height, 10);
            ctx.stroke();
        }else{
            activeEnemys.splice(j,1);
            j--;
        }
    }       
}

function attackPlayer(){
    activeEnemys.forEach((enemy)=>{
        if(isPlayerInAttackRange(enemy) && !enemy.isOnCooldown){
            enemy.lastAttack = Date.now();
            enemy.enemyAttackAnimation.isPlaying = true;
            enemy.enemyAttackAnimation.currentFrame = 0;
            enemy.enemyAttackAnimation.lastFrameTime = Date.now();
            //inventory.health -= 5;
            enemy.isOnCooldown = true;
            enemy.damagePending = true;      
        }
    });
}

function isPlayerInAttackRange(enemy, additionalRange = 0){
    let distance = Math.sqrt(((playerX + player.width/2) - (enemy.x + hitboxEnemy.width/2)) ** 2 + ((playerY + player.height/2) - (enemy.y + hitboxEnemy.height/2)) ** 2);
    if (distance > (enemy.attackRange + additionalRange)) {
        return false;
    }else{
        return true; //hier müssen keine Winkel geprüft werden, da der enemy eh immer auf den Spieler guckt
    }
}

function updateEnemyAttackCooldown(){
    activeEnemys.forEach((enemy)=>{
        if(!enemy.isOnCooldown){
            return;
        } 
        now = Date.now();
        if(now - enemy.lastAttack >= enemy.attackCooldown){
            enemy.isOnCooldown = false;
        }
    });
}

//Hier wird auch Schaden gemacht
function updateEnemyAttackAnimation() {
    activeEnemys.forEach((enemy) => {
        if (!enemy.enemyAttackAnimation.isPlaying) return;

        var now = Date.now();
        if (now - enemy.enemyAttackAnimation.lastFrameTime >= enemy.enemyAttackAnimation.frameDuration) {
            enemy.enemyAttackAnimation.currentFrame++;
            enemy.enemyAttackAnimation.lastFrameTime = now;

            if (enemy.enemyAttackAnimation.currentFrame >= enemy.enemyAttackAnimation.totalFrames) {
                enemy.enemyAttackAnimation.currentFrame = 0;
                enemy.enemyAttackAnimation.isPlaying = false; // Stop the animation after one cycle

                activeEnemys.forEach((enemy) => {
                    if (enemy.damagePending) {
                        if(isPlayerInAttackRange(enemy, 30)){
                            inventory.health -= 5;
                        }
                        enemy.damagePending = false;
                        console.log(inventory.health);
                    }
                });
            }
        }
    });
}

function enemyHit (){
    for (let j = 0; j < activeEnemys.length; j++) {
        for (let i = 0; i < activeShots.length; i++) {
            if(hitCheck(activeEnemys[j], activeShots[i])){
                activeEnemys[j].health -= activeShots[i].damage;
                activeShots.splice(i, 1);
                i--;
            }
        }
    }
}

function hitCheck(enemy, shot){
    if(!inventory.knife.isEquipped){
        var shotLeft = shot.x;
        var shotRight = shot.x + (inventory.currentWeapon).hitboxShot.width;
        var shotTop = shot.y;
        var shotBottom = shot.y + (inventory.currentWeapon).hitboxShot.height;
    
        var enemyLeft = enemy.x;
        var enemyRight = enemy.x + hitboxEnemy.width;
        var enemyTop = enemy.y;
        var enemyBottom = enemy.y + hitboxEnemy.height;
    
        // Check if the two rectangles intersect
        return (shotRight >= enemyLeft &&
                shotLeft <= enemyRight &&
                shotBottom >= enemyTop &&
                shotTop <= enemyBottom);
    }
    
}

function useKnife() {
    if(inventory.knife.isEquipped){
        if (inventory.knife.isEquipped && !meleeAttackAnimation.isPlaying) {
            meleeAttackAnimation.isPlaying = true;
            meleeAttackAnimation.currentFrame = 0;
            meleeAttackAnimation.lastFrameTime = Date.now();
        }
        activeEnemys.forEach((enemy, index)=>{
            if (isEnemyInMeleeRange(enemy)) {
                enemy.health -= knife.damage;
                if (enemy.health <= 0){
                    activeEnemys.splice(index, 1);
                }
            }
        });
    }
}

function isEnemyInMeleeRange (enemy){
    let distance = Math.sqrt(((playerX + player.width/2) - (enemy.x + hitboxEnemy.width/2)) ** 2 + ((playerY + player.height/2) - (enemy.y + hitboxEnemy.height/2)) ** 2);
    if (distance > (knife.range)) {
        return false;
    }
    calculatePositioningBetweenMouseAndPlayer ();

    let currentPlayerAngle = angle;
    let enemyAngle = Math.atan2(enemy.y - playerY, enemy.x - playerX);
    // let fov = Math.Pi/4;

    let angleDifference = Math.abs(enemyAngle - currentPlayerAngle);
    // Correct for angle wrap-around
    if (angleDifference > Math.PI) {
        angleDifference = (2 * Math.PI) - angleDifference;
    }
    return angleDifference <= 1.3;
}

function updateMeleeAttackAnimation() {
    if (!meleeAttackAnimation.isPlaying) return;

    var now = Date.now();
    if (now - meleeAttackAnimation.lastFrameTime >= meleeAttackAnimation.frameDuration) {
        meleeAttackAnimation.currentFrame++;
        meleeAttackAnimation.lastFrameTime = now;

        if (meleeAttackAnimation.currentFrame >= meleeAttackAnimation.totalFrames) {
            meleeAttackAnimation.currentFrame = 0;
            meleeAttackAnimation.isPlaying = false; // Stop the animation after one cycle
        }
    }
}

//für später, wenn man Schaden bekommt
function flashScreen() {
    const originalFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';  // Flash a red overlay
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
        ctx.fillStyle = originalFill;
        draw();  // Redraw the original screen
    }, 100);
}

function calculateDelay (isFromDrawShot){
    if(inventory.currentWeapon.tempDelayPerShot < inventory.currentWeapon.delayPerShot){
        if(isFromDrawShot){
            inventory.currentWeapon.tempDelayPerShot += 0.01;
        }
    }else{
        return true;
    }
    return false; 
}

function reloadWeapon(){
    if(inventory.currentWeapon != knife && !inventory.currentWeapon.reloadAnimation.isPlaying){
        inventory.currentWeapon.reloadAnimation.isPlaying = true;
        inventory.currentWeapon.reloadAnimation.currentFrame = 0;
        inventory.currentWeapon.reloadAnimation.lastFrameTime = Date.now();
    }
}

function updateReloadAnimation(){
    if(inventory.currentWeapon === knife || !inventory.currentWeapon.reloadAnimation.isPlaying) return;
    now = Date.now();
    if(now - inventory.currentWeapon.reloadAnimation.lastFrameTime >= inventory.currentWeapon.reloadAnimation.frameDuration){
        inventory.currentWeapon.reloadAnimation.currentFrame++;
        inventory.currentWeapon.reloadAnimation.lastFrameTime = now;
        if(inventory.currentWeapon.reloadAnimation.currentFrame >= inventory.currentWeapon.reloadAnimation.totalFrames){
            inventory.currentWeapon.reloadAnimation.currentFrame = 0;
            inventory.currentWeapon.reloadAnimation.isPlaying = false;
            inventory.currentWeapon.tempNumberofShots = inventory.currentWeapon.numberOfShots;
        }
    }
}


function fireShot() {
    if(!inventory.knife.isEquipped){

        let isFromDrawShot = false

        if(calculateDelay(isFromDrawShot) && !inventory.currentWeapon.reloadAnimation.isPlaying && !(inventory.currentWeapon.tempNumberofShots === 0)){
            
            calculatePositioningBetweenMouseAndWeapon();

            // Berechne die Startposition des Schusses unter Berücksichtigung der Waffenverschiebung
            var shotStartPositionX = playerX + weaponOffsetX + player.width / 2;
            var shotStartPositionY = playerY + weaponOffsetY + player.height / 2;
            
            let i; 
            let shotgunSpread = 0.13; 

            if(inventory.shotgun.isEquipped){
                i = 0; 
                var isShotgun = true;
                angle -= shotgunSpread;
            }else{
                i = 2
            };

            for(i; i < 3; i++){

                // Erstelle ein neues Schussobjekt mit der Richtung und Position des Spielers
                var shot = {
                    x: shotStartPositionX,
                    y: shotStartPositionY,
                    dx: Math.cos(angle) * inventory.currentWeapon.shotspeed, // Geschwindigkeit des Schusses in x-Richtung
                    dy: Math.sin(angle) * inventory.currentWeapon.shotspeed, // Geschwindigkeit des Schusses in y-Richtung
                    damage: (inventory.currentWeapon).damage
                };

                //shot.damage = (inventory.currentWeapon).damage;
                // Füge den Schuss zum Array der aktiven Schüsse hinzu
                activeShots.push(shot);

                if(isShotgun)angle +=shotgunSpread;
            }

            inventory.currentWeapon.tempDelayPerShot = 0;
            inventory.currentWeapon.tempNumberofShots -= 1;  
        }
    } 
}

function drawShots() {
    // Gehe durch alle aktiven Schüsse und zeichne sie
    
    let isFromDrawShot = true; 
    
    calculateDelay(isFromDrawShot);

    for (let i = 0; i < activeShots.length; i++) {
        var shot = activeShots[i];

        if(borderCheck(shot.x, shot.y, inventory.currentWeapon.hitboxShot)){
            ctx.beginPath();
            ctx.arc(shot.x, shot.y, shotRadius, 0, Math.PI * 2);
            shot.x += shot.dx;
            shot.y += shot.dy; 
            ctx.fillStyle = "black"; // Farbe des Schusses
            ctx.fill();
            ctx.closePath();
        }else{
            activeShots.splice(i, 1);
            i--; 
        }  
    }
    if(inventory.currentWeapon.tempNumberofShots === 0){
        reloadWeapon();
    }
}

function weaponSwitcher(ev){;
    ev.preventDefault();
    if(ev.deltaY > 0){
        if(inventory.handgun.isEquipped){
            if(inventory.rifle.isOwned){
                inventory.handgun.isEquipped = false;
                inventory.rifle.isEquipped = true;
                inventory.currentWeapon = rifle;
            }else if(inventory.shotgun.isOwned){
                inventory.handgun.isEquipped = false;
                inventory.shotgun.isEquipped = true;
                inventory.currentWeapon = shotgun;
            }else if(inventory.knife.isOwned){
                inventory.handgun.isEquipped = false;
                inventory.knife.isEquipped = true;
                inventory.currentWeapon = knife;
            }
        }else if(inventory.rifle.isEquipped){
            if(inventory.shotgun.isOwned){
                inventory.rifle.isEquipped = false;
                inventory.shotgun.isEquipped = true;
                inventory.currentWeapon = shotgun;
            }else if(inventory.knife.isOwned){
                inventory.rifle.isEquipped = false;
                inventory.knife.isEquipped = true;
                inventory.currentWeapon = knife;
            }else if(inventory.handgun.isOwned){
                inventory.rifle.isEquipped = false;
                inventory.handgun.isEquipped = true;
                inventory.currentWeapon = handgun;
            }
        }else if(inventory.shotgun.isEquipped){
            if(inventory.knife.isOwned){
                inventory.shotgun.isEquipped = false;
                inventory.knife.isEquipped = true;
                inventory.currentWeapon = knife;
            }else if(inventory.handgun.isOwned){
                inventory.shotgun.isEquipped = false;
                inventory.handgun.isEquipped = true;
                inventory.currentWeapon = handgun;
            }else if(inventory.rifle.isOwned){
                inventory.shotgun.isEquipped = false;
                inventory.rifle.isEquipped = true;
                inventory.currentWeapon = rifle;
            }
        }else if(inventory.knife.isEquipped){
            if(inventory.handgun.isOwned){
                inventory.knife.isEquipped = false;
                inventory.handgun.isEquipped = true;
                inventory.currentWeapon = handgun;
            }else if(inventory.rifle.isOwned){
                inventory.knife.isEquipped = false;
                inventory.rifle.isEquipped = true;
                inventory.currentWeapon = rifle;
            }else if(inventory.shotgun.isOwned){
                inventory.knife.isEquipped = false;
                inventory.shotgun.isEquipped = true;
                inventory.currentWeapon = shotgun;
            }
        }
    }else if(ev.deltaY < 0){
        if(inventory.handgun.isEquipped){
            if(inventory.knife.isOwned){
                inventory.handgun.isEquipped = false;
                inventory.knife.isEquipped = true;
                inventory.currentWeapon = knife;
            }else if(inventory.shotgun.isOwned){
                inventory.handgun.isEquipped = false;
                inventory.shotgun.isEquipped = true;
                inventory.currentWeapon = shotgun;
            }else if(inventory.rifle.isOwned){
                inventory.handgun.isEquipped = false;
                inventory.rifle.isEquipped = true;
                inventory.currentWeapon = rifle;
            }
        }else if(inventory.rifle.isEquipped){
            if(inventory.handgun.isOwned){
                inventory.rifle.isEquipped = false;
                inventory.handgun.isEquipped = true;
                inventory.currentWeapon = handgun;
            }else if(inventory.knife.isOwned){
                inventory.rifle.isEquipped = false;
                inventory.knife.isEquipped = true;
                inventory.currentWeapon = knife;
            }else if(inventory.handgun.isOwned){
                inventory.rifle.isEquipped = false;
                inventory.shotgun.isEquipped = true;
                inventory.currentWeapon = shotgun;
            }
        }else if(inventory.shotgun.isEquipped){
            if(inventory.rifle.isOwned){
                inventory.shotgun.isEquipped = false;
                inventory.rifle.isEquipped = true;
                inventory.currentWeapon = rifle;
            }else if(inventory.handgun.isOwned){
                inventory.shotgun.isEquipped = false;
                inventory.handgun.isEquipped = true;
                inventory.currentWeapon = handgun;
            }else if(inventory.knife.isOwned){
                inventory.shotgun.isEquipped = false;
                inventory.knife.isEquipped = true;
                inventory.currentWeapon = knife;
            }
        }else if(inventory.knife.isEquipped){
            if(inventory.shotgun.isOwned){
                inventory.knife.isEquipped = false;
                inventory.shotgun.isEquipped = true;
                inventory.currentWeapon = shotgun;
            }else if(inventory.rifle.isOwned){
                inventory.knife.isEquipped = false;
                inventory.rifle.isEquipped = true;
                inventory.currentWeapon = rifle;
            }else if(inventory.handgun.isOwned){
                inventory.knife.isEquipped = false;
                inventory.handgun.isEquipped = true;
                inventory.currentWeapon = handgun;
            }
        }
    }
}

function isMoving(){
    if(!downKey && !upKey && !leftKey && !rightKey){
        return false;
    }else{
        return true;
    }
}

function drawWorld(){
    ctx.drawImage(background, 0,0);
}

function mouseClicked(ev){
    //Wenn geklickt 
    console.log(mouseX, mouseY);
    fireShot();
    useKnife();
}

function mouseMoved(ev){
    if (!gameStarted) return;
    mouseX = ev.clientX - canvas.offsetLeft; 
    mouseY = ev.clientY - canvas.offsetTop;
}

function paceChanger(ev){ //todo
    if(shiftKey){
        schrittweite = sprintPace;
    }
    else{
        schrittweite = normalPace;
    }
}

//todo Diese Funktion kann man bestimmt auch schöner machen.
//ChatGPT hat mir da schon Sachen vorgeschlagen. 
//Das ist aber optional, momentan funktioniert es nämlich
function updatePlayerPosition(ev){ 
    if (downKey && rightKey && !upKey && !leftKey) {
        if (borderCheck(playerX + schrittweite, playerY + schrittweite, hitboxPlayer)) {
            playerX += schrittweite / Math.sqrt(2);
            playerY += schrittweite / Math.sqrt(2);
            feetX += schrittweite / Math.sqrt(2);
            feetY += schrittweite / Math.sqrt(2);
        }
    }
    if (downKey && leftKey && !upKey && !rightKey) {
        if (borderCheck(playerX - schrittweite, playerY + schrittweite, hitboxPlayer)) {
            playerX -= schrittweite / Math.sqrt(2);
            playerY += schrittweite / Math.sqrt(2);
            feetX -= schrittweite / Math.sqrt(2);;
            feetY += schrittweite / Math.sqrt(2);;
        }
    }
    if (upKey && rightKey && !downKey && !leftKey) {
        if (borderCheck(playerX + schrittweite, playerY - schrittweite, hitboxPlayer)) {
            playerX += schrittweite / Math.sqrt(2);;
            playerY -= schrittweite / Math.sqrt(2);;
            feetX += schrittweite / Math.sqrt(2);;
            feetY -= schrittweite / Math.sqrt(2);;
        }
    }
    if (upKey && leftKey && !rightKey && !downKey) {
        if (borderCheck(playerX - schrittweite, playerY - schrittweite, hitboxPlayer)) {
            playerX -= schrittweite / Math.sqrt(2);;
            playerY -= schrittweite / Math.sqrt(2);;
            feetX -= schrittweite / Math.sqrt(2);;
            feetY -= schrittweite / Math.sqrt(2);;
        }
    }
    if (downKey && !leftKey && !rightKey && !upKey) {
        if (borderCheck(playerX, playerY + schrittweite, hitboxPlayer)) {
            playerY += schrittweite;
            feetY += schrittweite;
        }
    }
    if (upKey && !leftKey && !rightKey && !downKey) {
        if (borderCheck(playerX, playerY - schrittweite, hitboxPlayer)) {
            playerY -= schrittweite;
            feetY -= schrittweite;
        }
    }
    if (leftKey && !upKey && !downKey && !rightKey) {
        if (borderCheck(playerX - schrittweite, playerY, hitboxPlayer)) {
            playerX -= schrittweite;
            feetX -= schrittweite;
        }
    }
    if (rightKey && !upKey && !downKey && !leftKey) {
        if (borderCheck(playerX + schrittweite, playerY, hitboxPlayer)) {
            playerX += schrittweite;
            feetX += schrittweite;
        }
    }
    if (!rightKey && !upKey && !downKey && !leftKey) {
        playerX = playerX;
        playerY = playerY;
    }
    if (downKey && leftKey && rightKey && !upKey){
        if (borderCheck(playerX, playerY + schrittweite, hitboxPlayer)) {
            playerY += schrittweite;
        }
    }
    if (!downKey && leftKey && rightKey && upKey){
        if (borderCheck(playerX, playerY - schrittweite, hitboxPlayer)) {
            playerY -= schrittweite;
        }
    }
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

    if(event.key === "j" || event.key === "J"){
        spawnEnemy();
    }

    if(event.key === "r" || event.key === "R"){
        reloadWeapon();
    }

    if(event.key === "1" || event.key ==="!"){
        if(inventory.handgun.isOwned){
            inventory.rifle.isEquipped = false;
            inventory.shotgun.isEquipped = false;
            inventory.knife.isEquipped = false;
            inventory.handgun.isEquipped = true;
            inventory.currentWeapon = handgun;
        }
    }else if(event.key === "2" || event.key ==='"'){
        if(inventory.rifle.isOwned){
            inventory.handgun.isEquipped = false;
            inventory.shotgun.isEquipped = false;
            inventory.knife.isEquipped = false;
            inventory.rifle.isEquipped = true;
            inventory.currentWeapon = rifle;
        }
    }else if(event.key === "3" || event.key ==='§'){
        if(inventory.shotgun.isOwned){
            inventory.handgun.isEquipped = false;
            inventory.rifle.isEquipped = false;
            inventory.knife.isEquipped = false;
            inventory.shotgun.isEquipped = true;
            inventory.currentWeapon = shotgun;
        }
    }else if(event.key === "4" || event.key ==='$'){
        if(inventory.knife.isOwned){
            inventory.handgun.isEquipped = false;
            inventory.rifle.isEquipped = false;
            inventory.shotgun.isEquipped = false;
            inventory.knife.isEquipped = true;
            inventory.currentWeapon = knife;
        }
    }
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
    }else if(event.key ==="Shift"){
        shiftKey = false;
    }
});
document.addEventListener("wheel", weaponSwitcher, {passive:false});
document.addEventListener("mousemove", mouseMoved);
document.addEventListener("mousedown", mouseClicked);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('exit-game').addEventListener('click', reloadGame);
}); 

function reloadGame (){
    location.reload();
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('gameover-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';

    // Initialisierung des Spiels
    init();
}

function gameOver() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('gameover-screen').style.display = 'flex';
}

function checkPlayerHealth() {
    if (inventory.health <= 0) {
        gameOver();
    }
}