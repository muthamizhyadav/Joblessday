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

export interface LoginResponse {
    user: User;
    tokens: string;
}

export interface CreateJobPostRequest {
    industry: string,
    role: string,
    department: string,
    designation: string,
    salaryfrom: number,
    salaryto: number,
    worklocation: number
    step?: number
}


export interface CreateJobPostResponse {
    industry: string,
    role: string,
    department: string,
    designation: string,
    salaryfrom: number,
    salaryto: number,
    worklocation: number,
    test: any[],
    step?: number,
    userId?: string,
    createdAt: string
    _id: string
}


export interface UpdateJobPostRequest {
    test: any[],
    id: string,
}


export interface FetchPostRequest {
    pageNo: number,
    pageSize: number,
}

export interface slotCreationRequest {
    postId: string,
    endTime: string,
    startTime: string,
    date: string,
}


export interface slotCreationResponse {
    postId: string,
    endTime: string,
    startTime: string,
    date: string,
    userId: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}


export interface Post {
    _id: string;
    step: number;
    test: any[];
    industry: string;
    role: string;
    department: string;
    designation: string;
    salaryfrom: number;
    salaryto: number;
    worklocation: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
}

export interface fetchSlotResponse {
    _id: string;
    postId: string;
    date: string;
    startTime: string;
    endTime: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    post: Post;

}