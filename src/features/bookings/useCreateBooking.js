import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking } from "../../services/apiBookings";

export default function useCreateGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingBooking, mutate: mutateCreateBooking } = useMutation({
    mutationFn: createBooking,

    onSuccess: () => queryClient.invalidateQueries(),
    onError: (error) => toast.error(error.message),
  });

  return { isCreatingBooking, mutateCreateBooking };
}
