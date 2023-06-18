import { ReactNode, SyntheticEvent } from "react";

export interface ICheckbox {
  updateCheckboxes: (event: SyntheticEvent) => void;
  name: string;
  children: ReactNode;
}
