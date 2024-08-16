// Função para gerar números decimais aleatórios
function gerarNumerosAleatorios(quantidade, minimo, maximo) {
    const numeros = [];
    for (let i = 0; i < quantidade; i++) {
        numeros.push(Math.floor(Math.random() * (maximo - minimo + 1)) + minimo);
    }
    return numeros;
}

// Variáveis para o cronômetro
let intervaloCronometro;
let minutos = 0;
let segundos = 0;

// Função para iniciar o cronômetro
function iniciarCronometro() {
    intervaloCronometro = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }

        // Atualiza o cronômetro na tela
        document.getElementById("minutes").textContent = minutos < 10 ? `0${minutos}` : minutos;
        document.getElementById("seconds").textContent = segundos < 10 ? `0${segundos}` : segundos;
    }, 1000);
}

// Função para parar o cronômetro
function pararCronometro() {
    clearInterval(intervaloCronometro);
}

// Função para gerar e exibir a tabela de entrada
function gerarTabelaConversao() {
    const corpoTabela = document.querySelector("#conversion-table tbody");
    corpoTabela.innerHTML = ""; // Limpar tabela anterior

    // Alterar aqui para gerar na faixa de vallores inteiros aleatórios desejados:
    const numeros = gerarNumerosAleatorios(10, 0, 200);

    numeros.forEach(numero => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${numero}</td>
            <td><input type="text" data-resposta="${numero.toString(2)}"></td>
            <td><input type="text" data-resposta="${numero.toString(8)}"></td>
            <td><input type="text" data-resposta="${numero.toString(16).toUpperCase()}"></td>
        `;
        corpoTabela.appendChild(linha);
    });

    document.getElementById("submit-btn").disabled = false; // Habilita o botão de verificação
    iniciarCronometro();
}

// Função para verificar as respostas dos estudantes
function verificarRespostas() {
    pararCronometro();

    const entradas = document.querySelectorAll("tbody input");
    let acertos = 0;
    let erros = 0;

    entradas.forEach(entrada => {
        const respostaAluno = entrada.value.trim().toUpperCase(); // Ignora espaços e converte para maiúsculas
        const respostaCorreta = entrada.getAttribute("data-resposta");

        if (respostaAluno === respostaCorreta) {
            acertos++;
            entrada.style.backgroundColor = "#d4edda"; // Verde claro para respostas corretas
        } else {
            erros++;
            entrada.style.backgroundColor = "#f8d7da"; // Vermelho claro para respostas incorretas
        }
    });

    // Exibe os resultados
    const resultado = document.getElementById("result");
    resultado.innerHTML = `
        <p>Tempo total: ${minutos < 10 ? `0${minutos}` : minutos}:${segundos < 10 ? `0${segundos}` : segundos}</p>
        <p>Acertos: ${acertos}</p>
        <p>Erros: ${erros}</p>
    `;
}

// Eventos para os botões
document.getElementById("generate-btn").addEventListener("click", gerarTabelaConversao);
document.getElementById("submit-btn").addEventListener("click", verificarRespostas);
