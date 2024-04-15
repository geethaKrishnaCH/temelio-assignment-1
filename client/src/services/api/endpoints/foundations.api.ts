import api from "../axios/client";
import { FoundationReq, FoundationRes } from "../types/foundation";

export const fetchAllFoundations = async (): Promise<FoundationRes[]> => {
  const res = await api.get<FoundationRes[]>("/foundations");
  return res.data;
}

export const saveFoundation = async (payload: FoundationReq)=> {
  const res = await api.post("/foundations", payload);
  return res.data;
}