import { ChangeEvent, memo, useState } from "react";
import TextField from "@mui/material/TextField";

type PropsType = {
  value: string;
  onChange: (title: string) => void;
};

export const EditableSpan = memo((props: PropsType) => {
  let [newTitle, setNewTitle] = useState(props.value);
  const [edit, setEdit] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const editHandler = () => {
    setEdit(!edit);
    if (edit) {
      props.onChange(newTitle);
    }
  };

  return edit ? (
    <TextField
      value={newTitle}
      onChange={onChangeHandler}
      onBlur={editHandler}
      size="small"
      autoFocus
    />
  ) : (
    <span onDoubleClick={editHandler}>{props.value}</span>
  );
});
