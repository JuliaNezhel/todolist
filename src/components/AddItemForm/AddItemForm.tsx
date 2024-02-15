import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

type PropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = memo((props: PropsType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onCHahceHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (title.trim() != "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const styleBtn = {
    maxWidth: "38px",
    maxHeight: "38px",
    minWidth: "38px",
    minHeight: "38px",
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label={error ? error : "Type text..."}
        variant="outlined"
        size="small"
        error={!!error}
        value={title}
        onChange={onCHahceHandler}
        onKeyDown={onKeyDownHandler}
      />

      <Button variant="contained" onClick={addTask} style={styleBtn}>
        +
      </Button>
    </div>
  );
});
