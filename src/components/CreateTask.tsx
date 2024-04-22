import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { createTask } from "../api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskDetail from "./TaskDetail";

interface Props {
    setCurrentPage: (page: React.JSX.Element) => void;
}

function CreateTask({ setCurrentPage }: Props) {
    const queryClient = useQueryClient();

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const createTaskMutation = useMutation({
        mutationFn: createTask,
        retry: 1, // Number of retries before failing (typically leave this alone for mutations)
        onSuccess: (data, variables, context) => {
            console.log("onSuccess data: ", data);
            console.log("onSuccess variables: ", variables);
            console.log("onSuccess context: ", context);

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setCurrentPage(<TaskDetail id={parseInt(data.id)} />);
        },
        onMutate: variables => {
            // Things happening in here happen BEFORE the mutation is executed
            console.log("onMutate varibles: ", variables);
        }
    });

    // TODO: make this actually create an entry in react query
    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        createTaskMutation.mutate({
            title: title,
            text: text,
        });
    }

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                '& > div, & > button': {
                    m: 0.5,
                },
            }}
        >
            <TextField
                id="title"
                label="Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                id="text"
                label="Text"
                variant="outlined"
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Create Task
            </Button>
        </Box>
    );
}

export default CreateTask;
