import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/Auth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User successfully updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateUpdate, isUpdating };
}
