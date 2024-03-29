import { Dispatch, SetStateAction } from "react";

export interface IAlertStatus {
  show: boolean;
  msg: string;
}

export interface IAlertBox {
  alertStatus: IAlertStatus;
  setAlertStatus: Dispatch<SetStateAction<IAlertStatus>>;
}
