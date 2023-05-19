import { ActionReducerMap } from "@ngrx/store";
import { studentReducer } from "./student/student.reducer";


export const appReducer: ActionReducerMap<{studentState : any}> = {
    studentState: studentReducer
}