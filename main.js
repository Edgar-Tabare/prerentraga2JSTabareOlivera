const VALOR_UR = 1642.33;
const CUOTA_SOCIAL_UR = 15;
const CUOTA_GASTOS_COMUNES_UR = 1500;
let socios = [];

    let tesorero = prompt("Ingrese su nombre de usuario:");
    let pass = prompt("Ingrese su contraseña:");
    
    while (tesorero !== "yama" || pass !== "1234") {
        alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        tesorero = prompt("Ingrese su nombre de usuario:");
        pass = prompt("Ingrese su contraseña:");
    }

    alert("¡Bienvenido, " + tesorero + "!");
