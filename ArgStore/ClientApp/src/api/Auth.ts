import { AuthInfo, LoginForm, RegisterForm } from "../models/ApiModel";
import checkResponse from "./CheckResponse";

const API_URL = "/api/Account/";

export const signup = async (register: RegisterForm) => {
    const response = await fetch(API_URL + "Register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(register),
    });
    await checkResponse(response, "signup");
    return response;
};

export const signin = async (register: LoginForm) => {
    const response = await fetch(API_URL + "Login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(register),
    });
    await checkResponse(response, "signin");
    return response;
};

export const signout = async () => {
    const response = await fetch(API_URL + "LogOut", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
    });
    await checkResponse(response, "signout");
    return response;
};

export const isAuth = async () => {
    const response = await fetch(API_URL + "isAuthenticated", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
    });
    await checkResponse(response, "isAuth");
    return (await response.json()) as AuthInfo;
};