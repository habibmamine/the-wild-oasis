import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createUpdateCabin(newCabin),
    onSuccess: (x) => {
      console.log(x);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateCreate, isCreating };
}
