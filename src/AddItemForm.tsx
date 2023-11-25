import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, KeyboardEvent, useState } from "react";

type PropsType = {
    callBack: (title: string) => void;

}

export const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState("");
    const [error, setEror] = useState<boolean>(false);
    const maxLenghtText = 20

    const onCHahceHeandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setEror(false);
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHeadler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && !isAddTaskBtnDisabled && addTask();

    const isAddTaskBtnDisabled = title.length > maxLenghtText || !title.length;



    const addTask = () => {
        let trimmedTitle = title.trim();
        if (trimmedTitle != "" && title.length < maxLenghtText) {
            props.callBack(title);
            setTitle("");
        } else {
            setEror(true);
        };
    };

    const styleBtn = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px'
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={error ? error : 'Type text...'}
                variant="outlined"
                size="small"
                error={!!error}
                value={title}
                onChange={onCHahceHeandler}
                onKeyDown={onKeyDownHeadler}
                helperText={title.length > maxLenghtText ? "Spop! your text is too long..." : ''} />

            <Button variant="contained"
                disabled={isAddTaskBtnDisabled}
                onClick={addTask}
                style={styleBtn}>+</Button>
        </div>
    )
}