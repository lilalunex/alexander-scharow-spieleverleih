import { Game } from "./game";

export function createSampleGames(): Game[] {
  return [
    new Game({ title: "Mario Kart 8", platform: "Switch", ageRating: 0, minPlayers: 1, maxPlayers: 4 }),
    new Game({ title: "The Last of Us", platform: "PlayStation 4", ageRating: 18, minPlayers: 1, maxPlayers: 1 }),
  ];
}
