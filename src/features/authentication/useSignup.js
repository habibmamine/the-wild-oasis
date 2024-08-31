import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/Auth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: mutateSignup, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verfiy the new account from the user's email address."
      );
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateSignup, isLoading };
}

export default useSignup;
