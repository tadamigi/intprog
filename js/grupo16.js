//variables globales
var canvas, ctx;
var puntos=0, vidas=3;
var intervalo;

//Variables físicas
var velocidad = 3;
var gravedad = 0.5;

//Posiciones fondos
var posA=0, posB=0, posC=0, posD=0, posE=0; 

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
var srcImgMono = 'img/mono_sprite.png';
var srcImgCazador = 'img/cazador_sprite.png';
var srcImgPlataforma = 'img/plataforma.png';
var srcImgPlataformaDos = 'img/plataforma_2.png';

//Posicion Inicial Personaje
var posXMono = 350;
var posYMono = 300;
var posXCazador = 25;
var posYCazador = 280;

//Creacion Instancias
var mono = new Personaje(posXMono, posYMono, 99, 116);
var cazador = new Personaje(posXCazador, posYCazador, 67, 137);



//canvas
function dibujar(){
	document.getElementById('canvas').style.backgroundImage = "url(img/fondo_00.png), url(img/fondo_01.png), url(img/fondo_02.png), url(img/fondo_03.png), url(img/fondo_04.png)"
    document.getElementById('canvas').style.backgroundPosition = "0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px"
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
		
	imgPersonajeMono.src = srcImgMono;
	imgPersonajeMono.onload = function(){
		ctx.drawImage(imgPersonajeMono, posXMono, posYMono);
	}
    imgPersonajeMonoIzq.src = srcImgMono;
    imgPersonajeMonoIzq.style.transform = "scaleX(-1)";
    
	imgPersonajeCazador.src = srcImgCazador;
	imgPersonajeCazador.onload = function(){
		ctx.drawImage(imgPersonajeCazador, posXCazador, posYCazador)
	}

    intervalo = setInterval(function(){
        borrar();
        if(vidas==0){
			ctx.font="100px impact";
			ctx.fillStyle="#000000";
			ctx.fillText('FIN', 350,300);
        }else{
            mono.velocidad += gravedad;
            mono.y += mono.velocidad;
            if (mono.y > 410 - mono.alto){
                frenarSalto(410)
            }
            if (mono.orientacion == "der"){
                mono.dibujar(imgPersonajeMono);
            }else{
                mono.dibujar(imgPersonajeMonoIzq);
            }
            
            cazador.dibujar(imgPersonajeCazador);
        }
    }, 1000/25);
}

function frenarSalto(ubicacionY){
    mono.velocidad = 0;
    mono.y = ubicacionY - mono.alto;
    mono.saltando = false;
}

//Creacion Objeto Personaje
function Personaje(x, y, ancho, alto){
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.ancho = ancho;
    this.orientacion = "der";
    this.velocidad = 0;
    this.saltando = false;
    //metodos
    this.dibujar = function(img){
        ctx.drawImage(img, this.x, this.y, this.ancho, this.alto)
    }
    this.derecha = function(){
        if (this.x == 350) {
            posA -= 7;
            posB = posA*0.5;
            posC = posB*0.5;
            posD = posC*0.5;
            posE = posD*0.5;
            canvas.style.backgroundPosition = posA+"px 0px, "+posB+"px 0px, "+posC+"px 0px, "+posD+"px 0px, "+posE+"px 0px";
        }else{
        this.x += 7;
        this.orientacion = "der"
        }
    }
    this.izquierda = function(){
        if (this.x >= 30){
            this.x -= 7;
            this.orientacion = "izq"
        }
    }
    this.saltar = function(){
        if (this.saltando == false) {
            this.saltando = true;
            this.velocidad -= velocidad * 4.5;
        }else{
            if (this.y == 300) {
                this.saltando = false;
                this.velocidad = 0;
            }
        }
    }

}

//Objeto Plataformas
function Plataforma (x, y, ancho, alto){
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.ancho = ancho;
    this.dibujar = function(img){
        ctx.drawImage(img, this.x, this.y, this.ancho, this.alto)
    }
}

function borrar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}



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
            break;
        case 68:
            mono.derecha();
            break;
        case 37:
            mono.izquierda();
            break;
        case 65:
            mono.izquierda();
            break;
    }
    });

    //Mouse Menu [cambiar document por el id del boton que pulse]
document.addEventListener('click', function(o){
//    console.log(o)
    console.log("Click")
    });