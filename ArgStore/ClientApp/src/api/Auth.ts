import { AuthInfo, LoginForm, RegisterForm } from "../models/ApiModel";
import checkResponse from "./CheckResponse";

const API_URL = "/api/";

export const signup = async (register: RegisterForm) => {
    const response = await fetch(API_URL + "signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
    });
    await checkResponse(response, "signup");
    return response;
};

export const signin = async (register: LoginForm) => {
    const response = await fetch(API_URL + "signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
    });
    await checkResponse(response, "signin");
    return response;
};

export const signout = async () => {
    const response = await fetch(API_URL + "signout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    await checkResponse(response, "signout");
    return response;
};

export const getAuthInfo = async () => {
    const response = await fetch(API_URL + "authinfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    await checkResponse(response, "isAuth");
    return (await response.json()) as AuthInfo;
};
