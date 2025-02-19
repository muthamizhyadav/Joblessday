export interface RegisterRequest {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
}

export interface RegisterResponse {
    _id: string,
    name: string,
    email: string,
    updatedAt: string,
    createdAt: string
}

export interface LoginRequest {
    email: string,
    password: string,
}

interface User {
    isEmailVerified: boolean;
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface Token {
    token: string;
    expires: string;
}

interface Tokens {
    access: Token;
    refresh: Token;
}


export interface LoginResponse {
    user: User;
    tokens: Tokens;
}