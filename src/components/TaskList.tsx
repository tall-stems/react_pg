import {
  Box,
  Typography,
  Button,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Grid,
  Skeleton,
  Alert,
  Chip,
  Tooltip
} from "@mui/material";
import { CheckCircle, RadioButtonUnchecked, Visibility } from "@mui/icons-material";
import CreateTask from "./CreateTask";
import TaskDetail from "./TaskDetail";
import useTasksQuery from "../hooks/query-hooks/useTasksQuery";
import { useResponsive } from "../hooks/useResponsive";

interface Props {
    setCurrentPage: (page: React.JSX.Element) => void;
}

function TaskList({ setCurrentPage }: Props) {
    const tasksQuery = useTasksQuery();
    const { isMobile } = useResponsive();

    if (tasksQuery.status === "pending") {
        return (
            <Box role="status" aria-label="Loading tasks">
                <Typography variant="h4" align="center" gutterBottom>
                    Task List
                </Typography>
                <Typography variant="h6" align="center" gutterBottom color="text.secondary">
                    Loading tasks...
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {[...Array(3)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardContent>
                                    <Skeleton variant="text" width="60%" height={32} />
                                    <Skeleton variant="text" width="100%" height={20} />
                                    <Skeleton variant="text" width="80%" height={20} />
                                </CardContent>
                                <CardActions>
                                    <Skeleton variant="rectangular" width={100} height={36} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    if (tasksQuery.status === "error") {
        return (
            <Box role="alert">
                <Typography variant="h4" align="center" gutterBottom>
                    Task List
                </Typography>
                <Alert severity="error" sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Error Loading Tasks
                    </Typography>
                    <Typography variant="body2">
                        {tasksQuery.error?.message || "An unexpected error occurred while loading tasks."}
                    </Typography>
                </Alert>
            </Box>
        );
    }

    function handleTaskClick(id: number) {
        setCurrentPage(<TaskDetail id={id} setCurrentPage={setCurrentPage} />);
    }

    const completedTasks = tasksQuery.data?.results?.filter(task => task.completed).length || 0;
    const totalTasks = tasksQuery.data?.count || 0;

    return (
        <Box>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    Task List
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  flexWrap: 'wrap',
                  mb: 2
                }}>
                    <Chip
                        label={`Total: ${totalTasks}`}
                        color="primary"
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                    />
                    <Chip
                        label={`Completed: ${completedTasks}`}
                        color="success"
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                    />
                    <Chip
                        label={`Remaining: ${totalTasks - completedTasks}`}
                        color="warning"
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                    />
                </Box>
            </Box>

            <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
                <CreateTask setCurrentPage={setCurrentPage} />
            </Box>

            {totalTasks === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No tasks yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create your first task using the form above
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {tasksQuery.data?.results?.map((task) => (
                        <Grid item xs={12} sm={6} lg={4} key={task.id}>
                            <Card
                                data-testid={`task-${task.id}`}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardContent sx={{ flex: 1 }}>
                                    <Box sx={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: 1,
                                      mb: 2
                                    }}>
                                        <Checkbox
                                            checked={task.completed}
                                            disabled
                                            icon={<RadioButtonUnchecked />}
                                            checkedIcon={<CheckCircle />}
                                            sx={{
                                              p: 0.5,
                                              color: task.completed ? 'success.main' : 'action.disabled'
                                            }}
                                            inputProps={{
                                              'aria-label': `Task ${task.completed ? 'completed' : 'incomplete'}`
                                            }}
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                gutterBottom
                                                sx={{
                                                  fontWeight: 600,
                                                  textDecoration: task.completed ? 'line-through' : 'none',
                                                  color: task.completed ? 'text.secondary' : 'text.primary',
                                                  wordBreak: 'break-word'
                                                }}
                                            >
                                                {task.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                data-testid={`task-${task.id}-text`}
                                                sx={{
                                                  display: '-webkit-box',
                                                  WebkitLineClamp: 3,
                                                  WebkitBoxOrient: 'vertical',
                                                  overflow: 'hidden',
                                                  textOverflow: 'ellipsis',
                                                  lineHeight: 1.4
                                                }}
                                            >
                                                {task.text}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ pt: 0 }}>
                                    <Tooltip title="View task details" arrow>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Visibility />}
                                            onClick={() => handleTaskClick(parseInt(task.id))}
                                            size={isMobile ? "small" : "medium"}
                                            aria-label={`View details for ${task.title}`}
                                            sx={{
                                              minHeight: 44,
                                              '&:focus-visible': {
                                                outline: '2px solid',
                                                outlineOffset: 2,
                                              }
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default TaskList;
