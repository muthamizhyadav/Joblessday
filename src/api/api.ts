import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateJobPostRequest, CreateJobPostResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './models';


export const Appapi = createApi({
    reducerPath: 'Appapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.3daysjob.com/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).app.data?.tokens;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        Register: build.mutation<RegisterResponse, RegisterRequest>({
            query: (registerRequest) => ({
                url: 'v1/jobless',
                method: 'POST',
                body: registerRequest
            }),
        }),

        Login: build.mutation<LoginResponse, LoginRequest>({
            query: (registerRequest) => ({
                url: 'v1/jobless/auth/login',
                method: 'POST',
                body: registerRequest
            }),
        }),

        CreateJobPost: build.mutation<CreateJobPostResponse, CreateJobPostRequest>({
            query: (registerRequest) => ({
                url: 'v1/jobless/post',
                method: 'POST',
                body: registerRequest
            }),
        }),

    }),
});


export const { useRegisterMutation, useLoginMutation, useCreateJobPostMutation } = Appapi 