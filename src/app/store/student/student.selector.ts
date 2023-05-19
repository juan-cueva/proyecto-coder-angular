import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Student } from "src/app/shared/model/student";
import { appReducer } from "../app.reducer";

export const selectStudentState = createFeatureSelector<Student>('studentState');
 