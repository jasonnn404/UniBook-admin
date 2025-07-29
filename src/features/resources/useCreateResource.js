import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditResource } from "../../services/apiResources";

export function useCreateResource() {
  const queryClient = useQueryClient();

  const { mutate: createResource, isLoading: isCreating } = useMutation({
    mutationFn: createEditResource,
    onSuccess: () => {
      toast.success("New resource successfully created");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createResource };
}
