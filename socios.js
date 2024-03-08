
const agregarSocio = (numeroSocio, nombreSocio, vivienda, tipoCuota) => {
    socios.push({
        numeroSocio,
        nombreSocio,
        vivienda,
        tipoCuota,
        cuotas: [],
    });
};

const agregarCuotasAMes = (mes, cuotaSocial, cuotaGastosComunes) => {
    socios.forEach(socio => {
        if (socio.cuotas) {
            const cuota = {
                mes,
                cuotaSocial: cuotaSocial * VALOR_UR,
                cuotaGastosComunes,
            };
            socio.cuotas.push(cuota);
        }
    });
};

const realizarPago = (numeroSocio, tipoPago, monto) => {
 
};

const listarDetallesPago = numeroSocio => {
    const socio = socios.find(socio => socio.numeroSocio === numeroSocio);
    if (socio) {
        let detalles = `Detalles de pago del socio ${socio.nombreSocio}:\n`;
        socio.cuotas.forEach(cuota => {
            detalles += `Mes: ${cuota.mes}, Cuota Social: ${cuota.cuotaSocial} UR, Cuota Gastos Comunes: ${cuota.cuotaGastosComunes} UR\n`;
        });
        alert(detalles);
    } else {
        alert(`El socio con número ${numeroSocio} no existe.`);
    }
};