export class User {
    constructor(
        public id: string,
        public password: string, 
        public nombres: string, 
        public activo: boolean,
        public rol: number
    ) {}
}