import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateJobPostRequest, CreateJobPostResponse, FetchPostRequest, fetchSlotResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, slotCreationRequest, slotCreationResponse, UpdateJobPostRequest } from './models';


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

        createTestForJobPost: build.mutation<any, UpdateJobPostRequest>({
            query: (registerRequest) => ({
                url: 'v1/jobless/post/' + registerRequest?.id,
                method: 'PUT',
                body: registerRequest?.test
            }),
        }),

        fetchJobPost: build.mutation<any, FetchPostRequest>({
            query: (fetchpost) => ({
                url: 'v1/jobless/post/fetch/posts',
                method: 'POST',
                body: fetchpost
            }),
        }),

        createSlot: build.mutation<slotCreationResponse, slotCreationRequest>({
            query: (slotPayload) => ({
                url: 'v1/jobless/slot',
                method: 'POST',
                body: slotPayload
            }),
        }),

        fetchSlots: build.mutation<fetchSlotResponse, any>({
            query: (fetchpost) => ({
                url: 'v1/jobless/slot/fetch/slots',
                method: 'GET',
            }),
        }),

    }),
});


export const { useRegisterMutation, useLoginMutation, useCreateJobPostMutation, useCreateTestForJobPostMutation, useFetchJobPostMutation, useCreateSlotMutation, useFetchSlotsMutation } = Appapi 