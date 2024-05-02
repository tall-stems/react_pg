import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTask } from "../api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskDetail from "./TaskDetail";
import { FormikErrors, useFormik } from "formik";
import { Task } from "../App";

interface Props {
    setCurrentPage: (page: React.JSX.Element) => void;
}

function CreateTask({ setCurrentPage }: Props) {
    const queryClient = useQueryClient();

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

    const validate = (values: Partial<Task>) => {
        const errors: FormikErrors<Partial<Task>> = {};
        if (!values.title) {
            errors.title = "Required";
        } else if (values.title.length > 15) {
            errors.title = "Must be 15 characters or less";
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            text: "",
        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            createTaskMutation.mutate({
                title: values.title,
                text: values.text,
            });
        },
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "center",
                '& > div, & > button': {
                    m: 0.5,
                },
                '& > button': {
                    mt: 1.75,
                }
            }}
        >
            <TextField
                id="title"
                label="Title"
                variant="outlined"
                {...formik.getFieldProps("title")}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title&& formik.errors.title}
            />
            <TextField
                id="text"
                label="Text"
                variant="outlined"
                {...formik.getFieldProps("text")}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
            />
            <Button
                variant="contained"
                type="submit"
                disabled={createTaskMutation.isPending || !formik.isValid}
            >
                Create Task
            </Button>
        </Box>
    );
}

export default CreateTask;
