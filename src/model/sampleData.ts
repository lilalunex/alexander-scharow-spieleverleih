import { Game } from "./game";
import { Shelf } from "./shelf";

export function createSampleGames(): Game[] {
  return [
    new Game({ title: "Mario Kart 8", platform: "Switch", ageRating: 0, minPlayers: 1, maxPlayers: 4 }),
    new Game({ title: "The Last of Us", platform: "PlayStation 4", ageRating: 18, minPlayers: 1, maxPlayers: 1 })
  ];
}

export function createSampleShelves(): Shelf[] {
  const consoleShelf = new Shelf("Konsolenspiele", 3);
  const boardGameShelf = new Shelf("Brettspiele", 2);

  for (const game of createSampleGames()) {
    const shelf = game.platform === "Brettspiel" ? boardGameShelf : consoleShelf;
    shelf.addGame(game);
  }

  return [consoleShelf, boardGameShelf];
}
