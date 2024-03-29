import React from "react";
import "./App.css";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Menu } from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "./store";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";

function App() {
  const status = useAppSelector((state) => state.app.status);

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === "loading" && <LinearProgress color="primary" />}
      </AppBar>
      <Container fixed>
        <TodolistsList />
      </Container>
    </div>
  );
}

export default App;
