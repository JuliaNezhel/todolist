import React, { useState } from "react";
import "./App.css";
import { v1 } from 'uuid';
import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true }
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "React Book", isDone: true }
        ]
    });

    ;

    function changeTaskStatys(todolistID: string, id: string, isDone: boolean) {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id
                ? { ...t, isDone }
                : t)
        })
    }

    const addTasks = (todolistID: string, title: string): void => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        };
        setTasks({ ...tasks, [todolistID]: [...tasks[todolistID], newTask] })
    };

    const removeTasks = (todolistID: string, taskId: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId) })
    };

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? { ...t, filter: value } : t))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (title: string) => {
        const newTodo = v1()
        const newTodoList: TodolistType = { id: newTodo, title: title, filter: "all" }
        setTodolists([...todolists, newTodoList])
        setTasks({ ...tasks, [newTodo]: [] })
    }

    const updateTask = (todolistId: string, isTask: string, title: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === isTask ? { ...el, title: title } : el) })
    }

    const updateTodo = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? { ...el, title: newTitle } : el))
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container >
                <Grid container  style={{padding: "10px"}}>
                    <AddItemForm callBack={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(t => {

                        let allTodolistTasks = tasks[t.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (t.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <Todolist
                                        key={t.id}
                                        todolistID={t.id}
                                        title={t.title}
                                        tasks={tasksForTodolist}
                                        removeTasks={removeTasks}
                                        changeFilter={changeFilter}
                                        addTask={addTasks}
                                        changeTaskStatys={changeTaskStatys}
                                        filter={t.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodo={updateTodo}
                                    />
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>

            </Container>
        </div>
    );
};

export default App;