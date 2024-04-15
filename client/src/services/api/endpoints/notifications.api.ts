import api from "../axios/client";
import { NotificationReq, NotificationRes } from "../types/notification";


export const sendNotifications = async (payload: NotificationReq) => {
  const res = await api.post("/grant-notifications", payload);
  return res.data;
}

export const fetchNotifications = async (foundation: string, nonProfit: string) => {
  const res = await api.get<NotificationRes[]>(`/grant-notifications?${!!foundation ? `foundation=${foundation}&` : ''}${!!nonProfit ? `non-profit=${nonProfit}` : ''}` );
  return res.data;
}