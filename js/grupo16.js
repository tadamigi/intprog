//Funciones movimientos personaje
function salta(){
    console.log("Monito Salta")
};
function adelante(){
    console.log("Monito Avanza")
};
function atras(){
    console.log("Monito Retrocede")
};





//Esc a menu
document.addEventListener('keyup', function(e){
if(e.keyCode==27){
console.log("Salir a menu")
}
});

//Inputs Movimiento personaje
document.addEventListener('keydown', function(e){
//    console.log(e)
    switch(e.keyCode){
        case 38:
            salta()
            break;
        case 87:
            salta()
            break;
        case 32:
            salta()
            break;
        case 39:
            adelante()
            break;
        case 68:
            adelante()
            break;
        case 37:
            atras()
            break;
        case 65:
            atras()
            break;
    }
    });

    //Mouse Menu [cambiar document por el id del boton que pulse]
document.addEventListener('click', function(o){
//    console.log(o)
    console.log("Click")
    });