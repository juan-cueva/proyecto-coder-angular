import { Action, State, createReducer, on } from "@ngrx/store";
import { guardarEstudiante } from "./student.actions";
import { Student } from "src/app/shared/model/student";

const initialState: Student = {
    id: 0,
    nombre: '',
    apellido: '',
    edad: 0,
    correo: '',
    estaActivo: false,
    cursando: []
};

export const studentReducer = createReducer(
    initialState,
    on(guardarEstudiante, (state, {updatedValue}) => updatedValue ),
);
