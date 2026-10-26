# alexander-scharow-spieleverleih

![Mittwald Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK7mNLZq5Ex405t-zl9VOLvYYpzvMwku6r8KjWCGno&s)

## Wie starte ich das Programm?

```
git clone https://github.com/lilalunex/alexander-scharow-spieleverleih.git
cd alexander-scharow-spieleverleih
npm install
npm run dev
```

URL im browser öffnen.

## Was habe ich umgesetzt

> **Kurzfassung:** Ein Spieleverleih im Browser: Spiele stehen in Regalen mit begrenzter Kapazität, lassen sich nach Titel oder Plattform durchsuchen, an Personen ausleihen und wieder zurückgeben. Beim Ausleihen wird die USK-Freigabe gegen das Geburtsdatum der Person geprüft. Fehler (zu jung, schon ausgeliehen, nicht ausgeliehen, Regal voll, ungültige Eingaben) werden als verständliche Meldung angezeigt.

Ich habe mir die Aufgabe genau durchgelesen. Erst mal ein Plan machen bevor man drauf lostippt. Dabei fallen mir schon vorher Umstände auf wie: Polymorphie, Datenbank-Beziehungen (1:n, n:m), Werte atomar speichern.

Geplant war zuerst eine Konsolen-Version und danach eine Browser-Version. In der Konsole hätte ich aber nur Tastatureingaben abgefragt und zeit verbracht, in der Konsole etwas ansichtlich zu stylen. Deshalb habe ich direkt mit der Browser-Version angefangen. Als Webentwickler fühle ich mich da zu Hause. Und der Browser ist wahrscheinlich das Dashboard, was man am Ende benutzen wird. Passt daher also.

Entwicklungsumgebung aufgesetzt: Vite, TypeScript, Vitest.

Eine Anleitung geschrieben, wie man das Programm auf dem eigenen Rechner startet. Die Anleitung habe ich in einem separaten Verzeichnis getestet. Solche Verzeichnisse nenne ich "del*", damit ich weiß, dass ich sie gefahrlos löschen kann.

## Welche Entscheidungen habe ich getroffen, und warum?

Features, die mir für "Was würde ich als Nächstes machen?" eingefallen sind, habe ich direkt notiert im nachfolgenden Abschnitt.

Ich habe mich für ein Web-Development-Setup entschieden. Hier fühle ich mich zu Hause, und es passt zum Einsatzzweck: Das Programm wird in der Praxis wahrscheinlich über den Browser bedient.

Nebenbei läuft Claude Code im Projektverzeichnis. Ich nutze es als Unterstützung bei der Umsetzung und stelle Fragen. Zum Beispiel kenne ich Polymorphie, aber wenn das Wissen eher schwammig im Hinterkopf ist oder ich mir nicht 100 % sicher bin, prüfe ich es dort nach oder lasse mir helfen.

Ich lasse Claude Code Dateien und Code generieren, prüfe aber jede Datei, ob sie so ist, wie ich sie haben will. Die Konzepte, die in diesem Projekt vorkommen, kenne ich. Ich sollte also jeden Code, den ich hier finde, verstehen oder schon einmal gesehen haben.

Mir ist wichtig, alles sauber Schritt für Schritt zu machen, zu verstehen, was passiert, und sicherzustellen, dass alles sauber funktioniert. Wenn schon das Setup fummelig ist und man später bei jedem Schritt eine Warnung oder Fehlermeldung sieht, ist das einfach nervig.

Die Spieleranzahl speichere ich nicht als Text "1-4", sondern als zwei Werte: minPlayers und maxPlayers. Aus Erfahrung halte ich Werte atomar. Damit lässt sich leichter filtern und rechnen, und in einer Datenbank verlangt schon die erste Normalform atomare Werte.

Ich committe Dateien gesondert, um die Commits sauber zu halten. Wenn also plötzlich eine große Datei auf einmal gepusht wird, heißt das nicht, dass sie gerade erst generiert wurde, sondern dass sie vorher noch nicht reif für einen Commit war.

Für die Fehlerfälle im Konstruktor von game.ts nutze ich Guard Clauses: ein if nach dem anderen, das direkt den Fehler wirft. Das ist übersichtlicher als verschachtelte if-else-Blöcke, weil der Code flach bleibt.

In person.ts gab es zuerst eine Funktion ageOn, die das Alter berechnet (üblicher Ansatz: Jahre abziehen, minus eins, wenn der Geburtstag noch nicht war). Ich habe mich stattdessen für isOldEnoughFor entschieden: Sie rechnet aus, ab wann die Person alt genug ist, und vergleicht das mit heute. Das beantwortet direkt die Frage aus der Aufgabe und ist kürzer.

## Was würde ich als nächstes machen?

Eine Historie einbauen, damit man nachverfolgen kann, wer welches Spiel wann ausgeliehen hat. Diese Einträge müssen nach den Datenschutzregeln (DSGVO) wieder gelöscht werden, sobald sie nicht mehr gebraucht werden. Welche Aufbewahrungsfristen genau gelten, müsste ich noch klären. Für mich ein wichtiges Feature für diese Art Programm.

Formulare, um neue Spiele, Regale und Personen über die Oberfläche anzulegen. Im Moment kommen sie aus den Beispieldaten.

Ein Kunde darf nur eine begrenzte Anzahl an Spielen gleichzeitig ausleihen. So kenne ich das aus der Bibliothek, und man verhindert, dass eine Person alles ausleiht, bevor der Fall überhaupt auftritt. Passend zum Spieleverleih: ein Level-System. Wer ein guter Kunde ist, steigt im Level auf und darf mehr ausleihen.

Testfälle schreiben, die auch die willkürlichsten Fälle abdecken: Die Eingabe ist "Apfel", eine negative Zahl, eine sehr hohe Zahl usw. So kenne ich das Verhalten meines Programms, weiß, wie ich es erweitern kann, und bin gegen Angriffe gewappnet (ich weiß, eher ein Spezialfall).