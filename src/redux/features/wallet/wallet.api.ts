import { IResponse } from "@/components/types";
import { IAddMoney } from "@/components/types/wallet.type";
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
    addMoney: builder.mutation<IResponse<null>, IAddMoney>({
      query: (amount) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: amount,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
  }),
});

export const { useGetMyWalletQuery, useAddMoneyMutation } = walletApi;
