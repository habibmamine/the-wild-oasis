import { useMutation } from "@tanstack/react-query";
import { createGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export default function useCreateGuest() {
  const { isLoading: isCreatingGuest, mutate: mutateCreateGuest } = useMutation({
    mutationFn: createGuest,

    onError: (error) => toast.error(error.message),
  });

  return { isCreatingGuest, mutateCreateGuest };
}
