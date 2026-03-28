

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

let username = "";
let palabraSecreta = "";
let intentosRestantes = 3;
let letrasAdivinadas = [];
let bonoPuntos = 50;

const listaPalabras = [
  "Abstraccion", "Algoritmo", "Almacenamiento", "Ambiente", "Analisis", "Antivirus", "Aplicacion", "Archivo", "Arquitectura", "Arreglo", "Atributo", "Autenticacion", "Automatizacion" ,"Backups", "Binario" ,"Bitrate", "Bluetooth", "Browser", "Buscador", "Bytecode", "Cabecera", "Caracter", "Cargador", "Carpeta", "Chipset", "Ciberseguridad", "Circuito", "Cliente", "Cluster", "Codificacion", "Comando", "Compilador", "Componente", "Computacion", "Computadora", "Conector", "Conexion", "Configuracion", "Consola", "Contenedor", "Contrasena", "Controlador", "Cookies", "Cuantico", "Database", "Debugger", "Depuracion", "Desarrollo", "Descarga", "Descriptor", "Desktop", "Diagrama", "Digitalizacion", "Directorio", "Dispositivo", "Dominio", "Ejecucion", "Elemento", "Emulador", "Encapsulamiento", "Encriptacion", "Escritorio", "Estructura", "Etiqueta", "Ethernet", "Excepcion", "Extensibilidad", "Firewall", "Firmware", "Formateo", "Fragmentacion", "Framework", "Frontend", "Funcionalidad", "Hardware", "Herramienta", "Hipervinculo", "Hostpot", "Identificador", "Infraestructura", "Instancia", "Interface", "Internet", "Interprete", "Iteracion", "Joystick", "Kernel", "Libreria", "Lenguaje", "Logaritmo", "Mainframe", "Memoria", "Metadato", "Microprocesador", "Middleware", "Navegador", "Networking", "Objetivo", "Octeto", "Ofimatica"
];


function iniciarPartida(nombreJugador) {
    console.log("¡Bienvenid@ " + nombreJugador + "! Tienes " + intentosRestantes + " intentos .");
}

function verificarLetra(letraIngresada, palabraOriginal) {
    if (palabraOriginal.includes(letraIngresada)) {
        return true;
    } else {
        return false;
    }
}

function calcularPuntaje(intentosFinales, bono) {
    return intentosFinales * bono;
}

async function startGame() {
    username = await getUserInput("ingresa tu nombre");
    iniciarPartida(username);

    palabraSecreta = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    
    for (let i = 0; i < palabraSecreta.length; i = i + 1) {
        letrasAdivinadas.push("_");
    }

    while (intentosRestantes > 0 && letrasAdivinadas.includes("_")) {
        console.log("\npalabra: " + letrasAdivinadas.join(" "));
        console.log("vidas: " + intentosRestantes);

        let letra = await getUserInput("agrega una letra:");
        let letraMinuscula = letra.toLowerCase();

        if (letraMinuscula.length === 1) {
            if (verificarLetra(letraMinuscula, palabraSecreta)) {
                console.log("¡muy bien, esa es la letra!");
                for (let j = 0; j < palabraSecreta.length; j++) {
                    if (palabraSecreta[j] === letraMinuscula) {
                        letrasAdivinadas[j] = letraMinuscula;
                    }
                }
            } else {
                intentosRestantes = intentosRestantes - 1;
                console.log("letra incorrecta.");
                
                if (intentosRestantes === 1) {
                    console.log("Te queda un solo intento.");
                }
            }
        }
    }

    if (!letrasAdivinadas.includes("_")) {
        let puntos = calcularPuntaje(intentosRestantes, bonoPuntos);
        console.log("\n¡Victoria, ganaste " + username + "! Tu puntuacion es: " + puntos);
    } else {
        console.log("\n perdiste :( ). La palabra para adivinar era: " + palabraSecreta);
    }

    return rl.close();
}
startGame();

