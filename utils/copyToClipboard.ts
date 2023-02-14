import { SyntheticEvent } from "react";

export const handleCopyToClipboard = async (
  event: SyntheticEvent,
  password: string
) => {
  event.preventDefault();
  try {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(password);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};
