class Socio {
    constructor(numeroSocio, nombreSocio, vivienda, tipoCuota, amortizacion, porcentajeDescuento) {
        this.numeroSocio = numeroSocio;
        this.nombreSocio = nombreSocio;
        this.vivienda = vivienda;
        this.tipoCuota = tipoCuota;
        this.amortizacion = amortizacion;
        this.porcentajeDescuento = porcentajeDescuento;
        this.cuotas = []; 
    }
}