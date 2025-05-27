import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateJobPostRequest,
  CreateJobPostResponse,
  FetchPostRequest,
  fetchSlotResponse,
  JobApplyRequest,
  JobDetailsRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  slotCreationRequest,
  slotCreationResponse,
  updateCandidateBasicProfileRequest,
  updateCandidateBioRequest,
  updateCandidateDetailRequest,
  updateCandidateEducationProfileRequest,
  updateCandidateEmploymentProfileRequest,
  updateCandidateExperienceRequest,
  updateCandidateSkillRequest,
  UpdateJobPostRequest,
} from './models';

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
  endpoints: build => ({
    Register: build.mutation<RegisterResponse, RegisterRequest>({
      query: registerRequest => ({
        url: 'v1/jobless',
        method: 'POST',
        body: registerRequest,
      }),
    }),

    Login: build.mutation<LoginResponse, LoginRequest>({
      query: registerRequest => ({
        url: 'v1/jobless/auth/login',
        method: 'POST',
        body: registerRequest,
      }),
    }),

    CreateJobPost: build.mutation<CreateJobPostResponse, CreateJobPostRequest>({
      query: registerRequest => ({
        url: 'v1/jobless/post',
        method: 'POST',
        body: registerRequest,
      }),
    }),

    createTestForJobPost: build.mutation<any, UpdateJobPostRequest>({
      query: registerRequest => ({
        url: 'v1/jobless/post/' + registerRequest?.id,
        method: 'PUT',
        body: registerRequest?.test,
      }),
    }),

    fetchJobPost: build.mutation<any, FetchPostRequest>({
      query: fetchpost => ({
        url: 'v1/jobless/post/fetch/posts',
        method: 'POST',
        body: fetchpost,
      }),
    }),

    createSlot: build.mutation<slotCreationResponse, slotCreationRequest>({
      query: slotPayload => ({
        url: 'v1/jobless/slot',
        method: 'POST',
        body: slotPayload,
      }),
    }),

    fetchSlots: build.mutation<fetchSlotResponse, any>({
      query: fetchpost => ({
        url: 'v1/jobless/slot/fetch/slots',
        method: 'GET',
      }),
    }),

    updateCandidateProfile: build.mutation<
      any,
      updateCandidateBasicProfileRequest
    >({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData.id,
        method: 'PUT',
        body: fetchData,
      }),
    }),

    updateCandidateProfileEducation: build.mutation<
      any,
      updateCandidateEducationProfileRequest
    >({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData.id,
        method: 'PUT',
        body: fetchData,
      }),
    }),

    updateCandidateProfileEmployment: build.mutation<
      any,
      updateCandidateEmploymentProfileRequest
    >({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData.id,
        method: 'PUT',
        body: fetchData,
      }),
    }),

    FetchActiveJobs: build.mutation<any, any>({
      query: fetchData => ({
        url: 'v1/jobless/post/fetch/current/activejobs',
        method: 'POST',
        body: fetchData,
      }),
    }),

    GetJobDetail: build.mutation<any, JobDetailsRequest>({
      query: fetchData => ({
        url: 'v1/jobless/post/' + fetchData?.id,
        method: 'GET',
      }),
    }),

    ApplicationAction: build.mutation<any, JobApplyRequest>({
      query: fetchData => ({
        url: 'v1/jobless/post/application/status/update/common',
        method: 'POST',
        body: fetchData,
      }),
    }),

    AppliedCandidates: build.mutation<any, any>({
      query: fetchData => ({
        url: 'v1/jobless/post/get/applied/candidates/byrecruiter',
        method: 'POST',
        body: fetchData,
      }),
    }),

    GetCandidateDetail: build.mutation<any, JobDetailsRequest>({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData?.id,
        method: 'GET',
      }),
    }),

    updateCandidateProfileBio: build.mutation<
      any,
      updateCandidateBioRequest
    >({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData.id,
        method: 'PUT',
        body: fetchData,
      }),
    }),

    updateCandidateProfileDetail: build.mutation<
      any,
      any
    >({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData.id,
        method: 'PUT',
        body: fetchData,
      }),
    }),

    updateCandidateSkills: build.mutation<
      any,
      updateCandidateSkillRequest
    >({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData.id,
        method: 'PUT',
        body: fetchData,
      }),
    }),

    updateCandidateExperince: build.mutation<
      any,
      updateCandidateExperienceRequest
    >({
      query: fetchData => ({
        url: 'v1/jobless/' + fetchData.id,
        method: 'PUT',
        body: fetchData,
      }),
    }),

  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateJobPostMutation,
  useCreateTestForJobPostMutation,
  useFetchJobPostMutation,
  useCreateSlotMutation,
  useFetchSlotsMutation,
  useUpdateCandidateProfileMutation,
  useUpdateCandidateProfileEducationMutation,
  useUpdateCandidateProfileEmploymentMutation,
  useFetchActiveJobsMutation,
  useGetJobDetailMutation,
  useApplicationActionMutation,
  useAppliedCandidatesMutation,
  useGetCandidateDetailMutation,
  useUpdateCandidateProfileBioMutation,
  useUpdateCandidateProfileDetailMutation,
  useUpdateCandidateSkillsMutation,
  useUpdateCandidateExperinceMutation
} = Appapi;
