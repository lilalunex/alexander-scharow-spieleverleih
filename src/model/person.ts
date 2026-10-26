import { ValidationError } from "./errors";

export class Person {
  readonly id: string;
  readonly name: string;
  readonly birthDate: Date;

  constructor(name: string, birthDate: Date) {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      throw new ValidationError("Eine Person braucht einen Namen.");
    }
    if (Number.isNaN(birthDate.getTime())) {
      throw new ValidationError("Das Geburtsdatum ist ungültig.");
    }
    if (birthDate > new Date()) {
      throw new ValidationError("Das Geburtsdatum darf nicht in der Zukunft liegen.");
    }

    this.id = crypto.randomUUID();
    this.name = trimmedName;
    this.birthDate = birthDate;
  }

  isOldEnoughFor(ageRating: number, date: Date = new Date()): boolean {
    const birthdayForRating = new Date(this.birthDate);
    birthdayForRating.setFullYear(this.birthDate.getFullYear() + ageRating);
    return date >= birthdayForRating;
  }
}
