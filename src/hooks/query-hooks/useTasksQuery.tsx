import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api/tasks";

export default function useTasksQuery(override = {}) {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
        staleTime: 1000 * 60 , // 1 minute
        ...override
    });
}