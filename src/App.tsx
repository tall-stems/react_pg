import { useEffect, useState } from 'react';
import { Box, Typography, Button, ButtonGroup, Container, AppBar, Toolbar } from '@mui/material';
import { useResponsive } from './hooks/useResponsive';
import TaskList from './components/TaskList';
import TaskTable from './components/TaskTable';

export interface Task {
  id: string;
  title: string;
  text: string;
  completed: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<React.JSX.Element | null>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    setCurrentPage(<TaskList setCurrentPage={setCurrentPage} />);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: 'primary.contrastText',
            }}
          >
            My React Playground
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: { xs: 2, sm: 3 },
            gap: 2,
          }}
        >
          <ButtonGroup
            variant="contained"
            color="primary"
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{
              width: isMobile ? '100%' : 'auto',
              maxWidth: { xs: '100%', sm: 'none' },
            }}
          >
            <Button
              onClick={() => setCurrentPage(<TaskList setCurrentPage={setCurrentPage} />)}
              aria-label="Navigate to Task List"
              sx={{
                minHeight: 44,
                px: { xs: 2, sm: 3 },
              }}
            >
              Task List
            </Button>
            <Button
              onClick={() => setCurrentPage(<TaskTable setCurrentPage={setCurrentPage} />)}
              aria-label="Navigate to Task Table"
              sx={{
                minHeight: 44,
                px: { xs: 2, sm: 3 },
              }}
            >
              Task Table
            </Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ flex: 1 }}>{currentPage}</Box>
      </Container>
    </Box>
  );
}

export default App;
