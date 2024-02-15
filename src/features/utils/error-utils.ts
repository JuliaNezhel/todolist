import { Dispatch } from "redux";
import { setErrorAC, setStatusAC } from "../../app/app-reducer";
import { ResponseType } from "../../api/todolists-api";

// generic function
export const handleServerAppError = <T>(
  dispatch: Dispatch,
  data: ResponseType<T>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC("Some error occurred"));
  }
  dispatch(setStatusAC("failed"));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(setErrorAC(error.message));
  dispatch(setStatusAC("failed"));
};
