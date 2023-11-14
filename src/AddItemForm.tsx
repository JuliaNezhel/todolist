import { ChangeEvent, KeyboardEvent, useState } from "react";

type PropsType = {
    callBack: (title: string) => void;

}

export const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState("");
    const [error, setEror] = useState<boolean | string>(false);

    const onCHahceHeandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setEror(false);
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHeadler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && !isAddTaskBtnDisabled && addTask();

    const userMessageStartTyping: boolean | JSX.Element = title.length > 15 && (
        <p style={{ color: "red" }}> Spop! your text is too long...</p>
    );
    const isAddTaskBtnDisabled = title.length > 15 || !title.length;



    const addTask = () => {
        let trimmedTitle = title.trim();
        if (trimmedTitle != "") {
            props.callBack(title);
            setTitle("");
        } else {
            setEror(true);
        };
    };

    return (
        <div>
            <input
                className={error ? "inpur-error" : undefined}
                value={title}
                onChange={onCHahceHeandler}
                onKeyDown={onKeyDownHeadler}
            />
            <button
                disabled={isAddTaskBtnDisabled}
                onClick={addTask}
            >
                +
            </button>
            {userMessageStartTyping}
        </div>
    )
}