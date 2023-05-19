import { createAction, props } from "@ngrx/store";
import { Student } from "src/app/shared/model/student";

export const guardarEstudiante = createAction('[Student] Guardar estudiante', props<{ updatedValue :Student}>());