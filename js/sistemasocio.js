class SistemaSocios {
    constructor() {
      this.socios = [];
      this.cuota = [];
      this.vivienda= []
    }
    agregarSocio() {
      let numeroSocio, nombreSocio, vivienda, tipoCuota, amortizacion, porcentajeDescuento;
  
      do {
          const inputNumeroSocio = prompt("Ingrese el número de socio:");
          if (!inputNumeroSocio || isNaN(inputNumeroSocio)) {
              alert("Por favor, ingrese un número de socio válido solo se aceptan valores númericos.");
              continue;
          }
          numeroSocio = parseInt(inputNumeroSocio);
  
          const socioExistente = this.socios.find(socio => socio.numeroSocio === numeroSocio);
          if (socioExistente) {
              alert("El número de socio ya está registrado. Por favor, ingrese otro número.");
              continue;
          }
  
          nombreSocio = prompt("Ingrese el nombre del socio:");
          if (!/^[a-zA-Z\s]+$/.test(nombreSocio)) {
              alert("El nombre del socio solo puede contener letras y espacios.");
              continue;
            }
          vivienda = prompt("Ingrese el numero de vivienda:");
  
       
          const viviendaExistente = this.socios.find(socio => socio.vivienda.includes(vivienda));
          if (viviendaExistente) {
              alert("El número de vivienda ya está asignado a otro socio. Por favor, ingrese otro número de vivienda.");
              continue;
          }
  
          tipoCuota = prompt("Ingrese el tipo de cuota:\n1. Común\n2. Especial");
  
          if (tipoCuota !== "1" && tipoCuota !== "2") {
              alert("Opción no válida.");
              return;
          }
  
          amortizacion = false;
          porcentajeDescuento = 0;
  
          if (tipoCuota === "2") {
              amortizacion = confirm("¿Desea aplicar amortización?");
              if (amortizacion) {
                  porcentajeDescuento = parseFloat(prompt("Ingrese el porcentaje de descuento para amortización:"));
              }
          }
  
          tipoCuota = tipoCuota === "1" ? "Común" : "Especial";
  
          let socio = new Socio(numeroSocio, nombreSocio, vivienda, tipoCuota, amortizacion, porcentajeDescuento);
  
          this.socios.push(socio);
  
        
          break;
  
      } while (true);
  }
    
  
    agregarCuotasAMes() {
      let mes = prompt("Ingrese el mes:");
      let cuotaSocial = CUOTA_SOCIAL_UR;
      for (let socio of this.socios) {
        let amortizacion = socio.amortizacion;
        let cuotaGastosComunes = CUOTA_GASTOS_COMUNES_UR;
        let porcentajeDescuento = socio.porcentajeDescuento;
        this.agregarCuota(
          socio.numeroSocio,
          mes,
          cuotaSocial,
          CUOTA_GASTOS_COMUNES_UR,
          amortizacion,
          porcentajeDescuento
        );
      }
    }
  
    agregarCuota(
      numeroSocio,
      mes,
      cuotaSocial,
      cuotaGastosComunes,
      amortizacion = false,
      porcentajeDescuento = 0
    ) {
      let socio = this.socios.find((socio) => socio.numeroSocio === numeroSocio);
      if (socio) {
        let cuotaFinal = cuotaSocial * VALOR_UR;
        if (amortizacion) {
          cuotaFinal -= (cuotaFinal * porcentajeDescuento) / 100;
        }
        socio.cuotas.push({
          mes: mes,
          cuotaSocial: cuotaFinal,
          cuotaGastosComunes: cuotaGastosComunes,
        });
      } else {
        alert("El socio con número " + numeroSocio + " no existe.");
      }
    }
    realizarPago() {
      let numSocioPago = parseInt(prompt("Ingrese el número de socio:"));
      console.log("Número de socio ingresado:", numSocioPago); 
  
      const socio = this.socios.find(
        (socio) => socio.numeroSocio === numSocioPago
      );
      if (!socio) {
        alert(`El socio con número ${numSocioPago} no existe.`);
        return;
      }
  
      console.log("Socio encontrado:", socio); 
      let totalDeuda = 0;
      let detallesDeuda = `Detalles de la deuda del socio ${socio.nombreSocio}:\n`;
      socio.cuotas.forEach((cuota) => {
        detallesDeuda += `Mes: ${cuota.mes}, Cuota Social: ${cuota.cuotaSocial} UR, Cuota Gastos Comunes: ${cuota.cuotaGastosComunes} UR\n`;
        totalDeuda += cuota.cuotaSocial + cuota.cuotaGastosComunes;
      });
  
      console.log("Total de deuda:", totalDeuda); 
      console.log("Detalles de deuda:", detallesDeuda); 
  
      alert(
        `La deuda total del socio ${socio.nombreSocio} es de ${totalDeuda} UR.\n\n${detallesDeuda}`
      );
  
      let montoPago = parseFloat(prompt("Ingrese el monto del pago:"));
      console.log("Monto de pago ingresado:", montoPago); 
  
      if (isNaN(montoPago) || montoPago <= 0) {
        alert("Monto de pago inválido.");
        return;
      }
  
      if (montoPago < totalDeuda) {
        alert(`El monto ingresado es menor que la deuda total. Queda por pagar ${totalDeuda - montoPago} UR.`);
        return;
      }
  
      const cambio = montoPago - totalDeuda;
      console.log("Cambio:", cambio); 
      alert(
        `El socio ${socio.nombreSocio} ha pagado su deuda de ${totalDeuda} UR. Su cambio es de ${cambio} UR.`
      );
      socio.cuotas = []; 
  
      
      alert(`Saldo pendiente:\n${this.detalleSaldoPendiente(socio)}`);
      
      listarDetallesPago(numSocioPago, this.socios);
    }
  
    detalleSaldoPendiente(socio) {
      let saldoPendiente = 0;
      let detallesSaldo = `Detalles de saldo pendiente del socio ${socio.nombreSocio}:\n`;
      socio.cuotas.forEach((cuota) => {
        saldoPendiente += cuota.cuotaSocial + cuota.cuotaGastosComunes;
        detallesSaldo += `Mes: ${cuota.mes}, Cuota Social: ${cuota.cuotaSocial} UR, Cuota Gastos Comunes: ${cuota.cuotaGastosComunes} UR\n`;
      });
      detallesSaldo += `Saldo pendiente total: ${saldoPendiente} UR`;
      return detallesSaldo;
    }
  }
  
  const listarDetallesPago = (numeroSocio, socios) => {
    const socio = socios.find((socio) => socio.numeroSocio === numeroSocio);
    if (socio) {
      let detalles = `Detalles de pago del socio ${socio.nombreSocio}:\n`;
      socio.cuotas.forEach((cuota) => {
        detalles += `Mes: ${cuota.mes}, Cuota Social: ${cuota.cuotaSocial} UR, Cuota Gastos Comunes: ${cuota.cuotaGastosComunes} UR\n`;
      });
      alert(detalles);
    } else {
      alert(`El socio con número ${numeroSocio} no existe.`);
    }
  };
 