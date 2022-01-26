const fs = require('fs');
const Tarea = require('./tarea');

/*
* _listado:
*       { 'uuid-123712-123123-2: { id:12, desc:asd, completadoEn:92231} },
*/

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        //La función Object.keys permite retornar todas las llaves 
        //que tenga ese objeto y crea un arreglo([])
        //con el forEach barro cada uno de esos strings 
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea);

        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) { 
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
        
    }

    borrarTarea(id = '') {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    //método
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        // console.log(this._listado);
        // console.log(this.listadoArr);
        // 1: en verde
        // Completada: verde
        // Pendiente: rojo

        // 1. Alma :: Completada | Pendiente
        // 2. Realidad :: Completada | Pendiente
        // 3. Poder :: Completada | Pendiente
        const arr = this.listadoArr;
        let num = 1;

        arr.forEach((arrItem) => {
            if(arrItem.completadoEn !== null) {
                console.log(`${(num + ':').green} ${arrItem.desc} :: ${'Completada'.green} | Pendiente`);
            } else {
                console.log(`${num}. ${arrItem.desc} :: Completada | ${'Pendiente'.red}`);
            }

            num ++;
        });

        //Usamos Object.keys para objetos cuando no sabemos cómo se llama la llave
        // console.log(this._listado);
        // console.log(Object.keys(this._listado)); //devuelve un array de id's
        /* const arr1 = Object.keys(this._listado);
        for(let value of arr1) {
            // console.log(value);
            let item = this._listado[value].desc;
            console.log(item);
            
        } */

        //Forma del profesor:
        /* this.listadoArr.forEach((tarea, i) => {
            
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
                                
            console.log(`${idx} ${desc} :: ${estado}`);
        }); */

    }

    listarPendientesCompletadas(completadas = true) {
        console.log();

        const arr = this.listadoArr;
        let contador = 0;

        arr.forEach((arrItem, i) => {

            if(completadas) {
                if(arrItem.completadoEn != null) {
                    //mostrar completadas
                    contador ++;
                    console.log(`${(contador + '.').green} ${arrItem.desc} :: ${(arrItem.completadoEn).green}`);
                }
            } else {
                if(arrItem.completadoEn === null) {
                    //mostrar pendientes
                    contador ++;
                    console.log(`${contador.toString().green}. ${arrItem.desc} :: ${'Pendiente'.red}`);
                }
            }

        });

    }

    //Aquí se cambiará estado de Completado | Pendiente de la tarea
    //es como hacer un editar
    toogleCompletadas(ids = []) {

        //aquí cambia estado a COMPLETADO
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        }
        );

        //aquí cambia estado a PENDIENTE
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }

}


module.exports = Tareas;