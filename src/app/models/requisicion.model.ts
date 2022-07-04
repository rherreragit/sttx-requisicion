export class RequisicionMaster{
    constructor(
        public reqm_requisicion: string,
        public reqm_entidad: string,
        public reqm_descripcion: string,
        public reqm_proveedor: string,
        public reqm_moneda: string,
        public reqm_total: number,
        public reqm_status: string,
        public reqm_usuario: string,
        public reqm_fecha: string,
        public reqm_hora: string,
        public reqm_oc: string,
        public reqm_name?: string
        
    ){

    }
}

export class RequisicionDetail{
    constructor(
        public reqd_requisicion: string,
        public reqd_parte: string,
        public reqd_parte_desc: string,
        public reqd_cuenta: string,
        public reqd_subcuenta: string,
        public reqd_cc: string,
        public reqd_cantidad: number,
        public reqd_um: string,
        public reqd_precio: number,
        public reqd_total: number,
        public reqd_error_desc: string
        
    ){

    }
}

export class RequisicionTax{
    constructor(
        public reqi_requisicion: string,
        public reqi_nivel: number,
        public reqi_etiqueta: string,
        public reqi_factor: number,
        public reqi_monto: number,
        public reqi_total: number
        
    ){

    }
}

export class RequisicionAprove{
    constructor(
        public reqa_requisicion: string,
        public reqa_nivel: number,
        public reqa_usuario: string,
        public reqa_monto: number,
        public reqa_moneda: string,
        public reqa_status: string,
        public reqa_comentario: string,
        public reqa_fecha: string,
        public reqa_hora: string
        
    ){

    }
}