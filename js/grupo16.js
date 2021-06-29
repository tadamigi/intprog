//variables globales juego
var canvas, ctx;
var puntos=0, vidas=3;

//Posiciones fondos
var posA=0, posB=0;

// Instancias de imagenes
var imgPersonajeMono = new Image();
var imgPersonajeCazador = new Image();
var imgPlataforma = new Image();
var imgBanana = new Image();
var imgBananaOro = new Image();
var imgBananaPodrida = new Image();


//canvas + imagenes
function dibujar(){
	document.getElementById('canvas').style.backgroundImage = "url(img/fondo_2.png), url(img/fondo.png)"
    document.getElementById('canvas').style.backgroundRepeat = "repeat-x, repeat"
    document.getElementById('canvas').style.backgroundPosition = "0px 290px, 0px 0px"
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
		
	imgPersonajeMono.src = 'img/mono_sprite.png';
	imgPersonajeMono.onload = function(){
		ctx.drawImage(imgPersonajeMono, 350, 300)
	}
    
	imgPersonajeCazador.src = 'img/cazador_sprite.png';
	imgPersonajeCazador.onload = function(){
		ctx.drawImage(imgPersonajeCazador, 25, 280)
	}
}


//Funciones movimientos personaje
function salta(){
    console.log("Monito Salta");
};
function adelante(){
    console.log("Monito Avanza");
    posA-=5;
    posB = posA*1.5
    canvas.style.backgroundPosition = posB+"px 290px, "+posA+"px 0px"
    console.log(posA+" "+posB)
};
function atras(){
    console.log("Monito Retrocede")
    //posA+=5;
    //posB = posA*1.5
    //document.getElementById('canvas').style.backgroundPosition = posB+"px 290px, "+posA+"px 0px"
    //console.log(posA+" "+posB) 
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