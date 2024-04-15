import { Address } from "./address";

export interface NonProfitRes {
  id: number;
  name: string;
  email: string;
  foundation: string;
  foundationId: number;
  address: Address;
  selected?: boolean
}

export interface NonProfitReq {
  name: string;
  email: string;
  foundation: number | null;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}