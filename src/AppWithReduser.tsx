import React, { useReducer, useState } from "react";
import "./App.css";
import { v1 } from 'uuid';
import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC, changeTodolistfilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolist-reducer";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, changeTaskTitleAC } from './state/tasks-reducer';


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithReduser = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistReduser] = useReducer(todolistsReducer, [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        const action = changeTaskStatusAC(id, isDone, todolistID)
        dispatchToTasks(action)
    }

    const addTasks = (todolistID: string, title: string): void => {
        const action = addTaskAC(title, todolistID)
        dispatchToTasks(action)
    };

    const removeTasks = (todolistID: string, taskId: string) => {
        const action = removeTaskAC(taskId, todolistID)
        dispatchToTasks(action)
    };

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistfilterAC(todolistId, value)
        dispatchToTodolistReduser(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTasks(action)
        dispatchToTodolistReduser(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolistReduser(action)
    }

    const updateTask = (todolistId: string, isTask: string, title: string) => {
        // const action = changeTaskTitleAC(todolistId, isTask,  title)
        dispatchToTasks(changeTaskTitleAC(todolistId, isTask,  title))
    }

    const updateTodo = (todolistID: string, newTitle: string) => {
        // const action = changeTodolistTitleAC(todolistID, newTitle)
        dispatchToTodolistReduser(changeTodolistTitleAC(todolistID, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container >
                <Grid container style={{ padding: "10px" }}>
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
                                <Paper elevation={3} style={{ padding: "10px" }}>
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

export default AppWithReduser;