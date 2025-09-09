export interface IAddMoney {
  amount: number;
}

export interface ISendMoney {
  amountData: {
    amount: number;
  };
  receiverId: string;
}
