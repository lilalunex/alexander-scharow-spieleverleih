# alexander-scharow-spieleverleih

![Mittwald Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK7mNLZq5Ex405t-zl9VOLvYYpzvMwku6r8KjWCGno&s)

## Wie starte ich das Programm?

```
git clone https://github.com/lilalunex/alexander-scharow-spieleverleih.git
cd alexander-scharow-spieleverleih
npm install
npm run dev
```

## Was habe ich umgesetzt

Ich hab mir die Aufgabe genau durchgelesen. Dabei schon mitgedacht. Polymorphie, Datenbank Beziehungen (wie 1:n, n:m Beziehungen oder Werte atomar zu speichern).

Ich hatte geplant zu erst eine Console Version zu machen und dann eine Browser Version. Bevor ich hier aber jetzt nur auf key presses abfrage und in der Konsole alles so ... unschön aussehen wird, entscheid ich mich doch dafür zu erst die Browser Version zu machen. Als Web Dev fühl ich mich da Zuhause.

Ich lass es sein, jedes Mal die README so sorgfältig zu committen. Das raubt zu viel Zeit. Aus der Arbeitswelt kenne ich auch immer nur die commit message "Update Readme".

Meine Dev Environment installiert: Vite, TypeScript, Vitest.

In der Anleitung geschrieben wie man das Programm auf seiner Maschine ausführen kann. Die Anleitung selbst in einem separaten Verzeichnis getestet. Die nenn ich gern "del*" damit ich weiß, dass ist etwas, was ich sicher löschen kann.

## Welche Entscheidungen habe ich getroffen, und warum?

Features die mir zu "was als nächstes" einfielen, direkt notiert.

## Was würde ich als nächstes machen?

Eine Historie einbauen. Damit man nachverfolgen kann, an wen, welches Spiel, wann ausgeliehen wurde. Und diese Einträge nach (ich glaube 10 Jahren?) Datenschutz Richtlinien löschen. Für mich ein wichtiges Feature für diese Art Programm.

Ein Kunde kann nur eine begrenzte Anzahl an Spielen ausleihen. So kenn ich das von einer Bibliothek und man verhindert, dass einer alles ausleiht. Kann den Fall also verhindern, bevor er auftritt. Passend zum Spieleverleih: Ein Level System. Wenn jemand ein guter Kunde ist, steigt er level auf und darf mehr und mehr ausleihen.

Testfälle schreiben. Und hier auch die willkürlichsteen Fälle abdecken: Eingabe ist Apfel, eine negative Zahl, eine sehr hohe Zahl, etc. Um das Verhalten von meinem Programm zu kennen und daher zu wissen, wie ich es erweitern kann. Und um hier vor Hackern gewappnet zu sein (ich weiß, super special case).