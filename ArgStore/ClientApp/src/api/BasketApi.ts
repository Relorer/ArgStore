import { Game, User } from "../models/ApiModel";
import checkResponse from "./CheckResponse";

const API_URL = "/api/basket";

export const addGameToBasket = async (game: Game): Promise<User> => {
    const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    });
    await checkResponse(response, "addGameToBasket");
    return (await response.json()) as User;
};