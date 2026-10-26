import "./style.css";
import { RentalError } from "./model/errors";
import type { Game } from "./model/game";
import type { GameStore } from "./model/gameStore";
import type { Shelf } from "./model/shelf";
import { createSampleStore } from "./model/sampleData";

const store = createSampleStore();

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <h1>Spieleverleih</h1>
  <input id="search" type="search" placeholder="Titel oder Plattform suchen …" />
  <p id="message" role="status"></p>
  <div id="shelves"></div>
`;
const searchInput = app.querySelector<HTMLInputElement>("#search")!;
const message = app.querySelector<HTMLParagraphElement>("#message")!;
const shelvesContainer = app.querySelector<HTMLDivElement>("#shelves")!;

function showMessage(text: string, isError: boolean): void {
  message.textContent = text;
  message.className = isError ? "error" : "success";
}

function formatPlayers(game: Game): string {
  return game.minPlayers === game.maxPlayers ? `${game.minPlayers}` : `${game.minPlayers}–${game.maxPlayers}`;
}

function renderActionCell(cell: HTMLTableCellElement, game: Game, gameStore: GameStore): void {
  const rental = gameStore.rentalFor(game.id);

  if (rental) {
    const returnButton = document.createElement("button");
    returnButton.textContent = "Zurückgeben";
    returnButton.dataset.action = "return";
    returnButton.dataset.gameId = game.id;
    cell.append(returnButton);
    return;
  }

  const personSelect = document.createElement("select");
  for (const person of gameStore.allPeople) {
    personSelect.add(new Option(person.name, person.id));
  }
  const rentButton = document.createElement("button");
  rentButton.textContent = "Ausleihen";
  rentButton.dataset.action = "rent";
  rentButton.dataset.gameId = game.id;
  cell.append(personSelect, rentButton);
}

function renderGameTable(games: readonly Game[], gameStore: GameStore): HTMLTableElement {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr><th>Titel</th><th>Plattform</th><th>USK</th><th>Spieler</th><th>Status</th><th>Aktion</th></tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody")!;
  for (const game of games) {
    const rental = gameStore.rentalFor(game.id);
    const status = rental ? `ausgeliehen an ${rental.person.name}` : "verfügbar";

    const row = tbody.insertRow();
    // textContent statt innerHTML, damit Titel aus Eingaben kein HTML einschleusen können
    for (const value of [game.title, game.platform, `${game.ageRating}`, formatPlayers(game), status]) {
      row.insertCell().textContent = value;
    }
    renderActionCell(row.insertCell(), game, gameStore);
  }
  return table;
}

function renderShelf(shelf: Shelf, visibleGames: readonly Game[], gameStore: GameStore): HTMLElement {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = `${shelf.name} (${shelf.capacity} Plätze, ${shelf.allGames.length} belegt)`;
  section.append(heading, renderGameTable(visibleGames, gameStore));
  return section;
}

function render(): void {
  const matchingGames = new Set(store.search(searchInput.value));
  shelvesContainer.replaceChildren(
    ...store.allShelves.map((shelf) =>
      renderShelf(shelf, shelf.allGames.filter((game) => matchingGames.has(game)), store),
    ),
  );
}

// Ein Listener für alle Buttons (Event Delegation), statt jedem Button einen eigenen zu geben
shelvesContainer.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-action]");
  if (!button) {
    return;
  }
  const gameId = button.dataset.gameId!;

  try {
    if (button.dataset.action === "rent") {
      const personId = button.parentElement!.querySelector("select")!.value;
      const rental = store.rent(gameId, personId);
      showMessage(`"${rental.game.title}" wurde an ${rental.person.name} ausgeliehen.`, false);
    } else {
      const game = store.findGame(gameId);
      store.returnGame(gameId);
      showMessage(`"${game.title}" wurde zurückgegeben.`, false);
    }
    // Nur bei Erfolg neu zeichnen, sonst wird die Auswahl im Dropdown zurückgesetzt
    render();
  } catch (error) {
    // Polymorphie: Jeder fachliche Fehler ist ein RentalError und bringt seine eigene Meldung mit
    if (error instanceof RentalError) {
      showMessage(error.message, true);
    } else {
      throw error;
    }
  }
});

searchInput.addEventListener("input", render);

render();
