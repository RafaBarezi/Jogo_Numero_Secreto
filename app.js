let listaDeNumerosSorteados = []; 

function exibirTextoNaTela(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
// para acessibilidade (voz acelerada)
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Digite um número entre 1 e 10");
}

function gerarNumeroAleatorio() {
    let NumeroEscolhido = parseInt(Math.random() * 10) + 1; 
    // Com o Math.randon, os n°s aleatórios gerados sempre são decimais entre 0 e 1, por isso multiplicar por 10.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

if(quantidadeDeElementosNaLista == 10){
    listaDeNumerosSorteados = []
}

    // Includes verifica se n° está na lista
    if (listaDeNumerosSorteados.includes(NumeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(NumeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return NumeroEscolhido;
    }
}

function limparCampo() {
    document.querySelector("input").value = "";
}

function verificarChute() {
    let input = document.querySelector("input");
    let chute = Number(input.value);

    // validação para garantir que o número esteja entre 1 e 10
    isNaN(chute) || chute < 1 || chute > 10
        ? (exibirTextoNaTela("p", "Por favor, escolha um número que se encontre entre 1 e 10!"), limparCampo(), void 0)
        : chute === numeroSecreto
            ? (exibirTextoNaTela("h1", "Acertou!"),
                exibirTextoNaTela("p", `Você descobriu o número secreto com ${tentativas} ${tentativas > 1 ? "tentativas" : "tentativa"}!`),
                document.getElementById("chutar").setAttribute("disabled", true))
            : (exibirTextoNaTela("p", chute > numeroSecreto ? "O número secreto é menor!" : "O número secreto é maior!"), tentativas++);


    // habilitando o botão reiniciar independentemente do resultado
    document.getElementById("reiniciar").removeAttribute("disabled");
    limparCampo();
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    // reabilitando o botão de chutar caso tenha sido desabilitado
    document.getElementById("chutar").removeAttribute("disabled");
}

// iniciando o jogo
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

// associando os eventos aos botões após o carregamento do documento
document.getElementById("chutar").addEventListener("click", verificarChute);
document.getElementById("reiniciar").addEventListener("click", reiniciarJogo);
