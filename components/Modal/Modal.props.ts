import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { IPassword } from "../../types/state";

export interface IModal {
  savePassword: (event: SyntheticEvent) => Promise<void>;
  password: IPassword;
  setModalSave: Dispatch<SetStateAction<boolean>>;
  setPassword: (value: React.SetStateAction<IPassword>) => void;
}
