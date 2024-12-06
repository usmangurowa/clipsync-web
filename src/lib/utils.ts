import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getClipboardContent = async () => {
  if (typeof window !== "undefined") {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      throw error;
    }
  }
  return "";
};
