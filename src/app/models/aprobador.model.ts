

export class Aprobador{
    constructor(
        public apr_entidad: string,
        public apr_nivel: number,
        public apr_usuario: string,
        public apr_monto_mn: number,
        public apr_monto_usd: number,
        public apr_tc: number,
        public apr_activo: boolean,
        public apr_apr_usuario: string,
        public apr_apr_fecha: string,
        public apr_apr_hora: string
    ){
        
    }
  
}