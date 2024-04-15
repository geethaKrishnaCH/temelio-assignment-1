import api from "../axios/client";
import { NonProfitRes, NonProfitReq } from "../types/non-profit";

export const fetchAllNonProfits = async (): Promise<NonProfitRes[]> => {
  const res = await api.get<NonProfitRes[]>("/non-profits");
  return res.data;
}

export const saveNonProfit = async (payload: NonProfitReq)=> {
  const res = await api.post("/non-profits", payload);
  return res.data;
}