import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: mutateLogout, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Remove all queries
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { mutateLogout, isLoading };
}

export default useLogout;
