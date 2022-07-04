
export class Catalogo{
    constructor(
        public cat_parte: string,
        public cat_parte_desc: string,
        public cat_um: string,
        public cat_lnprod: string,
        public cat_status: string,
        public cat_inventariable: string,
        public cat_cuenta: string,
        public cat_subcuenta: string,
        public cat_cc: string,
        public cat_usuario: string,
        public cat_fecha: string,
        public cat_hora: string,
        public cat_diferencia: string
    ){
        
    }
    public Activo: boolean = false;
}