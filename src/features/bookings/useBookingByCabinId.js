import { useMutation } from "@tanstack/react-query";
import { getBookingByCabinId } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useBookingByCabinId() {
  const { isLoading: isLoadingCabinBookings, mutate: mutateCabinBookings } = useMutation({
    mutationFn: getBookingByCabinId,

    onError: (error) => toast.error(error.message),
  });

  return { isLoadingCabinBookings, mutateCabinBookings };
}
