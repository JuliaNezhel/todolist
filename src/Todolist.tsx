import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";
// import { FilterValueType } from "./App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTasks: (taskId: string) => void;
    changeFilter: (value: FilterValueType) => void;
    addTask: (title: string) => void;
    changeTaskStatys: (id: string, isDone: boolean) => void;
    filter: FilterValueType;
};

export const Todolist = (props: PodoListPropsType) => {
    console.log("todo");
    const [title, setTitle] = useState("");
    const [error, setEror] = useState(false);

    const tasksList: Array<JSX.Element> = props.tasks.map((t: TaskType) => {
        const showTaskId = () => props.removeTasks(t.id);

        const onChanceTaskStatysHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatys(t.id, e.currentTarget.checked);
        return (
            <li key={t.id} className={t.isDone ? "task-is-done" : "task"}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={onChanceTaskStatysHandler}
                />
                <span>{t.title}</span>
                <button onClick={showTaskId}> x</button>
            </li>
        );
    });

    const onClickFilterHeasndler = () => props.changeFilter( "all");
    const onClickFilterHeasndlerActive = () => props.changeFilter( "active");
    const onClickFilterHeasndlerCompleted = () =>
        props.changeFilter( "completed");

    const addTaskHandler = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle != "") {
            props.addTask(title);
        } else {
            setEror(true);
        }

        setTitle("");
    };

    const onCHahceHeandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setEror(false);
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHeadler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && !isAddTaskBtnDisabled && addTaskHandler();
    // let userMessage = null
    // if (title.length > 15) {
    //     userMessage = <p style={{ color: 'red' }}> Spop! your text is too long...</p>
    // }
    // if (!title.length) {
    //     userMessage = <p style={{ color: 'blue' }}>Please, start typing...</p>
    // }
    const userMessageStartTyping: boolean | JSX.Element = title.length > 15 && (
        <p style={{ color: "red" }}> Spop! your text is too long...</p>
    );

    const userMessageLengthTitle: boolean | JSX.Element = !title.length && (
        <p style={{ color: "blue" }}>Please, start typing...</p>
    );

    const isAddTaskBtnDisabled = title.length > 15 || !title.length;

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "inpur-error" : undefined}
                    value={title}
                    onChange={onCHahceHeandler}
                    onKeyDown={onKeyDownHeadler}
                />
                <button
                    disabled={isAddTaskBtnDisabled}
                    onClick={addTaskHandler}
                >
                    +
                </button>
                {userMessageStartTyping}
                {userMessageLengthTitle}
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button
                    className={
                        props.filter === "all" ? "btn-filter-active" : undefined
                    }
                    onClick={onClickFilterHeasndler}
                >
                    All
                </button>
                <button
                    className={
                        props.filter === "active"
                            ? "btn-filter-active"
                            : undefined
                    }
                    onClick={onClickFilterHeasndlerActive}
                >
                    Active
                </button>
                <button
                    className={
                        props.filter === "completed"
                            ? "btn-filter-active"
                            : undefined
                    }
                    onClick={onClickFilterHeasndlerCompleted}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
