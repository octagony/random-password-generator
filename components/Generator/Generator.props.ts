import { SyntheticEvent } from "react";
import { IPassword } from "../../types/state";

export interface IGenerator {
  handleGeneratePassword: () => void;
  password: IPassword;
  actionButtons: boolean;
  handlePasswordLength: (event: SyntheticEvent) => void;
  passwordLength: number;
  updateCheckboxes: (event: SyntheticEvent) => void;
  handleCopyToClipboard: (event: SyntheticEvent) => void;
  setModalSave: React.Dispatch<React.SetStateAction<boolean>>;
}
