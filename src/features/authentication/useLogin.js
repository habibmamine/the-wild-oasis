import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Auth";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: mutateLogin, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: () => {
      // Must remove the old fetched user
      queryClient.removeQueries();
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log(error);
      toast.error("Incorrect email or password");
    },
  });

  return { mutateLogin, isLoading };
}

export default useLogin;
