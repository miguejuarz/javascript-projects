//inicializacion de variables
let targetasDestapadas = 0;
let targeta1 = null;
let targeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let TiempoRegresivoId = null;
let timerInicial =30;


//Apuntando a doc html
let mostrarMovimientos = document.getElementById('movimientos'); 
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t.restante');


//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

numeros = numeros.sort(()=>{return Math.random() - 0.5})

//funcione
function contarTiempo() {
  TiempoRegresivoId = setInterval(()=>{
        timer --;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(TiempoRegresivoId);
            bloquearTargetas();
            alert("PERDEDOR")
        }
    },1000)
}

function bloquearTargetas(){
    for(let i = 0; i <= 15 ; i++){
        let targetaBloqueada = document.getElementById(i);
        targetaBloqueada.innerHTML = numeros[i];
        targetaBloqueada.disabled = true;
    }
}

console.log(numeros); 


//funcion principal
function destapar(id ) {

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    targetasDestapadas ++;
    console.log(targetasDestapadas);

    if(targetasDestapadas == 1) {
        //mostrar primer numero
        targeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        targeta1.innerHTML = primerResultado;

        //deshabilitar primer boton
        targeta1.disabled = true;
    }else if(targetasDestapadas == 2) {
        //mostrar segundo numero 
        targeta2 = document.getElementById(id);
        segundoResultado = numeros[id]
        targeta2.innerHTML = segundoResultado;

        //desabilitar segundo botton
        targeta2.disabled = true;

        //incrementar movimientos
        movimientos++ ;
        mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`

        if(primerResultado == segundoResultado){
            //encerrar contador targetas destapadas
            targetasDestapadas = 0;

            //Incrementar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;


            if(aciertos == 8){
                clearInterval(TiempoRegresivoId)
                mostrarAciertos.innerHTML = `Aciertos 😘: ${aciertos} `;
                mostrarTiempo.innerHTML = `Fantastico 🎉 solo te demoraste ${timerInicial - timer} segundos.`
                mostrarMovimientos.innerHTML = `Movimientos : ${movimientos} 🥵🥵🥵`; 
            }

        }else {
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                targeta1.innerHTML = " ";
                targeta2.innerHTML = " ";
                targeta1.disabled = false;
                targeta2.disabled = false;
                targetasDestapadas = 0;
            }, 700);
        }
    }
}

