# ZombieSlayer2D

Ein webbasierter, 2D, topdown Shooter mit zufällig generierter Map und einem endlosen Wellenmodus.



## Instructions

| Key | Action |
| --- | ------ |
| W | Run up |
| Arrow Up | Run up |
| A | Run left |
| Arrow Left | Run left |
| S | Run down |
| Arrow Down | Run down |
| D | Run right |
| Arrow Right | Run right |
| Shift | Sprint |
| Left Click | Shoot |
| R | Reload |
| Scroll Up | Previous weapon |
| Scroll Down | Next weapon |
| 1 / 2 / 3 / 4 | Switch to weapon 1 / 2 / 3 / 4 |

## Browser compatibility

| Browser | Status |
| ------- | ------ |
| Chrome | ✅ |
| Firefox | works, but not optimized |
| Other browser | Will probably also work |

## Credits & Licenses of assets

- Source code license: Apache License ([view LICENSE file](https://github.com/Tobamy/ZombieSlayer2D/blob/main/LICENSE))

### Art and Graphics

- **rileygombart** - Assets für den Player Character | [Link](https://opengameart.org/content/animated-top-down-survivor-player) | Lizenz: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
- **rileygombart** - Assets für die Zombies | [Link](https://opengameart.org/content/animated-top-down-zombie) | Lizenz: [CC0](https://creativecommons.org/publicdomain/zero/1.0/)
- **VladPenn** - Pixel Arts für das Inventar | [Link](https://vladpenn.itch.io/weapon) | Commercial use allowed
- **Font Awesome** - Icons | [Link](https://fontawesome.com) | Lizenz: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Christian Robertson** - Roboto Font | [Link](https://fonts.google.com/specimen/Roboto) | Lizenz: [APACHE LICENCE VERSION 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- **Sebastian Thönes** - Hintergrundbilder Startbildschirm, Spiel, GameOver-Screen; Textur der Wände

### Music and Sound

- **SnakeF8** - Sounds für die Shotgun | [Link](https://f8studios.itch.io/snakes-authentic-gun-sounds) | Commercial use allowed
- **SnakeF8** - Sounds für die Handgun und die Rifle | [Link](https://f8studios.itch.io/snakes-second-authentic-gun-sounds-pack) | Commercial use allowed
- **StarNinjas** - Sound das Messer | [Link](https://opengameart.org/content/20-sword-sound-effects-attacks-and-clashes) | Lizenz: [CC0](https://creativecommons.org/publicdomain/zero/1.0/)
- **artisticdude** - Sound für die Zombies | [Link](https://opengameart.org/content/zombies-sound-pack) | Lizenz: [CC0](https://creativecommons.org/publicdomain/zero/1.0/)
- **VOiD1Gaming** - Hintergrundmusik | [Link](https://void1gaming.itch.io/free-action-music-pack) | Lizenz: [Eigene](https://github.com/Tobamy/ZombieSlayer2D/blob/main/assets/Audio/Musik/FREE_Action_Music_Pack_License.pdf) | Commercial use allowed
- **Michel Baradari** - Death Sound des Player Characters | [Link](https://opengameart.org/content/11-male-human-paindeath-sounds) | Lizenz: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)



## Development & Authors

- Developer: Tobias van Heek und Sebastian Thönes

The exact partial contributions can be found in the  [PSP-File](https://github.com/Tobamy/ZombieSlayer2D/blob/main/PSP%20V2%20mit%20Einteilung.png)




<!-- //kommende Features
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
//death Sounds evtl. Quelle: https://opengameart.org/content/11-male-human-paindeath-sounds -->