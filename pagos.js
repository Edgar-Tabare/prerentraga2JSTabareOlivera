let continuar = true;

while (continuar) {
    let opcion = prompt("¿Qué desea hacer?\n1. Agregar socio\n2. Realizar cuota a todos los socios\n3. Realizar pago\n4.  Salir");

    switch (opcion) {
        case "1":
            let numeroSocio = parseInt(prompt("Ingrese el número de socio:"));
            let nombreSocio = prompt("Ingrese el nombre del socio:");
            let vivienda = prompt("Ingrese el numero de vivienda:");
            let tipoCuota = prompt("Ingrese el tipo de cuota:\n1. Común\n2. Especial");
            if (tipoCuota !== "1" && tipoCuota !== "2") {
                alert("Opción no válida.");
                continue;
            }
            tipoCuota = tipoCuota === "1" ? "Común" : "Especial";
            agregarSocio(numeroSocio, nombreSocio, vivienda, tipoCuota);
            break;
        case "2":
            let mesCuota = prompt("Ingrese el mes para la cuota:");
            let cuotaSocial = CUOTA_SOCIAL_UR;
            let cuotaGastosComunes = CUOTA_GASTOS_COMUNES_UR;
            agregarCuotasAMes(mesCuota, cuotaSocial, cuotaGastosComunes);
            break;
            case "3":
                let numSoc = parseInt(prompt("Ingrese el número de socio:"));
                const socio = socios.find(socio => socio.numeroSocio === numSoc);
                if (!socio) {
                    alert(`El socio con número ${numSoc} no existe.`);
                    break;
                }
            
                let totalDeuda = 0;
                let detallesDeuda = `Detalles de la deuda del socio ${socio.nombreSocio}:\n`;
                socio.cuotas.forEach(cuota => {
                    detallesDeuda += `Mes: ${cuota.mes}, Cuota Social: ${cuota.cuotaSocial} UR, Cuota Gastos Comunes: ${cuota.cuotaGastosComunes} UR\n`;
                    totalDeuda += cuota.cuotaSocial + cuota.cuotaGastosComunes;
                });
                alert(`La deuda total del socio ${socio.nombreSocio} es de ${totalDeuda} UR.\n\n${detallesDeuda}`);
            
                let montoPago = parseFloat(prompt("Ingrese el monto del pago:"));
                if (isNaN(montoPago) || montoPago <= 0) {
                    alert("Monto de pago inválido.");
                    break;
                }
            
                let saldoPendiente = totalDeuda - montoPago;
                if (saldoPendiente < 0) {
                    alert(`El monto ingresado es mayor que la deuda total.`);
                    break;
                }
            
                alert(`El socio ${socio.nombreSocio} ha pagado ${montoPago} UR.`);
            
                // Descuento del monto pagado de la deuda más antigua
                for (let i = socio.cuotas.length - 1; i >= 0; i--) {
                    const cuota = socio.cuotas[i];
                    const montoCuota = cuota.cuotaSocial + cuota.cuotaGastosComunes;
                    if (montoPago >= montoCuota) {
                        montoPago -= montoCuota;
                        socio.cuotas.splice(i, 1);
                    } else {
                        cuota.cuotaSocial -= montoPago;
                        break;
                    }
                }
            
                alert(`Queda una deuda pendiente de ${saldoPendiente} UR.`);
                break;
        case "4":
            continuar = false;
            break;
        default:
            alert("Opción no válida.");
    }
}
console.log(socios);