import { SyntheticEvent } from "react";

export interface IState {
  length: number;
  numbers: boolean;
  symbols: boolean;
  lowercase: boolean;
  uppercase: boolean;
}

export interface IPassword {
  id: string;
  name: string;
  value: IState;
}

export interface IGenerator {
  handleGeneratePassword: () => void;
  password: IPassword;
  actionButtons: boolean;
  handlePasswordLength: () => void;
  passwordLength: number;
  updateCheckboxes: (event: SyntheticEvent) => void;
  handleCopyToClipboard: (event: SyntheticEvent) => void;
  setModalSave: () => void;
}
