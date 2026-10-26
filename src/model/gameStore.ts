import { AgeRestrictionError, GameAlreadyRentedError, GameNotRentedError, NotFoundError } from "./errors";
import type { Game } from "./game";
import type { Person } from "./person";
import type { Rental } from "./rental";
import type { Shelf } from "./shelf";

export class GameStore {
  private readonly shelves: Shelf[] = [];
  private readonly people: Person[] = [];
  // Nur laufende Ausleihen. Nach der Rückgabe wird der Eintrag entfernt (Historie wäre ein nächster Schritt).
  private readonly rentals: Rental[] = [];

  get allShelves(): readonly Shelf[] {
    return this.shelves;
  }

  get allPeople(): readonly Person[] {
    return this.people;
  }

  addShelf(shelf: Shelf): void {
    this.shelves.push(shelf);
  }

  addPerson(person: Person): void {
    this.people.push(person);
  }

  findGame(gameId: string): Game {
    for (const shelf of this.shelves) {
      const game = shelf.allGames.find((g) => g.id === gameId);
      if (game) {
        return game;
      }
    }
    throw new NotFoundError("Spiel", gameId);
  }

  findPerson(personId: string): Person {
    const person = this.people.find((p) => p.id === personId);
    if (!person) {
      throw new NotFoundError("Person", personId);
    }
    return person;
  }

  rentalFor(gameId: string): Rental | undefined {
    return this.rentals.find((rental) => rental.game.id === gameId);
  }

  search(query: string): Game[] {
    const normalizedQuery = query.trim().toLowerCase();
    return this.shelves
      .flatMap((shelf) => shelf.allGames)
      .filter(
        (game) =>
          game.title.toLowerCase().includes(normalizedQuery) ||
          game.platform.toLowerCase().includes(normalizedQuery),
      );
  }

  rent(gameId: string, personId: string, date: Date = new Date()): Rental {
    const game = this.findGame(gameId);
    const person = this.findPerson(personId);

    if (this.rentalFor(gameId)) {
      throw new GameAlreadyRentedError(game.title);
    }
    if (!person.isOldEnoughFor(game.ageRating, date)) {
      throw new AgeRestrictionError(person.name, game.title, game.ageRating);
    }

    const rental: Rental = { game, person, rentedAt: date };
    this.rentals.push(rental);
    return rental;
  }

  returnGame(gameId: string): void {
    const game = this.findGame(gameId);
    const index = this.rentals.findIndex((rental) => rental.game.id === gameId);
    if (index === -1) {
      throw new GameNotRentedError(game.title);
    }
    this.rentals.splice(index, 1);
  }
}
