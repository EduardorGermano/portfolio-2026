import { iniciarTema, alterarTema } from "./modules/theme.js";
import { buscarPalavras, buscarRanking, salvarPartida } from "./modules/api.js";
import { criarJogo } from "./modules/game.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();

    const btnTema = document.getElementById("btnTema");
    const btnReiniciar = document.getElementById("btnReiniciar");
    const btnSalvar = document.getElementById("btnSalvar");
    const cards = document.querySelectorAll(".card");
    const tentativasElemento = document.getElementById("tentativas");
    const rankingLista = document.getElementById("rankingLista");

    btnTema?.addEventListener("click", () => {
        alterarTema();
    });

    if (cards.length > 0) {
        iniciarJogo(cards, tentativasElemento, btnReiniciar, btnSalvar, rankingLista);
    }
});

async function iniciarJogo(cards, tentativasElemento, btnReiniciar, btnSalvar, rankingLista) {
    const jogo = criarJogo(cards, tentativasElemento);

    await carregarTabuleiro(jogo);
    await carregarRankingNaTela(rankingLista);

    btnReiniciar?.addEventListener("click", async () => {
        await carregarTabuleiro(jogo);
    });

    btnSalvar?.addEventListener("click", async () => {
        const nome = prompt("Digite seu nome para salvar no ranking:");

        if (!nome || !nome.trim()) {
            return;
        }

        const payload = {
            nome: nome.trim(),
            tempo: 0,
            tentativas: jogo.getTentativas()
        };

        const resultado = await salvarPartida(payload);

        if (resultado) {
            await carregarRankingNaTela(rankingLista);
            alert("Partida salva com sucesso!");
        } else {
            alert("Não foi possível salvar a partida.");
        }
    });
}

async function carregarTabuleiro(jogo) {
    try {
        const palavras = await buscarPalavras();

        if (palavras.length > 0) {
            jogo.iniciar(palavras);
        }
    } catch (error) {
        console.error(error);
    }
}

async function carregarRankingNaTela(rankingLista) {
    if (!rankingLista) return;

    const ranking = await buscarRanking();

    if (ranking.length === 0) {
        rankingLista.innerHTML = `<li class="ranking-empty">Nenhum registro encontrado.</li>`;
        return;
    }

    rankingLista.innerHTML = ranking
        .slice(0, 10)
        .map((item) => {
            const nome =
                item.nome ??
                item.jogador ??
                item.name ??
                item.usuario ??
                item.player ??
                "Jogador";

            const tentativas =
                item.tentativas ??
                item.tentativa ??
                item.tries ??
                "-";

            const tempo =
                item.tempo ??
                item.time ??
                "-";

            return `
                <li>
                    <span class="ranking-name">${nome}</span><br>
                    Tentativas: ${tentativas} | Tempo: ${tempo}
                </li>
            `;
        })
        .join("");
}