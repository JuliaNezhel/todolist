import { ChangeEvent, useState } from "react"

type PropsType = {
    oldTitle: string
    callBAck: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {

    let [newTitle, setNewTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            props.callBAck(newTitle)
        }
    }



    return (
        edit
            ? <input value={newTitle} onChange={onChangeHandler} onBlur={editHandler} autoFocus />
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    )
}