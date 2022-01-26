require('colors');

const mostrarMenu = () => {

    return new Promise((resolve, rejecte) => {

        console.clear();
        console.log('========================='.green);
        console.log('  Seleccione una opción  '.green);
        console.log('=========================\n'.green);

        console.log(`${ '1.'.green } Crear una tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar una tarea`);
        console.log(`${ '0.'.green } Salir \n`);

        // Creamos la intefaz
        const readline = require('readline').createInterface({
            input : process.stdin, //pausará ejecución aplicación hasta esperar y recibir unos caracteres y enter del usuario
            output: process.stdout //mostrar algún mensaje en consola cuando le estoy pidiendo algo al usuario  
        });
        // Leemos
        readline.question('Seleccione una opción: ', (opt) => {
            // console.log({opt}) //opt es lo que el usuario escribe en consola
            readline.close();
            resolve(opt);
        });

    });

}


const pausa = () => {

    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input : process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        });

    });

}


module.exports = {
    mostrarMenu, 
    pausa
}