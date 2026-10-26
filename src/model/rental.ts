import type { Game } from "./game";
import type { Person } from "./person";

export interface Rental {
  readonly game: Game;
  readonly person: Person;
  readonly rentedAt: Date;
}
