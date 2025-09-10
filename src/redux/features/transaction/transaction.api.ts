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
    getAllTransaction: builder.query({
      query: (params) => ({
        url: "/transaction/all-transaction",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetMyTransactionQuery, useGetAllTransactionQuery } =
  transactionApi;
