
export interface UsuarioModel{
    id?: any;
    cuenta: string,
    clave: string;
    tipoUsuario : string;
    estado? : boolean | null;
    nombre: string;
    estados?: string;
}