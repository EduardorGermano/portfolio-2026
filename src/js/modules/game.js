// js/modules/game.js

import { embaralhar } from "./utils.js";

export function criarJogo(cards, tentativasElemento) {
    let primeiraCarta = null;
    let segundaCarta = null;
    let tentativas = 0;
    let bloqueado = false;
    let paresEncontrados = 0;
    let totalPares = 0;

    function iniciar(palavras) {
        const embaralhadas = embaralhar([...palavras, ...palavras]);

        totalPares = palavras.length;
        paresEncontrados = 0;
        tentativas = 0;
        bloqueado = false;
        primeiraCarta = null;
        segundaCarta = null;

        atualizarTentativas();

        cards.forEach((card, index) => {
            card.textContent = "?";
            card.dataset.palavra = embaralhadas[index];
            card.classList.remove("selecionado", "acertou");
            card.disabled = false;
            card.onclick = () => virar(card);
        });
    }

    function virar(card) {
        if (bloqueado) return;
        if (card === primeiraCarta) return;
        if (card.classList.contains("acertou")) return;

        card.textContent = card.dataset.palavra;
        card.classList.add("selecionado");

        if (!primeiraCarta) {
            primeiraCarta = card;
            return;
        }

        segundaCarta = card;
        tentativas++;
        atualizarTentativas();
        verificar();
    }

    function verificar() {
        if (!primeiraCarta || !segundaCarta) return;

        const acertou = primeiraCarta.dataset.palavra === segundaCarta.dataset.palavra;

        if (acertou) {
            primeiraCarta.classList.remove("selecionado");
            segundaCarta.classList.remove("selecionado");

            primeiraCarta.classList.add("acertou");
            segundaCarta.classList.add("acertou");

            primeiraCarta.disabled = true;
            segundaCarta.disabled = true;

            paresEncontrados++;
            primeiraCarta = null;
            segundaCarta = null;
            return;
        }

        bloqueado = true;

        setTimeout(() => {
            primeiraCarta.textContent = "?";
            segundaCarta.textContent = "?";

            primeiraCarta.classList.remove("selecionado");
            segundaCarta.classList.remove("selecionado");

            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;
        }, 700);
    }

    function atualizarTentativas() {
        if (tentativasElemento) {
            tentativasElemento.textContent = `Tentativas: ${tentativas}`;
        }
    }

    function reiniciar(palavras) {
        iniciar(palavras);
    }

    function getTentativas() {
        return tentativas;
    }

    function jogoFinalizado() {
        return paresEncontrados === totalPares && totalPares > 0;
    }

    return {
        iniciar,
        reiniciar,
        getTentativas,
        jogoFinalizado,
    };
}