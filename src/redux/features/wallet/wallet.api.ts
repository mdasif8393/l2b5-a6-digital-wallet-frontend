import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWallet: builder.query({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    addMoney: builder.mutation({
      query: (amount) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: amount,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
  }),
});

export const { useGetMyWalletQuery } = walletApi;
