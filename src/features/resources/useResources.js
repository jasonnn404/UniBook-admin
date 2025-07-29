import { useQuery } from "@tanstack/react-query";
import { getResources } from "../../services/apiResources";

export function useResources() {
  const {
    isLoading,
    data: resources,
    error,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  return { isLoading, error, resources };
}
