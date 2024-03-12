const VALOR_UR = 1642.33;
const CUOTA_SOCIAL_UR = 15;
const CUOTA_GASTOS_COMUNES_UR = 1500;

let socios = [];
let sistemaSocios = new SistemaSocios();

let tesorero = prompt("Ingrese su nombre de usuario:");
let pass = prompt("Ingrese su contraseña:");

while (tesorero !== "yama" || pass !== "1234") {
  alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
  tesorero = prompt("Ingrese su nombre de usuario:");
  pass = prompt("Ingrese su contraseña:");
}

alert("¡Bienvenido, " + tesorero + "!");
let continuar = true;

while (continuar) {
  let opcion = prompt(
    "¿Qué desea hacer?\n1. Agregar socio\n2. Realizar cuota a todos los socios\n3. Realizar pago\n4. Salir"
  );

  switch (opcion) {
    case "1":
      sistemaSocios.agregarSocio();
      break;
    case "2":
      sistemaSocios.agregarCuotasAMes();
      break;
    case "3":
      sistemaSocios.realizarPago();
      break;
    case "4":
      continuar = false;
      break;
    default:
      alert("Opción no válida.");
  }
}
console.log(sistemaSocios.socios);
