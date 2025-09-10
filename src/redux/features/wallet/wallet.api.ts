/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResponse } from "@/components/types";
import { IAddMoney, ISendMoney } from "@/components/types/wallet.type";
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
    // user
    addMoney: builder.mutation<IResponse<null>, IAddMoney>({
      query: (amount) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: amount,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    sendMoney: builder.mutation<IResponse<null>, ISendMoney>({
      query: (params) => {
        return {
          url: `/wallet/send-money/${params.receiverId}`,
          method: "POST",
          data: params.amountData,
        };
      },
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    cashOut: builder.mutation<IResponse<null>, ISendMoney>({
      query: (params) => {
        return {
          url: `/wallet/cash-out/${params.receiverId}`,
          method: "POST",
          data: params.amountData,
        };
      },
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    // agent
    cashIn: builder.mutation<IResponse<null>, ISendMoney>({
      query: (params) => {
        return {
          url: `/wallet/cash-in/${params.receiverId}`,
          method: "POST",
          data: params.amountData,
        };
      },
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    withdrawMoney: builder.mutation<IResponse<null>, ISendMoney>({
      query: (params) => {
        return {
          url: `/wallet/withdraw-money/${params.receiverId}`,
          method: "POST",
          data: params.amountData,
        };
      },
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
  }),
});

export const {
  useGetMyWalletQuery,
  useAddMoneyMutation,
  useSendMoneyMutation,
  useCashOutMutation,
  useCashInMutation,
  useWithdrawMoneyMutation,
} = walletApi;
