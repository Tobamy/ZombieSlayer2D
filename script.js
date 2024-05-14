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
    //auch Nachladen
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
//Bug: 
    //Diagonal läuft man schneller
//todo Credits (u.a. Bilder vom Player)

//Globale Variablen
    //#region Variablen
    var canvas, ctx; 

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
    var hitboxHandgunShot = {
        width: 3,
        height: 3,
        calibrationX: 0,
        calibrationY: 0
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
            height: 3
        },
        damage: 20
    }; 
    var shotgun = {
        shotspeed: 20, 
        initWeaponOffset: {
            x: 65, 
            y: 24
        },
        hitboxShot: {
            width: 3,
            height: 3
        },
        damage: 17
    }
    var rifle = {
        shotspeed: 20, 
        initWeaponOffset: {
            x: 65, 
            y: 24
        },
        hitboxShot: {
            width: 3,
            height: 3
        },
        damage: 30
    }
    var knife= {
        damage: 100,
        range: 100
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

    //Gegner
    var enemySpeed = 2;
    var activeEnemys = [];
    var zombieWalk;

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
    var shotSpeed = 20; //default auf 20
    activeShots = [];
    var shotRadius = hitboxHandgunShot.width; 
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
        health: 100
    }
    var scrollDown;
    var scrollUp;

    //map 
    const tileW = 50; 
    const tileH = 50; 

    const gridRows = 15; 
    const gridCols = 28;

    var activeWalls = []; 

    var map = [
        [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]

//#endregion


function init() {
    //Setup
    canvas = document.getElementById("myCanvas");
    canvas.style.border="red 3px solid";
    ctx = canvas.getContext("2d");

    //Bilder
    background = document.getElementById("imgBackground");
    imgWall = document.getElementById("imgWall");

    //player
    player = document.getElementById("handgun");
    //playerX -= player.width/2;
    //playerY -= player.height/2;

    feet = document.getElementById("feet");

    zombieWalk = document.getElementById("zombieWalk");

    //Gameloop starten
    setInterval(gameLoop,16); //FPS = 1000/diese Zahl
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
}

function draw() {
    // Hintergrund
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawWorld();
    drawMap();

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
    if(isMoving()){
        ctx.drawImage(
            feet, Math.floor(frame % 6)*feet.width / 6, 0,
            feet.width / 6, feet.height, 
            -feet.width/6/2 - 25, -feet.height/2 + 8, 
            feet.width / 6, feet.height 
        );
    }
    
    ctx.drawImage(player, -player.width / 2, -player.height / 2, player.width, player.height);

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
        maxHealth: 100
    };

    // Füge den Schuss zum Array der aktiven Schüsse hinzu
    activeEnemys.push(enemy);
    //console.log(activeEnemys);
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

            var zombieAngle = angle * (180 / Math.PI) - 5;
            ctx.save();
            //Neue (0, 0) Position setzen
            ctx.translate(enemy.x + hitboxEnemy.width / 2, enemy.y + hitboxEnemy.height / 2);
            ctx.rotate(zombieAngle * Math.PI / 180 );
            /*if(isMoving()){*/  //evtl. später was einbauen, dass der sich nicht im Stillstand bewegt. Momentan läuft er aber immer, also passt das erstmal so.
                ctx.drawImage(
                    zombieWalk, Math.floor(frame % 9)*zombieWalk.width / 9, 0,
                    zombieWalk.width / 9, zombieWalk.height, 
                    -zombieWalk.width/9/2 , -zombieWalk.height/2, 
                    zombieWalk.width / 9, zombieWalk.height 
                );
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

function enemyHit (){
    for (let j = 0; j < activeEnemys.length; j++) {
        for (let i = 0; i < activeShots.length; i++) {
            if(hitCheck(activeEnemys[j], activeShots[i])){
                activeEnemys[j].health -= activeShots[i].damage;
                activeShots.splice(i, 1);
                i--;
                //console.log(activeShots[i]);
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

function fireShot() {
    if(!inventory.knife.isEquipped){
        calculatePositioningBetweenMouseAndWeapon();

        // Berechne die Startposition des Schusses unter Berücksichtigung der Waffenverschiebung
        var shotStartPositionX = playerX + weaponOffsetX + player.width / 2;
        var shotStartPositionY = playerY + weaponOffsetY + player.height / 2;
        
        let i; 
        let shotgunSpread = 0.13; 

        if(inventory.shotgun.isEquipped){
            i = 0; 
            var isShotgun = true;
            angle -=shotgunSpread;
        }else{
            i = 2
        };

        for(i; i < 3; i++){

            // Erstelle ein neues Schussobjekt mit der Richtung und Position des Spielers
            var shot = {
                x: shotStartPositionX,
                y: shotStartPositionY,
                dx: Math.cos(angle) * shotSpeed, // Geschwindigkeit des Schusses in x-Richtung
                dy: Math.sin(angle) * shotSpeed, // Geschwindigkeit des Schusses in y-Richtung
                damage: (inventory.currentWeapon).damage
            };

            //shot.damage = (inventory.currentWeapon).damage;
            //console.log(shot.damage);
            // Füge den Schuss zum Array der aktiven Schüsse hinzu
            activeShots.push(shot);

            if(isShotgun)angle +=shotgunSpread;
        }
    }
}

function drawShots() {
    // Gehe durch alle aktiven Schüsse und zeichne sie
    
    for (let i = 0; i < activeShots.length; i++) {
        var shot = activeShots[i];

        if(borderCheck(shot.x, shot.y, hitboxHandgunShot)){
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
    
}

function weaponSwitcher(ev){;
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
    //console.log((inventory.currentWeapon).hitboxShot.width);
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
}

function mouseMoved(ev){
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
            playerX += schrittweite;
            playerY += schrittweite;
            feetX += schrittweite;
            feetY += schrittweite;
        }
    }
    if (downKey && leftKey && !upKey && !rightKey) {
        if (borderCheck(playerX - schrittweite, playerY + schrittweite, hitboxPlayer)) {
            playerX -= schrittweite;
            playerY += schrittweite;
            feetX -= schrittweite;
            feetY += schrittweite;
        }
    }
    if (upKey && rightKey && !downKey && !leftKey) {
        if (borderCheck(playerX + schrittweite, playerY - schrittweite, hitboxPlayer)) {
            playerX += schrittweite;
            playerY -= schrittweite;
            feetX += schrittweite;
            feetY -= schrittweite;
        }
    }
    if (upKey && leftKey && !rightKey && !downKey) {
        if (borderCheck(playerX - schrittweite, playerY - schrittweite, hitboxPlayer)) {
            playerX -= schrittweite;
            playerY -= schrittweite;
            feetX -= schrittweite;
            feetY -= schrittweite;
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
document.addEventListener("wheel", weaponSwitcher);
document.addEventListener("mousemove", mouseMoved);
document.addEventListener("mousedown", mouseClicked);
document.addEventListener("DOMContentLoaded", init, false);