import React, { useRef } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void //  void === undefind - то, что возвращает функция
    changeFilter: (newFilteredValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodolistRef = (props: PodoListPropsType) => {

const taskTitleInput = useRef<HTMLInputElement>(null)

    const tasksList: Array<JSX.Element> = props.tasks.map((t: TaskType) => {
        const showTaskId = () => props.removeTasks(t.id)
        return (
            <li><input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={showTaskId}> x</button>
            </li>
        )
    })



    const addTaskHandler = () => {
        props.addTask('ddd')
        if(taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value
            props.addTask(newTaskTitle)
        }
    }
    

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input  ref={taskTitleInput}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {tasksList}
        </ul>
        <div>
            <button onClick={() => props.changeFilter("all")}>All</button>
            <button onClick={() => props.changeFilter("active")}>Active</button>
            <button onClick={() => props.changeFilter("completed")}>Completed</button>
        </div>
    </div>
}
