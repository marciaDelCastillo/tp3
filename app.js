/* COMANDOS A UTILIZAR:
node app listar
node app listarporEstado nombreEstado
node app agregar nombreTitulo nombreEstado
node app eliminarElemento nombreTitulo
node app buscarPorIndice indice
node app buscarElemento nombreTitulo
node app buscarTexto texto // busca porcion de texto en los titulos de las tareas
node app contar
node app contarPorEstado
node app eliminarTodo
node app modificarEstado nombreTitulo nombreEstado */

//requiero modulo funcionesDeTareas
const funciones = require("./funcionesDeTareas");

//recibo comandos
if(process.argv.length>2)   
{
    switch(process.argv[2]){
        case 'listar':
            funciones.listar();
            break;
        case 'listarPorEstado':
            process.argv.length>=4 ? 
            funciones.listarPorEstado(process.argv[3]):console.log("Error, faltan datos");
            break;
        case 'agregar':
            process.argv.length>=5 ?
            funciones.agregar(process.argv[3], process.argv[4]): process.argv.length>=4 ? funciones.agregar(process.argv[3]) : console.log("Error, faltan datos");
            break;
        case 'eliminarElemento':
            process.argv.length>=4 ?
            funciones.eliminarElemento(process.argv[3]):console.log("Error, faltan datos");
            break;
        case 'buscarPorIndice':
            process.argv.length>=4 ?
            funciones.buscarPorIndice(process.argv[3]):console.log("Error, faltan datos");
            break;
        case 'buscarElemento':
            process.argv.length>=4 ?
            funciones.buscarElemento(process.argv[3]):console.log("Error, faltan datos");
            break;
        case 'buscarTexto':
            process.argv.length>=4 ?
            funciones.buscarTexto(process.argv[3]):console.log("Error, faltan datos");
            break;
        case 'contarPorEstado':
            process.argv.length>=4 ?
            funciones.contarPorEstado(process.argv[3]):console.log("Error, faltan datos");
            break;
        case 'eliminarTodo':
            funciones.eliminarTodo();
            break;
        case 'contar':
            funciones.contar();
            break;
        case 'modificarEstado':
            process.argv.length>=5 ?
            funciones.modificarEstado(process.argv[3], process.argv[4]):console.log("Error, faltan datos");
            break;
        default:
            //codigo
            console.log("No entiendo qué quieres hacer");
    }
}
else
{
    console.log("Atención - Tienes que pasar una acción");
}

