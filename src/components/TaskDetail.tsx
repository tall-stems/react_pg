import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Checkbox,
  Card,
  CardContent,
  Skeleton,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Divider
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  ArrowBack,
  CalendarToday,
  Person
} from "@mui/icons-material";
import { getTask } from "../api/tasks";
import { useResponsive } from "../hooks/useResponsive";
import TaskList from "./TaskList";

interface TaskDetailProps {
    id: number;
    setCurrentPage: (page: React.JSX.Element) => void;
}

function TaskDetail({ id, setCurrentPage }: TaskDetailProps) {
    const { isMobile } = useResponsive();

    const taskQuery = useQuery({
        queryKey: ["tasks", id],
        queryFn: () => getTask(id),
    });

    if (taskQuery.status === "pending") {
        return (
            <Box role="status" aria-label={`Loading task ${id} details`}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="30%" height={40} />
                </Box>
                <Card>
                    <CardContent>
                        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="80%" height={20} />
                        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                            <Skeleton variant="rectangular" width={80} height={32} />
                            <Skeleton variant="rectangular" width={100} height={32} />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    if (taskQuery.status === "error") {
        return (
            <Box role="alert">
                <Typography variant="h4" gutterBottom>
                    Task Details
                </Typography>
                <Alert severity="error">
                    <Typography variant="h6" gutterBottom>
                        Error Loading Task
                    </Typography>
                    <Typography variant="body2">
                        {taskQuery.error?.message || `Failed to load task ${id}. Please try again.`}
                    </Typography>
                </Alert>
            </Box>
        );
    }

    const task = taskQuery.data;
    if (!task) return null;

    return (
        <Box>
            <Box sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexDirection: isMobile ? 'column' : 'row'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Tooltip title="Back to task list" arrow>
                        <IconButton
                            aria-label="Back to task list"
                            sx={{
                              minHeight: 44,
                              minWidth: 44,
                              '&:focus-visible': {
                                outline: '2px solid',
                                outlineOffset: 2,
                              }
                            }}
                            // TODO: this doesn't actually work since we aren't changing urls
                            // onClick={() => window.history.back()}
                            onClick={() => setCurrentPage(<TaskList setCurrentPage={setCurrentPage} />)}
                        >
                            <ArrowBack />
                        </IconButton>
                    </Tooltip>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: 600 }}
                    >
                        Task Details
                    </Typography>
                </Box>

                <Chip
                    label={task.completed ? "Completed" : "In Progress"}
                    color={task.completed ? "success" : "warning"}
                    variant="filled"
                    icon={task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                    size={isMobile ? "small" : "medium"}
                />
            </Box>

            <Card sx={{ maxWidth: 800, mx: 'auto' }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      mb: 3
                    }}>
                        <Checkbox
                            checked={task.completed}
                            disabled
                            icon={<RadioButtonUnchecked />}
                            checkedIcon={<CheckCircle />}
                            sx={{
                              p: 0.5,
                              color: task.completed ? 'success.main' : 'action.disabled',
                              '& .MuiSvgIcon-root': {
                                fontSize: isMobile ? '1.5rem' : '2rem'
                              }
                            }}
                            inputProps={{
                              'aria-label': `Task status: ${task.completed ? 'completed' : 'incomplete'}`
                            }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant={isMobile ? "h5" : "h4"}
                                component="h2"
                                gutterBottom
                                sx={{
                                  fontWeight: 600,
                                  textDecoration: task.completed ? 'line-through' : 'none',
                                  color: task.completed ? 'text.secondary' : 'text.primary',
                                  wordBreak: 'break-word',
                                  lineHeight: 1.2
                                }}
                            >
                                {task.title}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              mb: 2
                            }}
                        >
                            Description
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                              lineHeight: 1.6,
                              color: 'text.primary',
                              backgroundColor: 'grey.50',
                              p: 2,
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: 'grey.200',
                              wordBreak: 'break-word',
                              whiteSpace: 'pre-wrap'
                            }}
                        >
                            {task.text}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Box sx={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 2,
                      '& .MuiChip-root': {
                        justifyContent: 'flex-start'
                      }
                    }}>
                        <Chip
                            icon={<Person />}
                            label={`Task ID: ${task.id}`}
                            variant="outlined"
                            color="primary"
                            size={isMobile ? "small" : "medium"}
                        />
                        <Chip
                            icon={<CalendarToday />}
                            label="Created Today"
                            variant="outlined"
                            color="info"
                            size={isMobile ? "small" : "medium"}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default TaskDetail;
