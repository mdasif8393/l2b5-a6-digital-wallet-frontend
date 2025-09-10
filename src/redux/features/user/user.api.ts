/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResponse } from "@/components/types";
import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "user/all-users",
        method: "GET",
        params,
      }),

      providesTags: ["USER"],
    }),
    updateUserInfo: builder.mutation<IResponse<null>, any>({
      query: (params) => ({
        url: `/user/update-user/${params.userId}`,
        method: "PATCH",
        data: params.userInfo,
      }),

      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserInfoMutation } = userApi;
