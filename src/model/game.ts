import { ValidationError } from "./errors";

// mit einem Union Type geben wir vor, welche Wert erlaubt sind
export const PLATFORMS = ["Switch", "Switch 2", "PlayStation 4", "PlayStation 5", "Brettspiel", "PC"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const AGE_RATINGS = [0, 6, 12, 16, 18] as const;
export type AgeRating = (typeof AGE_RATINGS)[number];

export interface GameData {
  title: string;
  platform: Platform;
  ageRating: AgeRating;
  minPlayers: number;
  maxPlayers: number;
}

export class Game {
  readonly id: string;
  readonly title: string;
  readonly platform: Platform;
  readonly ageRating: AgeRating;
  readonly minPlayers: number;
  readonly maxPlayers: number;

  constructor(data: GameData) {
    const title = data.title.trim();
    if (title === "") {
      throw new ValidationError("Ein Spiel braucht einen Titel.");
    }
    if (!PLATFORMS.includes(data.platform)) {
      throw new ValidationError(`Unbekannte Plattform "${data.platform}".`);
    }
    if (!AGE_RATINGS.includes(data.ageRating)) {
      throw new ValidationError(
        `Ungültige USK-Freigabe "${data.ageRating}". Erlaubt: ${AGE_RATINGS.join(", ")}.`,
      );
    }
    if (!Number.isInteger(data.minPlayers) || data.minPlayers < 1) {
      throw new ValidationError("Die minimale Spieleranzahl muss eine ganze Zahl ab 1 sein.");
    }
    if (!Number.isInteger(data.maxPlayers) || data.maxPlayers < data.minPlayers) {
      throw new ValidationError(
        "Die maximale Spieleranzahl muss eine ganze Zahl und mindestens so groß wie die minimale sein.",
      );
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.platform = data.platform;
    this.ageRating = data.ageRating;
    this.minPlayers = data.minPlayers;
    this.maxPlayers = data.maxPlayers;
  }

  supportsPlayerCount(count: number): boolean {
    return count >= this.minPlayers && count <= this.maxPlayers;
  }
}
