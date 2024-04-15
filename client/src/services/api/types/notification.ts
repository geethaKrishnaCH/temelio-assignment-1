export interface NotificationReq {
  nonProfitIds: number[]
}

export interface NotificationRes {
  id: number;
  foundation: string;
  nonProfit: string;
  email: string;
}