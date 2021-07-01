//variables globales
var canvas, ctx;
var puntos = 0,
    vidas = 3;
var intervalo;

//Variables físicas
var velocidad = 3;
var gravedad = 0.5;
var velocidadCazador = 1;

//Posiciones fondos
var posA = 0,
    posB = 0,
    posC = 0,
    posD = 0,
    posE = 0;

var posPlataformaUno;
var posPlataformaDos;

// Instancias de imagenes
var imgPersonajeMono = new Image();
var imgPersonajeMonoIzq = new Image();
var imgPersonajeCazador = new Image();
var imgPlataforma = new Image();
var imgPlataformaDos = new Image();
var imgBanana = new Image();
var imgBananaOro = new Image();
var imgBananaPodrida = new Image();

//SRC Imagenes
var srcImgMono = 'img/monoSpritemono.png';
var srcImgMonoFlipped = "img/monoSpritemono_flipped.png";
var srcImgCazador = 'img/cazador_sprite.png';
var srcImgPlataforma = 'img/plataforma.png';
var srcImgPlataformaDos = 'img/plataforma_2.png';

//Posicion Inicial Personaje
var posXMono = 350;
var posYMono = 300;
var posXCazador = 25;
var posYCazador = 280;

//Creacion Instancias
var mono = new Personaje(posXMono, posYMono, 465, 116, 4, 2);
var cazador = new Personaje(posXCazador, posYCazador, 67, 137, 1, 1);



//canvas
function dibujar() {
    document.getElementById('canvas').style.backgroundImage = "url(img/fondo_00.png), url(img/fondo_01.png), url(img/fondo_02.png), url(img/fondo_03.png), url(img/fondo_04.png)"
    document.getElementById('canvas').style.backgroundPosition = "0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px"
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // que se dibuje al comienzo y luego entre al intervalo
    //imgPersonajeMono.onload = function() {
    //    mono.dibujar(imgPersonajeMono);
    // }
    imgPersonajeCazador.onload = function() {
        cazador.dibujar(imgPersonajeCazador);
    }

    imgPersonajeMono.src = srcImgMono;
    imgPersonajeMonoIzq.src = srcImgMonoFlipped; //por el momento flipee la imagen desde archivo, despues vemos si lo podemos hacer desde aca
    imgPersonajeCazador.src = srcImgCazador;

    

    intervalo = setInterval(function() {
        borrar();

        if (vidas == 0) {
            ctx.font = "100px impact";
            ctx.fillStyle = "#000000";
            ctx.fillText('FIN', 350, 300);
        } else {
            mono.velocidad += gravedad;
            mono.y += mono.velocidad;
            if (mono.y > 416 - mono.alto) {
                frenarSalto(416)
            }
            if (mono.orientacion == "der") {
                if (mono.corre == true){
                    mono.dibujar(imgPersonajeMono);
                }else{
                    mono.dibujaPose(imgPersonajeMono, 3);
                }
            } else {
                if (mono.corre == true){
                    mono.dibujar(imgPersonajeMonoIzq);
                }else{
                    mono.dibujaPose(imgPersonajeMonoIzq, 0);
                }
            }
            mono.actualizar();
            cazador.dibujar(imgPersonajeCazador);
        }
    }, 1000 / 25);
}

function frenarSalto(ubicacionY) {
    mono.velocidad = 0;
    mono.y = ubicacionY - mono.alto;
    mono.saltando = false;
}

//Creacion Objeto Personaje
function Personaje(x, y, ancho, alto, fotogramasTotales, tiempoPorFotograma) { // x,y, ancho, alto, fotogramas totales, framerate
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.ancho = ancho;
    this.orientacion = "der";
    this.velocidad = 0;
    this.saltando = false;
    this.corre = false

    //atributos animacion personaje
    this.fotogramasTotales = fotogramasTotales;
    this.tiempoPorFotograma = tiempoPorFotograma;
    this.contador = 0;
    this.fotogramaActual = 0;

    //metodos
    //metodo actualizar los fotogramas de animacion
    this.actualizar = function() {
        this.contador += 1;
        if (this.contador > tiempoPorFotograma) {
            this.contador = 0;
            // va pasando de fotogramas
            if (this.fotogramaActual < fotogramasTotales - 1) {
                //ir al fotograma siguiente
                this.fotogramaActual += 1;
            } else {
                //sino el siguiente es el primer fotograma
                this.fotogramaActual = 0;
            }
        }
    }


    this.dibujar = function(img) {
        ctx.drawImage(
            img,
            this.fotogramaActual * this.ancho / this.fotogramasTotales,
            0,
            this.ancho / this.fotogramasTotales,
            this.alto,
            this.x,
            this.y,
            this.ancho / this.fotogramasTotales,
            this.alto);
    }
    this.dibujaPose = function(img, fotograma){
            ctx.drawImage(
            img,
            fotograma * this.ancho / this.fotogramasTotales,
            0,
            this.ancho / this.fotogramasTotales,
            this.alto,
            this.x,
            this.y,
            this.ancho / this.fotogramasTotales,
            this.alto);
    }
    this.derecha = function() {
        if (this.x == 350) {
            // movimiento del fondo
            posA -= 7;
            posB = posA * 0.5;
            posC = posB * 0.5;
            posD = posC * 0.5;
            posE = posD * 0.5;
            canvas.style.backgroundPosition = posA + "px 0px, " + posB + "px 0px, " + posC + "px 0px, " + posD + "px 0px, " + posE + "px 0px";
        } else {
            this.x += 7;
            this.orientacion = "der"
        }
    }
    this.izquierda = function() {
        if (this.x >= 30) {
            this.x -= 7;
            this.orientacion = "izq"
        }
    }
    this.saltar = function() {
        if (this.saltando == false) {
            this.saltando = true;
            this.velocidad -= velocidad * 4.5;
        } else {
            if (this.y == 300) {
                this.saltando = false;
                this.velocidad = 0;
            }
        }
    }

}

//Objeto Plataformas
function Plataforma(x, y, ancho, alto) {
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.ancho = ancho;
    this.dibujar = function(img) {
        ctx.drawImage(img, this.x, this.y, this.ancho, this.alto)
    }
}
//Objeto Bananas
function Banana(x, y, tipo, ancho, alto) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.alto = alto;
    this.ancho = ancho;
    this.dibujar = function(img) {
        ctx.drawImage(img, this.x, this.y, this.ancho, this.alto)
    }
}

function borrar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



//Esc a menu
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
        console.log("Salir a menu")
    }
});

//Inputs Movimiento personaje
document.addEventListener('keydown', function(e) {
    //    console.log(e)
    switch (e.keyCode) {
        case 38:
            mono.saltar();
            break;
        case 87:
            mono.saltar();
            break;
        case 32:
            mono.saltar();
            break;
        case 39:
            mono.derecha();
            setTimeout(function(){
                mono.corre = true;
            },80);
            break;
        case 68:
            mono.derecha();
            setTimeout(function(){
                mono.corre = true;
            },80);
            break;
        case 37:
            mono.izquierda();
            setTimeout(function(){
                mono.corre = true;
            },80);
            break;
        case 65:
            mono.izquierda();
            setTimeout(function(){
                mono.corre = true;
            },80);
            break;
    }
});
document.addEventListener('keyup', function(e) {
    //    console.log(e)
    switch (e.keyCode) {
        case 38:
            
            break;
        case 87:
            
            break;
        case 32:
            
            break;
        case 39:
            
            mono.corre = false;
            break;
        case 68:
            
            mono.corre = false;
            break;
        case 37:
            mono.corre = false;
            break;
        case 65:
            mono.corre = false;
            break;
    }
}); 


//Mouse Menu [cambiar document por el id del boton que pulse]
document.addEventListener('click', function(o) {
    //    console.log(o)
    console.log("Click")
});