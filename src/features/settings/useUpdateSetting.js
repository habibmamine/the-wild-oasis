import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation({
    mutationFn: (newSettingsData) => updateSetting(newSettingsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Setting successfully edited");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateUpdate, isUpdating };
}
