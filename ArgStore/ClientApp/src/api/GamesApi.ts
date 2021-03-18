import { Game } from "../models/ApiModel";
import checkResponse from "./CheckResponse";

const API_URL = "/Games";

export const getGames = async (): Promise<Game[]> => {
    const response = await fetch(API_URL);
    await checkResponse(response, "getGames");
    return (await response.json()) as Game[];
};

export const getGame = async (id: number): Promise<Game> => {
    const gameApiUrl = `${API_URL}/${id}`;
    const response = await fetch(gameApiUrl);
    await checkResponse(response, "getGame");
    return (await response.json()) as Game;
};

export const updateGame = async (game: Game) => {
    const response = await fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify(game),
    });
    await checkResponse(response, "updateGame");
    return response;
};

export const insertGame = async (game: Game) => {
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(game),
    });
    await checkResponse(response, "insertGame");
    return response;
};

export const deleteGame = async (id: number) => {
    const gameApiUrl = `${API_URL}/${id}`;
    const response = await fetch(gameApiUrl, {
        method: "DELETE",
    });
    await checkResponse(response, "deleteGame");
    return response;
};
