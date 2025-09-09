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
  }),
});

export const { useGetUsersQuery } = userApi;
