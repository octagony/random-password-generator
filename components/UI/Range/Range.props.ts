import { SyntheticEvent } from "react";

export interface IRange {
  passwordLength: number;
  handlePasswordLength: (event: SyntheticEvent) => void;
}
