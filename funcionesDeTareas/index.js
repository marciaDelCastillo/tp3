//requiero modulo filesystem. leo tareas.json
const fs = require("fs");
let tareas = JSON.parse(fs.readFileSync("./db/tareas.json", "utf-8"));


module.exports = 
{
    obtenerProximoId : function(){
        if(tareas.length>0){
            return (Number(tareas[tareas.length-1].id)+1);
        }else{
            return 1;
        }      
    },
    validarTitulo : function(titulo){
        let indice = -1;
        for(let i=0;i<tareas.length;i++){
            tareas[i].titulo == titulo ? indice=i : "";
        }
        return indice;
    },
    validarEstado : function(estado){
        switch(estado){
            case 'En progreso':
            case 'Pendiente':
            case 'Terminada':
                return true; //estado valido
                break;
            default:
                return false; //estado invalido
        }
    },
    guardarArchivo : function(archivoNuevo){
        fs.writeFileSync("./db/tareas.json", JSON.stringify(archivoNuevo), "utf-8");
    },
    listar : () =>  {
        console.log(" LISTA DE TAREAS      ");
        console.log("------------------------------");
        tareas.forEach(tarea => console.log(`- ${tarea.titulo}: ${tarea.estado}`));
    },
    listarPorEstado : (estado) =>  {
        console.log(" LISTA DE TAREAS EN ESTADO: "+estado);
        console.log("-------------------------------------------------");
        tareas.forEach(tarea => tarea.estado == estado ? console.log(`- ${tarea.titulo}: ${tarea.estado}`): "");
    },
    agregar : function(titulo, estado="Pendiente") {
        if(this.validarEstado(estado)){
            if(this.validarTitulo(titulo)== -1){ //titulo disponible
                let tareaNueva = {
                    id : this.obtenerProximoId(),
                    titulo : titulo,
                    estado : estado,
                }
                tareas.push(tareaNueva);
                this.guardarArchivo(tareas);
                console.log("Elemento guardado con éxito");
            }
            else{
                console.log("Ya existe una tarea almacenada con ese nombre");
            }
            
        }else{
            console.log("Estado incorrecto");
        }
    },
    eliminarElemento : function(titulo) {
        let indice = this.validarTitulo(titulo);
        if(indice != -1){
            tareas.splice(indice,1);
            this.guardarArchivo(tareas);
            console.log("Elemento eliminado con éxito");
        }else{
            console.log("El elemento ingresado no se encuentra en la base de datos");
        }
    },
    buscarPorIndice : (indice) =>  {
        indice<tareas.length ? console.log(`El índice ${indice} corresponde a la tarea ${tareas[indice].titulo}, en estado: ${tareas[indice].estado}`):console.log("El índice  ingresado excede a la cantidad de tareas almacenadas");
    },
    buscarElemento : function(titulo) {
        let indice = this.validarTitulo(titulo);
        indice>=0 ? console.log(`El título ${titulo} se encuentra en el índice ${indice} y su estado actual es: ${tareas[indice].estado}`):console.log("El título ingresado no se encuentra en la base de datos");

    },
    buscarTexto : function(texto) {
        console.log("Tareas que incluyen el texto: "+texto);
        console.log("-------------------------------------------------");
        tareas.forEach(tarea => tarea.titulo.includes(texto) ? console.log(`- ${tarea.titulo}: ${tarea.estado}`) : "");
    },
    contar : () =>  {
        console.log(`El archivo tiene ${tareas.length} tareas almacenadas.`);
    },
    contarPorEstado : function(estado)  {
        if(this.validarEstado(estado)){
            let contador = 0; 
            tareas.forEach(tarea=> tarea.estado == estado ? contador++ : "");
            console.log(`Hay ${contador} tareas que se encuentran en estado: ${estado}`);
        }else{
            console.log("Estado incorrecto");
        }      
    },
    eliminarTodo : function() {
        this.guardarArchivo([]);
        console.log("Lista completa eliminada con éxito");
    },
    modificarEstado : function(titulo, estado) {
        if(this.validarEstado(estado)){
            let indice = this.validarTitulo(titulo);
            if(indice != -1){
                tareas[indice].estado = estado;
                this.guardarArchivo(tareas);
                console.log("Estado modificado con éxito");
            }
            else{
                console.log("El título ingresado no se encuentra en la base de datos");
            }
        }
        else{
            console.log("Estado incorrecto");
        }
    },


}

