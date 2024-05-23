//kommende Features
//doneT Laufanimation
    //Quelle Bilder für Spritesheet: https://opengameart.org/content/animated-top-down-survivor-player
//doneT Waffe wechseln
//done Nahkampfangriff
//doneS Schießen
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
//doneS map
    //mehrere Level
    //evtl. Level automatisch generieren (Rougelike)
    //collision Detection 
//doneT Gegner (mit Health Bar)
    //evtl. Bildquelle: https://opengameart.org/content/animated-top-down-zombie
    //hit detection mit modulo? Torben fragen
    //evtl. line of sight etablieren, damit die Gegner nur auf einen zulaufen, wenn sie einen sehen
        //wenn sie einen nicht sehen, dann random bewegen
        // wenn sie gegen eine Wand laufen, etwas andere Richtung ausprobieren, weil die sonst festhängen
//doneT Inventar
    //man sieht in einer Anzeige unten konstant alle Waffen und kann mit dem Mausrad durchscrollen
        //Quelle Waffensymbole: https://vladpenn.itch.io/weapon
    //oder mit den Zahlen durch die Waffen wechseln
//doneT Health Bar (bspw. oben links)
    //mit Logik, Spieler soll Schaden bekommen können
//todo Audio
    // Quellen Sounds:
        //Schusswaffen:
            //https://f8studios.itch.io/snakes-authentic-gun-sounds
            //https://f8studios.itch.io/snakes-second-authentic-gun-sounds-pack
        //Messer:
            //https://opengameart.org/content/20-sword-sound-effects-attacks-and-clashes (CC0)
        //Zombie:
            //https://opengameart.org/content/zombies-sound-pack (CC0)
    //Quelle Musik:
        //https://void1gaming.itch.io/free-action-music-pack
//todo Einstellungsmöglichkeiten
    //Musik switch
    //Soundeffekte switch
        //Quelle Icons: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css
            //Lizenz: CC BY 4.0
                //Font Awesome
            //Links für weitere Infos:
                //Versionen: https://fontawesome.com/versions
                //Tutorial: https://www.w3schools.com/icons/fontawesome_icons_intro.asp
    //evtl. Schwierigkeitsgrad
    //in den Cookies speichern
//todoS irgendwann Startbildschirm
//done Highscore
    //Punktesystem, bspw. ein Zombie gibt 10 Punkte
    // sollen wir ganz einfach in Cookies abspeicher können -> Name sollte nicht highsocre sein, sondern auf das Speil bezogen
    // Cookies sollen wohl nur eine Zeile Code sein in JS 
//Wellen (werden immer schwerer)
    //mit den Wellen skalierende Gegner (werden immer stärker und schneller)
    //Waffen freischalten nach 10 bzw. 20 Wellen
        //erst rifle, dann shotgun
    //nur 6 Gegner gleichzeitig
    //alle drei Wellen entweder MaxHealth oder Damage oder Geschwindigkeit der Zombies um x% erhöhen
        //aber versetzt
    //alle zwei Wellen ein Zombie mehr
//ausdauerleiste zum Sprinten
    //kleine gelbe oder orangene Leiste unter der Health Bar
//todo falls noch Zeit da ist:
    //Waffe genau auf die Maus ausrichten (abhängig von der Entfernung der Maus zum Player)
    //Größe automatisch an die Fenstergröße anpassen
    //Nachladen mit Spritesheets animieren
//todo Credits (u.a. Bilder vom Player) als eigener Button
//death Sounds evtl. Quelle: https://opengameart.org/content/11-male-human-paindeath-sounds

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

    //Audio
    var tracks = [
        'track1', 'track2', 'track3', 'track4', 'track5',
        'track6', 'track7', 'track8', 'track9', 'track10',
        'track11', 'track12', 'track13', 'track14', 'track15',
        'track16', 'track17', 'track18', 'track19', 'track20'
    ];
    var currentTrackIndex = 0;
    var volumeLevel;

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
        damage: 25, 
        numberOfShots: 10,
        tempNumberofShots: 10,
        delayPerShot: 0.2, 
        tempDelayPerShot: 0,
        reloadAnimation: {
            reloadSprite: null,
            currentFrame: 0,
            totalFrames: 5,
            frameDuration: 150,
            lastFrameTime: Date.now(),
            isPlaying: false,
            offSetX: -15,
            offSetY: +4,
        },
        shotSound: null,
        reloadSound: {
            firstSound: null,
            secondSound: null,
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
        damage: 30,
        numberOfShots: 5,
        tempNumberofShots: 5,
        delayPerShot: 0.5, 
        tempDelayPerShot: 1,
        reloadAnimation: {
            reloadSprite: null,
            currentFrame: 0,
            totalFrames: 5,
            frameDuration: 250,
            lastFrameTime: Date.now(),
            isPlaying: false,
            offSetX: -1,
            offSetY: +2,
        },
        shotSound: null,
        reloadSound: {
            firstSound: null,
            secondSound: null,
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
        damage: 20,
        numberOfShots: 20,
        tempNumberofShots: 20,
        delayPerShot: 0.1,
        tempDelayPerShot: 0, 
        reloadAnimation: {
            reloadSprite: null,
            currentFrame: 0,
            totalFrames: 5,
            frameDuration: 250,
            lastFrameTime: Date.now(),
            isPlaying: false,
            offSetX: -1,
            offSetY: +2,
        },
        shotSound: null,
        reloadSound: {
            firstSound: null,
            secondSound: null,
        },
    }

    var knife= {
        damage: 100,
        range: 100,
        numberOfShots: "∞",
        tempNumberofShots: "∞",
        swingSound: null,
    }

    //Player
    var player;
    var feet;
    var frame=0;
    var playerX;
    var playerY;
    var feetX = playerX;
    var feetY = playerY;
    var schrittweite;
    var normalPace = 3;
    var sprintPace = normalPace*2;
    var maxSprintTime = 80; 
    var actualSprintTime = maxSprintTime; 
    var playerAngle;

    //Messer
    var meleeAttackSheet;
    var meleeAttackAnimation = {
        currentFrame: 0,
        totalFrames: 8,
        frameDuration: 80,
        lastFrameTime: Date.now(),
        isPlaying: false,
    };

    //Gegner
    var enemySpeed = 2;
    var activeEnemies = [];
    var zombieWalk;
    var zombieAttack;
    var slainEnemies = 0;

    var zombieAttackSound = null;

    var initEnemyHealth = 100;
    var maxActiveEnemies = 4;
    
    var enemyDamage = 5; 

    var timeBetweenEachSpawn = 100; 
    var timeAfterLastSpawn = 0; 

    var enemySpawnPoints = [
        {
            x: -80, 
            y: 500
        },
        {
            x: 400, 
            y: -80
        },
        {
            x: 1300, 
            y: -80
        },
        {
            x: 700, 
            y: 650
        },
        {
            x: 1400, 
            y: 650
        },
    ]

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
    var activeShots = [];
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
            isOwned: false,
            isEquipped: false
        },
        shotgun: {
            isOwned: false,
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

    const gridRows = 13; 
    const gridCols = 32;

    var activeWalls = []; 

    var initalMap = [
        [0,0,'x',0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0],
        ['x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x'],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'x',0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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

    var wave = {
        counter: 1,  
        numberOfEnemiesPerWave: 5,
        numberOfEnemiesSpawnedInAWave: 0,
        isChangeWave: false,
        typeIncreaseDifficultyLevel: 0
    }

    //Musik

    var soundsMuted;

//#endregion

function init() {
    //Setup
    canvas = document.getElementById("myCanvas");
    canvas.style.border="black 3px solid";
    ctx = canvas.getContext("2d");

    backgroundCanvas = document.getElementById("backgroundCanvas");
    backgroundCtx = backgroundCanvas.getContext("2d");

    //Bilder
    background = document.getElementById("imgBackground");
    imgWall = document.getElementById("imgWall");

    //player
    player = document.getElementById("handgun");
    playerX = canvas.width / 2;
    playerY = canvas.height / 2; 
    //playerX -= player.width/2;
    //playerY -= player.height/2;

    //Animationen

    feet = document.getElementById("feet");

    zombieWalk = document.getElementById("zombieWalk");
    zombieAttack = document.getElementById("zombieAttack");

    meleeAttackSheet = document.getElementById("meleeAttack");

    invHandgun = document.getElementById("invHandgun");
    invRifle = document.getElementById("invRifle");
    invShotgun = document.getElementById("invShotgun");
    invKnife = document.getElementById("invKnife");

    handgun.reloadAnimation.reloadSprite = document.getElementById("reloadHandgun");

    rifle.reloadAnimation.reloadSprite = document.getElementById("reloadRifle");

    shotgun.reloadAnimation.reloadSprite = document.getElementById("reloadShotgun");


    //Soundeffekte
    handgun.shotSound = document.getElementById("handgunShotSound");

    rifle.shotSound = document.getElementById("rifleShotSound");

    shotgun.shotSound = document.getElementById("shotgunShotSound");


    handgun.reloadSound.firstSound = document.getElementById("handgunReloadSound1");
    
    handgun.reloadSound.secondSound = document.getElementById("handgunReloadSound2");

    rifle.reloadSound.firstSound = document.getElementById("rifleReloadSound1");
    rifle.reloadSound.secondSound = document.getElementById("rifleReloadSound2");

    shotgun.reloadSound.firstSound = document.getElementById("shotgunReloadSound1");
    shotgun.reloadSound.secondSound = document.getElementById("shotgunReloadSound2");

    knife.swingSound = document.getElementById("knifeSwing");
    zombieAttackSound = document.getElementById("zombieAttackSound");

    //Musik
    initialSoundEffectMute("game");

    gameStarted = true;

    

    //generateMapTeile(12);

    generateMap();

    //Gameloop starten
    //setInterval(gameLoop,16); //FPS = 1000/diese Zahl
    requestAnimationFrame(gameLoop);
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
    if (!gameStarted) return;
    update(); 
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    updateWave();
    spawnEnemy();
    paceChanger();
    enemyHit();
    updatePlayerPosition();
    updateReloadAnimation();
    updateMeleeAttackAnimation();
    updateEnemyAttackCooldown();
    updateEnemyAttackAnimation();
    attackPlayer();
    checkPlayerHealth();
    updateVolume();
}

function draw() {
    // Hintergrund
    activeWalls = null;
    activeWalls = [];
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawMap();

    drawBackground();

    drawPlayer();

    drawEnemy();

    drawShots();
}

function drawMap(){
    ctx.drawImage(background, 0, 0);
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

    //Sprintbar
    var sprintTimePercentage = (actualSprintTime/maxSprintTime) * 500;
    //Hintergrund der Health Bar
    backgroundCtx.fillStyle = 'grey';
    backgroundCtx.fillRect(0, 75, 500, 10);

    //gefüllter Teil der Health Bar
    backgroundCtx.fillStyle = 'lightblue';
    backgroundCtx.fillRect(0, 75, sprintTimePercentage, 10);

    backgroundCtx.fillStyle = 'black';
    //Score + Highscore
    backgroundCtx.clearRect(830, 0, 800, 100);
    let highscore = parseInt(getCookie('highscore')) || 0;
    let score = calculateScore();
    backgroundCtx.fillText(`Score: ${score} | Highscore: ${highscore}`, 830, 65);


    //current ammo
    backgroundCtx.clearRect(1200, 750, 500, 100);

    let currentAmmo = inventory.currentWeapon.tempNumberofShots;
    let maxAmmo = inventory.currentWeapon.numberOfShots;
    let ammoText = `${currentAmmo} / ${maxAmmo}`;
    backgroundCtx.fillText(ammoText, 1400, 815);

    //current wave
    backgroundCtx.clearRect(550, 0, 270, 100);
    let currentWave = wave.counter;
    backgroundCtx.fillText(`Welle: ${currentWave}`, 550, 65);

    
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

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    //Die durch ; getrennten Cookies im Cookie String in in Array packen
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        //führende Leerzeichen entfernen
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        //nach gewünschtem Cookie suchen und nur den Wert zurückgeben
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function playAudio(audio){
    if(soundsMuted) return; 
    audio.currentTime = 0;
    audio.play();
}

function switchMusicVolume(screen) {
    let sliderId = (screen === "start") ? 'volume-slider-start' : 'volume-slider';
    let slider = document.getElementById(sliderId);
    let currentValue = slider.value;

    if (currentValue > 0) {
        setCookie('savedVolumeLevel', currentValue, 365);
        slider.value = 0;
    } else {
        let savedVolumeLevel = getCookie('savedVolumeLevel');
        if (savedVolumeLevel !== null) {
            slider.value = savedVolumeLevel;
        } else {
            slider.value = 0.2;
        }
    }

    updateVolume(screen);
}

function startBackgroundMusic() {
    playNextTrack();
    document.removeEventListener('click', startBackgroundMusic);
}

function playNextTrack() {
    var currentTrack = document.getElementById(tracks[currentTrackIndex]);
    currentTrack.volume = volumeLevel;
    currentTrack.play().catch(function(error) {
        console.log("hallo ich war hier")
        document.addEventListener('click', startBackgroundMusic);
    });;

    currentTrack.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        playNextTrack();
    }, { once: true }); //das bedeutet, dass das für dieses Event nur einmal gemacht wird
}

function updateVolume(screen = "game"){
    let sliderId = (screen === "start") ? 'volume-slider-start' : 'volume-slider';
    volumeLevel = document.getElementById(sliderId).value;
    var currentTrack = document.getElementById(tracks[currentTrackIndex]);
    currentTrack.volume = volumeLevel;
    setCookie('lastmusicvolume', volumeLevel, 365);
}

function initialSoundEffectMute(screen){
    let muteIconId = (screen === "start") ? 'mute-icon-start' : 'mute-icon';
    document.getElementById((screen === "start") ? 'volume-slider-start' : "volume-slider").value = getCookie('lastmusicvolume');
    volumeLevel = getCookie('lastmusicvolume');
    if(getCookie('soundsMuted')){
        soundsMuted = true; 
        var muteIcon = document.getElementById(muteIconId);
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
    }else{
        soundsMuted = false; 
    }
}

function muteSoundEffectsSwitch(screen = "game"){
    let muteIconId = (screen === "start") ? 'mute-icon-start' : 'mute-icon';
    var muteIcon = document.getElementById(muteIconId);

    if(!soundsMuted){
        setCookie('soundsMuted', true, 365);
        soundsMuted = true; 
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
    }else if(soundsMuted){
        setCookie('soundsMuted', false, 365);
        soundsMuted = false;
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
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
            meleeAttackAnimation.currentFrame * meleeAttackSheet.width/8,0,
            meleeAttackSheet.width/8, meleeAttackSheet.height,
            -meleeAttackSheet.width/8/2 + 5, -meleeAttackSheet.height/2 + 20,
            meleeAttackSheet.width/8, meleeAttackSheet.height
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

function updateWave(){

    if(wave.isChangeWave){
        wave.counter++;
        if(wave.counter % 2 === 0){
            wave.numberOfEnemiesPerWave++; 
        }

        if(wave.counter % 3 === 0){
            switch(wave.typeIncreaseDifficultyLevel){
                case 0: initEnemyHealth *= 1.05; wave.typeIncreaseDifficultyLevel++; break;
                case 1: enemyDamage *= 1.05; wave.typeIncreaseDifficultyLevel++; break;
                case 2: enemySpeed *= 1.05; wave.typeIncreaseDifficultyLevel = 0; break; 
            }
        }

        if(wave.counter >= 5){
            inventory.rifle.isOwned = true; 
        }

        if(wave.counter >= 10){
            inventory.shotgun.isOwned = true; 
        }

        wave.numberOfEnemiesSpawnedInAWave = 0; 
        wave.isChangeWave = false; 
        activeEnemies = null; 
        activeEnemies = [];
        activeShots = null; 
        activeShots = []; 
    }
}

function spawnEnemy (){

    if(timeAfterLastSpawn > timeBetweenEachSpawn && !wave.isChangeWave && activeEnemies.length < maxActiveEnemies && wave.numberOfEnemiesSpawnedInAWave < wave.numberOfEnemiesPerWave){

        const enemySpawnPointIndex = Math.floor(Math.random() * enemySpawnPoints.length);
        let enemySpawnPoint = enemySpawnPoints[enemySpawnPointIndex];

        // Erstelle ein neues Zombieobjekt mit der Richtung und Position des Spielers
        var enemy = {
            x: enemySpawnPoint.x,
            y: enemySpawnPoint.y,
            dx: 0,
            dy: 0,
            health: initEnemyHealth,
            maxHealth: initEnemyHealth,
            attackRange: 80,
            isOnCooldown: false,
            lastAttack: Date.now(),
            attackCooldown: 2000, //2 Sekunden
            damagePending: false,
            enemyAttackAnimation: {
                currentFrame: 0,
                totalFrames: 2,
                frameDuration: 200,
                lastFrameTime: Date.now(),
                isPlaying: false
            },
            evadeDx: 0,
            evadeDy: 0, 
            evadeTime: 0,
            enemySpawnPointIndex: enemySpawnPointIndex,
            spawnTime: 42,
            attackSound: zombieAttackSound,
        };

        // Füge den Schuss zum Array der aktiven Schüsse hinzu
        activeEnemies.push(enemy);
        wave.numberOfEnemiesSpawnedInAWave++;
        timeAfterLastSpawn = 0; 

    }else if(!wave.isChangeWave && activeEnemies.length === 0 && wave.numberOfEnemiesSpawnedInAWave === wave.numberOfEnemiesPerWave){
        wave.isChangeWave = true; 
    }else{
        timeAfterLastSpawn++;
    }
}

function calculateDistance(enemyX, enemyY, x = 0, y = 0){
    let distance = Math.sqrt(((playerX + player.width/2) - (enemyX + hitboxEnemy.width/2 + x)) ** 2 + ((playerY + player.height/2) - (enemyY + hitboxEnemy.height/2 + y)) ** 2);
    return distance
}

function drawEnemy (){

    for (let j = 0; j < activeEnemies.length; j++) {
        var enemy = activeEnemies[j];
        calculatePositionBetweenEnemyAndPlayer(enemy);
        enemy.dx = Math.cos(angle) * enemySpeed;
        enemy.dy = Math.sin(angle) * enemySpeed; 

        if(enemy.health > 0){

            if(enemy.spawnTime > 0){
            
                switch(enemy.enemySpawnPointIndex){
                    case 0: enemy.x += enemySpeed;break; 
                    case 1: enemy.y += enemySpeed;break;
                    case 2: enemy.y += enemySpeed;break;
                    case 3: enemy.y -= enemySpeed;break;
                    case 4: enemy.y -= enemySpeed;break; 
                }
                enemy.spawnTime--;
            } else {
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
            }            

            var zombieAngle = angle * (180 / Math.PI) - 5;
            ctx.save();
            //Neue (0, 0) Position setzen
            ctx.translate(enemy.x + hitboxEnemy.width / 2, enemy.y + hitboxEnemy.height / 2);
            ctx.rotate(zombieAngle * Math.PI / 180 );
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
                    ctx.restore(); 

            //aktuelle HP berechnen
            var healthPercentage = (enemy.health/enemy.maxHealth) * hitboxEnemy.width;
            //Hintergrund der Health Bar
            ctx.fillStyle = 'gray';
            ctx.fillRect(enemy.x, enemy.y - 10, hitboxEnemy.width, 10);

            //gefüllter Teil der Health Bar
            ctx.fillStyle = 'red';
            ctx.fillRect(enemy.x, enemy.y - 10, healthPercentage, 10);
        }else{
            activeEnemies.splice(j,1);
            slainEnemies++;
            j--;
        }
    }       
}

function attackPlayer(){
    activeEnemies.forEach((enemy)=>{
        if(isPlayerInAttackRange(enemy) && !enemy.isOnCooldown){
            enemy.lastAttack = Date.now();
            enemy.enemyAttackAnimation.isPlaying = true;
            enemy.enemyAttackAnimation.currentFrame = 0;
            enemy.enemyAttackAnimation.lastFrameTime = Date.now();
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
    activeEnemies.forEach((enemy)=>{
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
    activeEnemies.forEach((enemy) => {
        if (!enemy.enemyAttackAnimation.isPlaying) return;

        var now = Date.now();
        if (now - enemy.enemyAttackAnimation.lastFrameTime >= enemy.enemyAttackAnimation.frameDuration) {
            enemy.enemyAttackAnimation.currentFrame++;
            enemy.enemyAttackAnimation.lastFrameTime = now;

            if(enemy.enemyAttackAnimation.currentFrame === 1){
                playAudio(enemy.attackSound);
            }

            if (enemy.enemyAttackAnimation.currentFrame >= enemy.enemyAttackAnimation.totalFrames) {
                enemy.enemyAttackAnimation.currentFrame = 0;
                enemy.enemyAttackAnimation.isPlaying = false;

                activeEnemies.forEach((enemy) => {
                    if (enemy.damagePending) {
                        if(isPlayerInAttackRange(enemy, 30)){
                            inventory.health -= enemyDamage;
                        }
                        enemy.damagePending = false;
                    }
                });
            }
        }
    });
}

function enemyHit (){
    for (let j = 0; j < activeEnemies.length; j++) {
        for (let i = 0; i < activeShots.length; i++) {
            if(hitCheck(activeEnemies[j], activeShots[i])){
                activeEnemies[j].health -= activeShots[i].damage;
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
    
        return (shotRight >= enemyLeft &&
                shotLeft <= enemyRight &&
                shotBottom >= enemyTop &&
                shotTop <= enemyBottom);
    }
    
}

function useKnife() {
    if (!meleeAttackAnimation.isPlaying) {
        meleeAttackAnimation.isPlaying = true;
        meleeAttackAnimation.currentFrame = 0;
        meleeAttackAnimation.lastFrameTime = Date.now();
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

    let angleDifference = Math.abs(enemyAngle - currentPlayerAngle);
    // Winkel über 180 Grad korrigieren (wrap-around)
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
        if(meleeAttackAnimation.currentFrame === 2){
            playAudio(knife.swingSound);
        }
        if(meleeAttackAnimation.currentFrame === 6){
            let enemyHasBeenHit = false;
            activeEnemies.forEach((enemy, index)=>{
                if (isEnemyInMeleeRange(enemy)&&!enemyHasBeenHit) {
                    enemy.health -= enemy.maxHealth;//knife.damage;
                    enemyHasBeenHit = true;
                }
            });
        }

        if (meleeAttackAnimation.currentFrame >= meleeAttackAnimation.totalFrames) {
            meleeAttackAnimation.currentFrame = 0;
            meleeAttackAnimation.isPlaying = false;
        }
    }
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

        if(inventory.currentWeapon.reloadAnimation.currentFrame === 2){
            playAudio(inventory.currentWeapon.reloadSound.firstSound);
        }else if(inventory.currentWeapon === handgun && inventory.currentWeapon.reloadAnimation.currentFrame === 5){
            playAudio(inventory.currentWeapon.reloadSound.secondSound);
        }else if(inventory.currentWeapon === rifle && inventory.currentWeapon.reloadAnimation.currentFrame === 4){
            playAudio(inventory.currentWeapon.reloadSound.secondSound);
        }else if(inventory.currentWeapon === shotgun && inventory.currentWeapon.reloadAnimation.currentFrame === 3){
            playAudio(inventory.currentWeapon.reloadSound.secondSound);
        }

        if(inventory.currentWeapon.reloadAnimation.currentFrame >= inventory.currentWeapon.reloadAnimation.totalFrames){
            inventory.currentWeapon.reloadAnimation.currentFrame = 0;
            inventory.currentWeapon.reloadAnimation.isPlaying = false;
            inventory.currentWeapon.tempNumberofShots = inventory.currentWeapon.numberOfShots;
        }
    }
}


function fireShot() {
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
            playAudio(inventory.currentWeapon.shotSound);

            if(isShotgun)angle +=shotgunSpread;
        }

        inventory.currentWeapon.tempDelayPerShot = 0;
        inventory.currentWeapon.tempNumberofShots -= 1;  
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

function mouseClicked(ev){
    //Wenn geklickt 
    if(inventory.knife.isEquipped){
        useKnife();
    }else{
        fireShot();
    }
}

function mouseMoved(ev){
    if (!gameStarted) return;
    mouseX = ev.clientX - canvas.offsetLeft; 
    mouseY = ev.clientY - canvas.offsetTop;
}

function paceChanger(ev){ //todo
    if(shiftKey && actualSprintTime > 0){
        schrittweite = sprintPace;
        actualSprintTime -= 0.2;
    }else if(!shiftKey){
        schrittweite = normalPace;
        actualSprintTime += actualSprintTime < maxSprintTime ? 0.4 : 0;
        if(actualSprintTime > maxSprintTime){
            actualSprintTime = maxSprintTime;
        }
    }else{
        schrittweite = normalPace;
    }
}

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

    // Highscore anzeigen
    var highscore = parseInt(getCookie('highscore')) || 0;
    document.getElementById('highscore-display-start').innerText = "Highscore: " + highscore;

    // Sounds
    initialSoundEffectMute("start");
    startBackgroundMusic();

    // Start screen
    document.getElementById('mute-sound-effects-start').addEventListener('click', () => muteSoundEffectsSwitch("start"));
    document.getElementById('music-switcher-start').addEventListener('click', () => switchMusicVolume("start"));
    document.getElementById('volume-slider-start').addEventListener('input', () => updateVolume("start"));

    // Game screen
    document.getElementById('mute-sound-effects').addEventListener('click', () => muteSoundEffectsSwitch());
    document.getElementById('music-switcher').addEventListener('click', () => switchMusicVolume());
    document.getElementById('volume-slider').addEventListener('input', () => updateVolume());
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
    // Highscore speichern
    let playerDeathSound = document.getElementById("playerDeathSound");
    playAudio(playerDeathSound)
    var currentHighscore = parseInt(getCookie('highscore')) || 0;
    var score = calculateScore(); // Deine Funktion zur Berechnung des Scores
    if (score > currentHighscore) {
        setCookie('highscore', score, 365); // Highscore für ein Jahr speichern
    }

    document.getElementById('game-container').style.display = 'none';
    document.getElementById('gameover-screen').style.display = 'flex';

    //Score anzeigen
    document.getElementById('score-display').innerText = "Score: " + score;
    //Highscore anzeigen
    document.getElementById('highscore-display-gameover').innerText = "Highscore: " + parseInt(getCookie('highscore'));
    
    gameStarted = false; 
}

function calculateScore(){
    return slainEnemies * 10 + wave.counter * 100 - 100; //Pro Welle 100 Punkte, alle 10 Wellen 400 Punkte
}

function checkPlayerHealth() {
    if (inventory.health <= 0) {
        gameOver();
    }
}