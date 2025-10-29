import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";
import { createTask } from "../api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskDetail from "./TaskDetail";
import { FormikErrors, useFormik } from "formik";
import { Task } from "../App";
import { useState } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { announceToScreenReader, createErrorId, createDescriptionId } from "../utils/accessibility";

interface Props {
    setCurrentPage: (page: React.JSX.Element) => void;
}

function CreateTask({ setCurrentPage }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const queryClient = useQueryClient();
    const { isMobile } = useResponsive();

    const createTaskMutation = useMutation({
        mutationFn: createTask,
        retry: 1,
        onSuccess: (data, variables, context) => {
            console.log("onSuccess data: ", data);
            console.log("onSuccess variables: ", variables);
            console.log("onSuccess context: ", context);

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            formik.resetForm();
            setIsExpanded(false);
            announceToScreenReader("Task created successfully");
            setCurrentPage(<TaskDetail id={parseInt(data.id)} setCurrentPage={setCurrentPage} />);
        },
        onMutate: variables => {
            console.log("onMutate variables: ", variables);
        }
    });

    const validate = (values: Partial<Task>) => {
        const errors: FormikErrors<Partial<Task>> = {};
        if (!values.title) {
            errors.title = "Title is required";
        } else if (values.title.length > 100) {
            errors.title = "Title must be 100 characters or less";
        }

        if (!values.text) {
            errors.text = "Description is required";
        } else if (values.text.length > 500) {
            errors.text = "Description must be 500 characters or less";
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
            createTaskMutation.mutate({
                title: values.title,
                text: values.text,
            });
        },
    });

    return (
        <Card
          sx={{
            maxWidth: 600,
            width: '100%',
            mx: 'auto'
          }}
        >
            <CardActions sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1
            }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                    Create New Task
                </Typography>
                <IconButton
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? "Collapse form" : "Expand form"}
                    sx={{ minHeight: 44, minWidth: 44 }}
                >
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </CardActions>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ pt: 0 }}>
                    {createTaskMutation.isError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            <Typography variant="body2">
                                Failed to create task. Please try again.
                            </Typography>
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                        noValidate
                    >
                        <TextField
                            id="title"
                            label="Task Title"
                            variant="outlined"
                            fullWidth
                            required
                            autoComplete="off"
                            placeholder="Enter a descriptive title"
                            {...formik.getFieldProps("title")}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={
                                formik.touched.title && formik.errors.title
                                    ? formik.errors.title
                                    : `${formik.values.title.length}/100 characters`
                            }
                            inputProps={{
                                'aria-describedby': createDescriptionId('title'),
                                'aria-invalid': formik.touched.title && Boolean(formik.errors.title),
                                maxLength: 100,
                            }}
                            FormHelperTextProps={{
                                id: formik.touched.title && formik.errors.title ? createErrorId('title') : createDescriptionId('title'),
                            }}
                        />

                        <TextField
                            id="text"
                            label="Task Description"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            autoComplete="off"
                            placeholder="Describe what needs to be done"
                            {...formik.getFieldProps("text")}
                            error={formik.touched.text && Boolean(formik.errors.text)}
                            helperText={
                                formik.touched.text && formik.errors.text
                                    ? formik.errors.text
                                    : `${formik.values.text.length}/500 characters`
                            }
                            inputProps={{
                                'aria-describedby': createDescriptionId('text'),
                                'aria-invalid': formik.touched.text && Boolean(formik.errors.text),
                                maxLength: 500,
                            }}
                            FormHelperTextProps={{
                                id: formik.touched.text && formik.errors.text ? createErrorId('text') : createDescriptionId('text'),
                            }}
                        />

                        <Box sx={{
                          display: 'flex',
                          gap: 2,
                          justifyContent: 'flex-end',
                          mt: 1
                        }}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    formik.resetForm();
                                    setIsExpanded(false);
                                }}
                                disabled={createTaskMutation.isPending}
                                sx={{ minHeight: 44 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={createTaskMutation.isPending || !formik.isValid || !formik.dirty}
                                startIcon={
                                    createTaskMutation.isPending ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        <Add />
                                    )
                                }
                                sx={{
                                  minHeight: 44,
                                  minWidth: isMobile ? 120 : 140
                                }}
                                aria-label="Create new task"
                            >
                                {createTaskMutation.isPending ? "Creating..." : "Create Task"}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Collapse>

            {!isExpanded && (
                <CardContent sx={{ pt: 0, pb: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Add />}
                        onClick={() => setIsExpanded(true)}
                        sx={{
                          minHeight: 44,
                          textTransform: 'none'
                        }}
                        aria-label="Open create task form"
                    >
                        Add New Task
                    </Button>
                </CardContent>
            )}
        </Card>
    );
}

export default CreateTask;
