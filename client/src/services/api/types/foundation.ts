import { Address } from "./address";

export interface FoundationRes {
  id: number;
  name: string;
  email: string;
  address: Address
}

export interface FoundationReq {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

