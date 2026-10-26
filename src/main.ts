import type { Game } from "./model/game";
import { createSampleGames } from "./model/sampleData";

const app = document.querySelector<HTMLDivElement>("#app")!;

function renderGameTable(games: Game[]): HTMLTableElement {
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

app.innerHTML = "<h1>Spieleverleih</h1>";
app.append(renderGameTable(createSampleGames()));
