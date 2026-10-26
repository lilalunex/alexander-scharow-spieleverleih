import type { Game } from "./model/game";
import type { Shelf } from "./model/shelf";
import { createSampleShelves } from "./model/sampleData";

const app = document.querySelector<HTMLDivElement>("#app")!;

function renderGameTable(games: readonly Game[]): HTMLTableElement {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr><th>Titel</th><th>Plattform</th><th>USK</th><th>Spieler</th></tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody")!;
  for (const game of games) {
    const players =
      game.minPlayers === game.maxPlayers ? `${game.minPlayers}` : `${game.minPlayers}–${game.maxPlayers}`;

    const row = tbody.insertRow();
    // textContent statt innerHTML, damit Titel aus Eingaben kein HTML einschleusen können
    for (const value of [game.title, game.platform, `${game.ageRating}`, players]) {
      row.insertCell().textContent = value;
    }
  }
  return table;
}

function renderShelf(shelf: Shelf): HTMLElement {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = `${shelf.name} (${shelf.capacity} Plätze, ${shelf.allGames.length} belegt)`;
  section.append(heading, renderGameTable(shelf.allGames));
  return section;
}

app.innerHTML = "<h1>Spieleverleih</h1>";
for (const shelf of createSampleShelves()) {
  app.append(renderShelf(shelf));
}
