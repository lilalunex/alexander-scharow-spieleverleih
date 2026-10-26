import { ShelfFullError, ValidationError } from "./errors";
import type { Game } from "./game";

export class Shelf {
  readonly id: string;
  readonly name: string;
  readonly capacity: number;
  // private: Von außen kann niemand direkt Spiele hineinschieben und dabei die Kapazität umgehen
  private readonly games: Game[] = [];

  constructor(name: string, capacity: number) {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      throw new ValidationError("Ein Regal braucht einen Namen.");
    }
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new ValidationError("Die Kapazität eines Regals muss eine ganze Zahl ab 1 sein.");
    }

    this.id = crypto.randomUUID();
    this.name = trimmedName;
    this.capacity = capacity;
  }

  get allGames(): readonly Game[] {
    return this.games;
  }

  get isFull(): boolean {
    return this.games.length >= this.capacity;
  }

  addGame(game: Game): void {
    if (this.isFull) {
      throw new ShelfFullError(this.name, this.capacity);
    }
    this.games.push(game);
  }
}
