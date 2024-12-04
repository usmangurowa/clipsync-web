import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error.message) {
      return error.message;
    }

    return "An error occurred";
  },
  defaultValidationErrorsShape: "flattened",
});
