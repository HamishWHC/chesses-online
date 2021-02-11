import {Game, Normal} from "./base";

export const gameModes: Record<string, (new () => Game) | undefined> = {
    NORMAL: Normal
}