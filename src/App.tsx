import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TaskList from "./components/TaskList";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect, useState } from "react";

export interface Task {
    id: string;
    title: string;
    text: string;
    completed: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<React.JSX.Element | null>(null)
  useEffect(() => {
    setCurrentPage(<TaskList setCurrentPage={setCurrentPage}/>);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Typography variant="h1" align="center" gutterBottom>
          My React Playground
        </Typography>
        <ButtonGroup variant="contained" sx={{mb:2}}>
          <Button onClick={() => setCurrentPage(<TaskList setCurrentPage={setCurrentPage}/>)}>
            Task List 1
          </Button>
        </ButtonGroup>
        {currentPage}
      </Box>
    </Box>
  );
}

export default App;
