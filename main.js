const html = document.querySelector('html');

const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const beep = new Audio('sons/beep.mp3');
const pause = new Audio('sons/pause.mp3');
const play = new Audio('sons/play.wav');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const startPauseBt = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');
const controleTimerBt = document.querySelector('#controle-timer');

let tempoDecorridoEmSegundos = 0;
let intervaloId = null;
musica.loop = true;
beep.loop = false;
pause.loop = false;
play.loop = false;



startPauseBt.addEventListener('click', iniciarOuPausar);

focoBtn.addEventListener('click', ()=>{
tempoDecorridoEmSegundos = 1500;
   alterarContexto('foco');
    focoBtn.classList.add('active');
})

curtoBtn.addEventListener('click', ()=>{
tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
})

longoBtn.addEventListener('click', ()=>{  
tempoDecorridoEmSegundos = 900;
 alterarContexto('descanso-longo');
longoBtn.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo();
   botoes.forEach((contexto)=>{
    contexto.classList.remove('active');
}
)

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused == true){
        musica.play();
    }
    else {
    musica.pause();
    }
})

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    console.log(contexto);
    switch(contexto){
    case "foco":
        titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa</strong>`;
    break;

    case "descanso-longo":
        titulo.innerHTML = `Hora de voltar à superfície. <br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
    break;

    case "descanso-curto":
         titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
  
    break;
    default:
    break;
}
}

function iniciarOuPausar(){
    if(intervaloId){
    pause.play();
    zerar();
    return
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    controleTimerBt.setAttribute('src', "imagens/pause.png");
    iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    controleTimerBt.setAttribute('src', "imagens/play_arrow.png");
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
}

const contagemRegressiva = ()=>{
    if (tempoDecorridoEmSegundos <=0) {
        beep.play();
        alert("Tempo finalizado!");
        zerar();
        return
    }
    tempoDecorridoEmSegundos -=1;
    mostrarTempo();
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}