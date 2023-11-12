import React, { useState } from "react";
import "./App.css";
import { v1 } from 'uuid';
import { TaskType, Todolist } from "./Todolist";


export type FilterValueType = "all" | "active" | "completed";

const App = () => {
    const todoListTitle = "What to learn";
    const [todolist, setTodolist] = useState([
        // ф-ция  useStateвозвращает массив 2-х элементов, массив данных и ф-цию которая изменяет массив
        { id: v1(), title: "what to ", filter: 'all' },
        { id: v1(), title: "what to buy", filter: 'all' },
    ])

    const [tasks, setTasks] = useState([
        // ф-ция  useStateвозвращает массив 2-х элементов, массив данных и ф-цию которая изменяет массив
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
    ]);

    ;

    function changeTaskStatys(id: string, isDone: boolean) {
        setTasks(
            tasks.map((t) => (t.id === id ? { ...t, isDone: isDone } : t))
        );
    }

    const addTasks = (title: string): void => {
        const newTask: TaskType = {
            id: crypto.randomUUID(), // толька для браузера
            title: title,
            isDone: false,
        };
        const nextState: TaskType[] = [newTask, ...tasks];
        setTasks(nextState);
    };

    const removeTasks = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter(
            (task) => task.id !== taskId
        );
        setTasks(nextState);
    };

    const [filter, setSilter] = useState<FilterValueType>("all");
    const changeFilter = (newFilteredValue: FilterValueType) =>
        setSilter(newFilteredValue);
    //   const tasks = result[0] //currentState,  роддовые назнание переменной
    // const setState = result[1] // state состояние, setState

    const getFiltredTasks = (
        allTasks: TaskType[],
        newFilteredValue: FilterValueType
    ): TaskType[] => {
        switch (newFilteredValue) {
            case "active":
                return allTasks.filter((t) => t.isDone === false);
            case "completed":
                return allTasks.filter((t) => t.isDone === true);
            default:
                return allTasks;
        }
    };

    const filtredTasks: TaskType[] = getFiltredTasks(tasks, filter);
    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={filtredTasks}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                addTask={addTasks}
                changeTaskStatys={changeTaskStatys}
                filter={filter}
            />
        </div>
    );
};

export default App;