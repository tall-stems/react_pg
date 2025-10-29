import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Skeleton,
  Alert,
} from '@mui/material';
import { useMemo } from 'react';
import TaskDetail from './TaskDetail';
import useTasksQuery from '../hooks/query-hooks/useTasksQuery';
// import { useResponsive } from '../hooks/useResponsive';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { Task } from '../App';

interface Props {
  setCurrentPage: (page: React.JSX.Element) => void;
}

function TaskList({ setCurrentPage }: Props) {
  const tasksQuery = useTasksQuery();
  // const { isMobile } = useResponsive();

  function handleTaskClick(id: number) {
    setCurrentPage(<TaskDetail id={id} setCurrentPage={setCurrentPage} />);
  }

  //simple column definitions pointing to flat data
  const columns = useMemo<MRT_ColumnDef<Task>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id', //simple recommended way to define a column
      },
      {
        header: 'Title',
        accessorKey: 'title',
        Cell: ({ row, renderedCellValue }) => (
          <Box
            onClick={() => handleTaskClick(parseInt(row.original.id))}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        header: 'Completed',
        accessorKey: 'completed',
        Cell: ({ cell }) => (cell.getValue<boolean>() ? 'Yes' : 'No'),
      },
      // Only show about 30 characters of text in table view
      {
        header: 'Description',
        accessorFn: (row) => row.text.slice(0, 30) + (row.text.length > 30 ? '...' : ''),
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tasksQuery.data?.results || [],
  });

  // const completedTasks = tasksQuery.data?.results?.filter(task => task.completed).length || 0;
  const totalTasks = tasksQuery.data?.count || 0;

  if (tasksQuery.status === 'pending') {
    return (
      <Box role="status" aria-label="Loading tasks table">
        <Typography variant="h4" align="center" gutterBottom>
          Task Table
        </Typography>
        <Typography variant="h6" align="center" gutterBottom color="text.secondary">
          Loading tasks...
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
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
      </Box>
    );
  }

  if (tasksQuery.status === 'error') {
    return (
      <Box role="alert">
        <Typography variant="h4" align="center" gutterBottom>
          Task Table
        </Typography>
        <Alert severity="error" sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Error Loading Tasks
          </Typography>
          <Typography variant="body2">
            {tasksQuery.error?.message || 'An unexpected error occurred while loading tasks.'}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Task List
        </Typography>
      </Box>

      {totalTasks === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tasks yet
          </Typography>
        </Box>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </Box>
  );
}

export default TaskList;
