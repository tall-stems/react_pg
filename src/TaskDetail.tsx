import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getTask } from "./api/tasks";
import { Checkbox } from "@mui/material";

interface TaskDetailProps {
    id: number;
}

function TaskDetail({ id }: TaskDetailProps) {
    const taskQuery = useQuery({
        queryKey: ["tasks", id],
        queryFn: () => getTask(id),
    });

    if (taskQuery.status === "pending")
        return (
            <Typography variant="h3" color="error" align="center">
                Loading...
            </Typography>
        );
    if (taskQuery.status === "error")
        return <pre>{JSON.stringify(taskQuery.error)}</pre>;

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="h2" align="center" gutterBottom>
                Task {id}
            </Typography>
            {taskQuery?.data && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Checkbox checked={taskQuery.data.completed} disabled />
                    <Box sx={{ width: "25%" }}>
                        <p>
                            <strong>{taskQuery.data.title}</strong>
                        </p>
                    </Box>
                    <Box sx={{ width: "75%" }}>
                        <p>{taskQuery.data.text}</p>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default TaskDetail;
