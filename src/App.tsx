import "./App.css";
import { TaskType, Todolist } from "./features/TodolistsList/TodolistsList";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC, changeTodolistfilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, todolistsReducer } from "./features/TodolistsList/todolist-reducer";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, changeTaskTitleAC } from './features/TodolistsList/tasks-reducer';
import { useDispatch } from 'react-redux'
import { useAppSelector } from "./state/store";



export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    const dispatch = useDispatch()
    const tasks  = useAppSelector(state => state.tasks)
    const todolists  = useAppSelector(state => state.todolist)

    function changeTaskStatys(todolistID: string, id: string, isDone: boolean) {
        const action = changeTaskStatusAC(id, isDone, todolistID)
        // dispatchToTasks(action)
        dispatch(action)
    }

    const addTasks = (todolistID: string, title: string): void => {
        const action = addTaskAC(title, todolistID)
        dispatch(action)
    };

    const removeTasks = (todolistID: string, taskId: string) => {
        const action = removeTaskAC(taskId, todolistID)
        dispatch(action)
    };

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistfilterAC(todolistId, value)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const updateTask = (todolistId: string, isTask: string, title: string) => {
        const action = changeTaskTitleAC(todolistId, isTask,  title)
        dispatch(action)
    }

    const updateTodo = (todolistID: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistID, newTitle)
        dispatch(action)
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container >
                <Grid container style={{ padding: "10px" }}>
                    <AddItemForm addItem={addTodolist} />
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

export default App;