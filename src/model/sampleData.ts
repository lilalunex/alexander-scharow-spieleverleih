import { Game } from "./game";
import { GameStore } from "./gameStore";
import { Person } from "./person";
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

export function createSamplePeople(): Person[] {
  // Monate zählen in JavaScript ab 0: new Date(2009, 2, 12) ist der 12. März 2009
  return [
    new Person("Anna", new Date(1995, 5, 3)),
    new Person("Max", new Date(2009, 2, 12)),  // minderjährig
    new Person("Lena", new Date(2018, 8, 20)), // minderjährig
  ];
}

export function createSampleStore(): GameStore {
  const store = new GameStore();
  for (const shelf of createSampleShelves()) {
    store.addShelf(shelf);
  }
  for (const person of createSamplePeople()) {
    store.addPerson(person);
  }
  return store;
}
