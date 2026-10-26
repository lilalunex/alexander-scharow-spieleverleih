export class RentalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationError extends RentalError {}

export class NotFoundError extends RentalError {
  constructor(kind: string, id: string) {
    super(`${kind} mit der ID "${id}" wurde nicht gefunden.`);
  }
}

export class ShelfFullError extends RentalError {
  constructor(shelfName: string, capacity: number) {
    super(`Das Regal "${shelfName}" ist voll (maximal ${capacity} Spiele).`);
  }
}

export class AgeRestrictionError extends RentalError {
  constructor(personName: string, age: number, gameTitle: string, ageRating: number) {
    super(
      `${personName} ist ${age} Jahre alt, "${gameTitle}" ist aber erst ab ${ageRating} Jahren freigegeben.`,
    );
  }
}

export class GameAlreadyRentedError extends RentalError {
  constructor(gameTitle: string) {
    super(`"${gameTitle}" ist bereits ausgeliehen.`);
  }
}

export class GameNotRentedError extends RentalError {
  constructor(gameTitle: string) {
    super(`"${gameTitle}" ist nicht ausgeliehen und kann daher nicht zurückgegeben werden.`);
  }
}
