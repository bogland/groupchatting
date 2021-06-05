import axios from "axios";
import { APIURI } from "config";
import { T_CUSTOMER } from "./authService";
import { Res } from "./model";

export type T_ROOM = {
  ROOM_ID: number;
  CUSTOMER_ID: number;
  ROOM_NAME: string;
  CREATE_AT: Date;
  DURING: number;
  END_AT: Date;
};

export type RoomInfo = T_ROOM & T_CUSTOMER;

export const getRoomList = async () => {
  const url = APIURI + "room/list";
  const res: Res<RoomInfo[]> = await axios.get(url);
  console.log(res);
  return res.data.data;
};
