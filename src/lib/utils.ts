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

export const copyClipboardContent = async (content: string) => {
  if (typeof window !== "undefined") {
    window.focus();
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      throw error;
    }
  }
};

export const safeCopyToClipboard = (content: string) => {
  if (typeof window !== "undefined") {
    // Fallback method
    const textArea = document.createElement("textarea");
    textArea.value = content;

    // Make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text was " + msg);
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }

    document.body.removeChild(textArea);
  }
};
