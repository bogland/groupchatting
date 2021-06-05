import axios from "axios";
import { APIURI } from "config";
import { Res } from "./model";

export enum MemberType {
  GUEST = 0,
  MEMBER = 1,
}

export type T_CUSTOMER = {
  CUSTOMER_ID: number;
  CUSTOMER_NAME: string;
  CUSTOMER_PW: string | null;
  CREATE_AT: Date;
  CUSTOMER_TYPE: MemberType;
};

type AuthDTO = {
  memberType: MemberType;
  id: string;
  password?: string;
};

export const authentication = async (data: AuthDTO) => {
  const url = APIURI + "auth";
  const res: Res<string> = await axios.get(url, { params: data });
  return res.data;
};

export const checkAuth = async (token: string) => {
  const url = APIURI + "auth/check";
  const res: Res<string> = await axios.get(url, {
    headers: { Authorization: "Bearer " + token },
  });
  return res.data;
};
