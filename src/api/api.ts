import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './models';


export const Appapi = createApi({
    reducerPath: 'Appapi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.3daysjob.com/' }),
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
    }),
});


export const { useRegisterMutation, useLoginMutation } = Appapi 