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
    stepper: any;
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

export interface updateCandidateBasicProfileRequest {
    id: string;
    stepper: number;
    fullName: string;
    contact: string;
    DOB: string;
    gender: string;
    employmentType: string;
    address: string;
    headline: String,
    state: String,
    city: String
}
export interface updateCandidateEducationProfileRequest {
    id: string;
    stepper: number;
    educationDetails: any[]
}

export interface updateCandidateBioRequest {
    id: string;
    bio: string;
}

export interface updateCandidateEmploymentProfileRequest {
    id: string;
    stepper: number;
    headline: string;
    state: string;
    city: string;
    gst: string;
    employeeCount: string;
    recruiterName: string;
    industry?: string;
    companysiteURL?: string;
    companyName: string;
}

export interface JobDetailsRequest {
    id: string;
}

export interface JobApplyRequest {
    jobId: string;
    recruiterId: string;
    candidateId: string;
    status: string;
    date?: string;
    time?: string;
}

export interface updateCandidateDetailRequest {
    id: string;
    name: string;
    contact: string;
    state: string;
    city: string;
    headline: string

}

export interface updateCandidateSkillRequest {
    id: string;
    educationDetails?: any
    expertise?: any
}

export interface updateCandidateExperienceRequest {
    id: string;
    employmentDetails: any
}

export interface UpdatePostRequest {
    id: string;
    data: any
}