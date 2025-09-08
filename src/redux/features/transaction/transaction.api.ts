import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransaction: builder.query({
      query: (params) => ({
        url: "/transaction/single-user-transactions",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetMyTransactionQuery } = transactionApi;
