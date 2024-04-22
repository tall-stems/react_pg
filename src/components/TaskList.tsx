import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { Task } from "./App";
// import { delay } from "./utils/utils";
import { Button, Checkbox } from "@mui/material";
import CreateTask from "./CreateTask";
import TaskDetail from "./TaskDetail";
import useTasksQuery from "../hooks/query-hooks/useTasksQuery";

interface Props {
    setCurrentPage: (page: React.JSX.Element) => void;
}

function TaskList({ setCurrentPage }: Props) {
    const tasksQuery = useTasksQuery();

    if (tasksQuery.status === "pending")
        return (
            <Typography variant="h3" color="error" align="center">
                Loading...
            </Typography>
        );
    if (tasksQuery.status === "error")
        return <pre>{JSON.stringify(tasksQuery.error)}</pre>;

    function handleClick(e: React.MouseEvent) {
        const id = parseInt((e.currentTarget as HTMLButtonElement).dataset.id!);
        console.log("e.target: ", e.currentTarget);
        console.log("id: ", id);
        e.preventDefault();
        setCurrentPage(<TaskDetail id={id} />);
        return false;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="h2" align="center" gutterBottom>
                Task List
            </Typography>
            <Typography variant="h3" align="center" gutterBottom>
                Total tasks: {tasksQuery.data?.count}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CreateTask setCurrentPage={setCurrentPage} />
            </Box>
            {tasksQuery.data?.results?.map((task) => (
                <Box
                    key={task.id}
                    sx={{ display: "flex", alignItems: "center", mt: 2 }}
                >
                    <Checkbox checked={task.completed} disabled />
                    <Box sx={{ width: "25%" }}>
                        <Button
                            variant="text"
                            onClick={handleClick}
                            data-id={task.id}
                        >
                            <strong>{task.title}</strong>
                        </Button>
                    </Box>
                    <Box sx={{ width: "75%" }}>
                        <p>{task.text}</p>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default TaskList;
