import {
    AuthInfo,
    SigninForm as SigninForm,
    SignupForm,
} from "../models/ApiModel";
import checkResponse from "./CheckResponse";

const API_URL = "/api/";

export const signup = async (signupForm: SignupForm) => {
    const response = await fetch(API_URL + "signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
    });
    await checkResponse(response, "signup");
    return response;
};

export const signin = async (signinForm: SigninForm) => {
    const response = await fetch(API_URL + "signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signinForm),
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
    await checkResponse(response, "getAuthInfo");
    return (await response.json()) as AuthInfo;
};
