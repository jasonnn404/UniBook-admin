import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditResource } from "../../services/apiResources";
import { toast } from "react-hot-toast";

export function useEditResource() {
  const queryClient = useQueryClient();

  const { mutate: editResource, isLoading: isEditing } = useMutation({
    mutationFn: ({ newResourceData, id }) =>
      createEditResource(newResourceData, id),
    onSuccess: () => {
      toast.success("Resource successfully edited");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editResource };
}
