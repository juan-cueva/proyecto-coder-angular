import { Curso } from "./curso";

export class Student {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public edad: number,
        public correo: string,
        public estaActivo: boolean,
        public cursosFinalizados: Curso[]
    ) {}
}
