import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType } from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void //  void === undefind - то, что возвращает функция
    changeFilter: (newFilteredValue: FilterValueType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PodoListPropsType) => {
    console.log('todo')
    const [title, setTitle] = useState('')

    const tasksList: Array<JSX.Element> = props.tasks.map((t: TaskType) => {
        const showTaskId = () => props.removeTasks(t.id)
        return (
            <li><input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={showTaskId}> x</button>
            </li>
        )
    })



    const onClickFilterHeasndler = () => props.changeFilter("all")

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onCHahceHeandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyDownHeadler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isAddTaskBtnDisabled && addTaskHandler()
    // let userMessage = null
    // if (title.length > 15) {
    //     userMessage = <p style={{ color: 'red' }}> Spop! your text is too long...</p>
    // }
    // if (!title.length) {
    //     userMessage = <p style={{ color: 'blue' }}>Please, start typing...</p>
    // }
    const userMessageStartTyping: boolean | JSX.Element =
        title.length > 15 && <p style={{ color: 'red' }}> Spop! your text is too long...</p>

    const userMessageLengthTitle: boolean | JSX.Element =
        !title.length && <p style={{ color: 'blue' }}>Please, start typing...</p>

    const isAddTaskBtnDisabled = title.length > 15 || !title.length

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onCHahceHeandler}
                onKeyDown={onKeyDownHeadler}
            />
            <button
                disabled={isAddTaskBtnDisabled}
                onClick={addTaskHandler}>+</button>
            {userMessageStartTyping}
            {userMessageLengthTitle}
        </div>
        <ul>
            {tasksList}
        </ul>
        <div>
            <button onClick={onClickFilterHeasndler}>All</button>
            <button onClick={() => props.changeFilter("active")}>Active</button>
            <button onClick={() => props.changeFilter("completed")}>Completed</button>
        </div>
    </div>
}
