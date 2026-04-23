const USERNAME = "EduardorGermano";
const API_URL = `https://api.github.com/users/${USERNAME}/repos`;

export async function carregarProjetoGitHub() {
    const projectList = document.querySelector(".project-list");

    if (!projectList) return;

    try {
        projectList.innerHTML = '<div class="loading">Carregando projetos...</div>';

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar repositórios");
        }

        const repositorios = await response.json();

        const projetosOrdenados = repositorios
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);

        projectList.innerHTML = "";

        if (projetosOrdenados.length === 0) {
            projectList.innerHTML = '<p class="no-projects">Nenhum repositório encontrado</p>';
            return;
        }

        projetosOrdenados.forEach(repo => {
            const card = criarCardProjeto(repo);
            projectList.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao carregar projetos:", erro);
        projectList.innerHTML = '<p class="error-message">Erro ao carregar projetos do GitHub</p>';
    }
}

function criarCardProjeto(repo) {
    const card = document.createElement("div");
    card.className = "project-card";

    const descricao = repo.description || "Sem descrição";
    const linguagem = repo.language || "Sem linguagem";
    const stars = repo.stargazers_count || 0;
    const url = repo.html_url;

    card.innerHTML = `
        <div class="project-header">
            <h3>${repo.name}</h3>
            <span class="project-stars">
                <i class="fas fa-star"></i> ${stars}
            </span>
        </div>
        <p class="project-description">${descricao}</p>
        <div class="project-footer">
            <span class="project-language">
                <i class="fas fa-code"></i> ${linguagem}
            </span>
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="project-link">
                Ver no GitHub <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;

    return card;
}
