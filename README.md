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

Ich habe mir die Aufgabe genau durchgelesen und dabei schon mitgedacht: Polymorphie, Datenbank-Beziehungen (1:n, n:m) und Werte atomar speichern.

Geplant war zuerst eine Konsolen-Version und danach eine Browser-Version. In der Konsole hätte ich aber nur Tastatureingaben abgefragt, und alles hätte eher unschön ausgesehen. Deshalb habe ich direkt mit der Browser-Version angefangen. Als Webentwickler fühle ich mich da zu Hause.

Die README committe ich nicht jedes Mal sorgfältig einzeln, das kostet zu viel Zeit (Klassiker). Aus der Arbeitswelt kenne ich dafür auch meist nur die Commit-Message "Update README".

Entwicklungsumgebung aufgesetzt: Vite, TypeScript, Vitest.

Eine Anleitung geschrieben, wie man das Programm auf dem eigenen Rechner startet. Die Anleitung habe ich in einem separaten Verzeichnis getestet. Solche Verzeichnisse nenne ich "del*", damit ich weiß, dass ich sie gefahrlos löschen kann.

## Welche Entscheidungen habe ich getroffen, und warum?

Features, die mir für "Was würde ich als Nächstes machen?" eingefallen sind, habe ich direkt notiert.

Ich habe mich für ein Web-Development-Setup entschieden. Hier fühle ich mich zu Hause, und es passt zum Einsatzzweck: Das Programm wird in der Praxis wahrscheinlich über den Browser bedient.

Nebenbei läuft Claude Code im Projektverzeichnis. Ich nutze es als Unterstützung bei der Umsetzung und stelle Fragen. Zum Beispiel kenne ich Polymorphie, aber wenn das Wissen eher schwammig im Hinterkopf ist oder ich mir nicht 100 % sicher bin, prüfe ich es dort nach oder lasse mir helfen.

Ich lasse Claude Code Dateien und Code generieren, prüfe aber jede Datei, ob sie so ist, wie ich sie haben will. Die Konzepte, die in diesem Projekt vorkommen, kenne ich. Ich sollte also jeden Code, den ich hier finde, verstehen oder schon einmal gesehen haben.

Mir ist wichtig, alles sauber Schritt für Schritt zu machen, zu verstehen, was passiert, und sicherzustellen, dass alles sauber funktioniert. Wenn schon das Setup fummelig ist und man später bei jedem Schritt eine Warnung oder Fehlermeldung sieht, ist das einfach nervig.

Die Spieleranzahl speichere ich nicht als Text "1-4", sondern als zwei Werte: minPlayers und maxPlayers. Aus Erfahrung halte ich Werte atomar. Damit lässt sich leichter filtern und rechnen, und in einer Datenbank verlangt schon die erste Normalform atomare Werte.

Ich committe Dateien gesondert, um die Commits sauber zu halten. Wenn also plötzlich eine große Datei auf einmal gepusht wird, heißt das nicht, dass sie gerade erst generiert wurde, sondern dass sie vorher noch nicht reif für einen Commit war.

Für die Fehler Cases für den constructor in game.ts nutze ich guard clauses. Ein if nach dem anderen, was direkt den Fehler wirft. Das ist schöner Programmierstil weil er übersichtlicher ist, als viel geschachtelte if else Syntax.

## Was würde ich als nächstes machen?

Eine Historie einbauen, damit man nachverfolgen kann, wer welches Spiel wann ausgeliehen hat. Diese Einträge müssen nach den Datenschutzregeln (DSGVO) wieder gelöscht werden, sobald sie nicht mehr gebraucht werden. Welche Aufbewahrungsfristen genau gelten, müsste ich noch klären. Für mich ein wichtiges Feature für diese Art Programm.

Ein Kunde darf nur eine begrenzte Anzahl an Spielen gleichzeitig ausleihen. So kenne ich das aus der Bibliothek, und man verhindert, dass eine Person alles ausleiht, bevor der Fall überhaupt auftritt. Passend zum Spieleverleih: ein Level-System. Wer ein guter Kunde ist, steigt im Level auf und darf mehr ausleihen.

Testfälle schreiben, die auch die willkürlichsten Fälle abdecken: Die Eingabe ist "Apfel", eine negative Zahl, eine sehr hohe Zahl usw. So kenne ich das Verhalten meines Programms, weiß, wie ich es erweitern kann, und bin gegen Angriffe gewappnet (ich weiß, eher ein Spezialfall).
