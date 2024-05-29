# ZombieSlayer2D

Was ist die Aufgabe des Projekts?
Warum ist das Projekt sinnvoll?
Wie können Benutzer am Projekt mitwirken?
Wo erhalten Benutzer Hilfe zu deinem Projekt?
Wer verwaltet das Projekt und trägt dazu bei?

Browser Auswahl 
Lizenzen 










Heading	# H1
## H2
### H3
Bold	**bold text**
Italic	*italicized text*
Blockquote	> blockquote
Ordered List	
1. First item
2. Second item
3. Third item

Unordered List	- First item
- Second item
- Third item

Code	
`code`
Horizontal Rule	
---
Link	[title](#custom-id)
Image	![alt text](assets)


| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

Heading ID
### My Great Heading {#custom-id}

Definition List	

term
: definition

Strikethrough	~~The world is flat.~~
Task List	- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

Emoji
(see also Copying and Pasting Emoji)	That is so funny! :joy:

Highlight	I need to highlight these ==very important words==.

Subscript	H~2~O
Superscript	X^2^

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