const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data)); // primero se coloca la ubicación donde deseas que se guarde y luego va los datos que se guardarán
    
}

const leerDB = () => {
    //verificando si existe el archivo
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    // console.log(data);

    return data;
}

//exportando
module.exports = {
    guardarDB,
    leerDB
}