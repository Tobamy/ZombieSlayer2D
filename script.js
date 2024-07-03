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
        width: 60,
        height: 60,
        calibrationX: 50,
        calibrationY: 23
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
        hitboxShot: {
            width: 0,
            height: 0,
            calibrationX: 0,
            calibrationY: 0
        },
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

    generateMap();

    //Gameloop starten
    setInterval(gameLoop,16); //FPS = 1000/diese Zahl
}

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
    backgroundCtx.font = "45px Roboto";
    backgroundCtx.fillText(parseFloat(inventory.health.toFixed(2)), 20, 60);

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
}

function playNextTrack() {
    var currentTrack = document.getElementById(tracks[currentTrackIndex]);
    currentTrack.volume = volumeLevel;
    currentTrack.play().catch(function(error) {
        document.addEventListener('click', startBackgroundMusic);
    });;

    currentTrack.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        document.removeEventListener('click', startBackgroundMusic);

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
    
    // Berechne den Winkel zwischen der Spielerposition und der Mausposition im Bogenmaß
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

    //todo: Hitbox player anzeigen -> muss wieder weg 
    // ctx.beginPath();
    // ctx.rect(playerX+hitboxPlayer.calibrationX, playerY+hitboxPlayer.calibrationY, hitboxPlayer.width, hitboxPlayer.height);
    // ctx.stroke();
    
    // Winkel in Grad umwandeln
    playerAngle = angle * (180 / Math.PI) - 5;

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
    
                    let potentialMoves = [
                        { x: enemySpeed, y: 0 },
                        { x: -enemySpeed, y: 0 },
                        { x: 0, y: enemySpeed },
                        { x: 0, y: -enemySpeed }
                    ];
    
                    for (let move of potentialMoves) {
                        if (borderCheck(enemy.x + move.x, enemy.y + move.y, hitboxEnemy)) {
                            let distance = calculateDistance(enemy.x + move.x, enemy.y + move.y);
                            arrayDistance.push({ ...move, distance });
                        }
                    }
    
                    let tempDx;
                    let tempDy;
    
                    if (arrayDistance.length > 0) {
                        let bestMove = arrayDistance.reduce((min, move) => move.distance < min.distance ? move : min);
    
                        tempDx = bestMove.x;
                        tempDy = bestMove.y;
                    }
    
                    if(enemy.evadeTime > 0 && borderCheck(enemy.x + enemy.evadeDx, enemy.y + enemy.evadeDy, hitboxEnemy)) {
                        enemy.x += enemy.evadeDx;
                        enemy.y += enemy.evadeDy;
                        enemy.evadeTime--;
                    } else if (tempDx !== undefined && tempDy !== undefined) {
                        enemy.x += tempDx;
                        enemy.y += tempDy;
                        enemy.evadeDx = tempDx;
                        enemy.evadeDy = tempDy;
                        enemy.evadeTime = 90;
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
            if(wave.counter<=9){
                ctx.fillStyle = 'red';
            }else if(wave.counter<=18){
                ctx.fillStyle = 'darkred';
            }else if(wave.counter<=27){
                ctx.fillStyle = 'purple';
            }else {
                ctx.fillStyle = 'gold';
            }
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
                    enemy.health -= enemy.maxHealth;
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

            activeShots.push(shot);
            playAudio(inventory.currentWeapon.shotSound);

            if(isShotgun)angle +=shotgunSpread;
        }

        inventory.currentWeapon.tempDelayPerShot = 0;
        inventory.currentWeapon.tempNumberofShots -= 1;  
    }

}

function drawShots() {
    
    let isFromDrawShot = true; 
    
    calculateDelay(isFromDrawShot);

    for (let i = 0; i < activeShots.length; i++) {
        var shot = activeShots[i];

        if(borderCheck(shot.x, shot.y, inventory.currentWeapon.hitboxShot)){
            ctx.beginPath();
            ctx.arc(shot.x, shot.y, shotRadius, 0, Math.PI * 2);
            shot.x += shot.dx;
            shot.y += shot.dy; 
            ctx.fillStyle = "black";
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

function paceChanger(ev){
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

    init();
}

function gameOver() {
    // Highscore speichern
    let playerDeathSound = document.getElementById("playerDeathSound");
    playAudio(playerDeathSound)
    var currentHighscore = parseInt(getCookie('highscore')) || 0;
    var score = calculateScore();
    if (score > currentHighscore) {
        setCookie('highscore', score, 365);
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