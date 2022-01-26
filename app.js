// Primero se recomienda que vayan las importaciones 
// de paquetes de terceros y luego las nuestras
require('colors'); 
// const {mostrarMenu, pausa} = require('./helpers/mensajes'); //era demostración
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');


const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB) { //cargar las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        // console.log({opt}); 

        switch(opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripción:');
                // console.log({desc});
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr);
            break;
            case '3': //listar completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': //listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': // completado | pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                // console.log({ids});
                tareas.toogleCompletadas(ids);
            break;
            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                // console.log({id});
                if(id !== '0'){
                    //TODO: preguntar si está seguro
                    const ok = await confirmar('¿Está seguro?');
                    // console.log({ok});
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr); //aquí se guarda en la base de datos
        await pausa();
        
        // if(opt !== '0') await pausa();

    } while( opt !== '0');

    // pausa();

}


main();