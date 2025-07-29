import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteResource as deleteResourceApi } from "../../services/apiResources";

export function useDeleteResource() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteResource } = useMutation({
    mutationFn: deleteResourceApi,
    onSuccess: () => {
      toast.success("Resource successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["resources"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteResource };
}
