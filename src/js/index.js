import { iniciarTema, alterarTema } from "./modules/theme.js";
import { iniciarHamburger } from "./modules/hamburger.js";
import { carregarProjetoGitHub } from "./modules/github.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    iniciarHamburger();
    carregarProjetoGitHub();

    const btnTema = document.getElementById("btnTema");
    const btnTemaMobile = document.getElementById("btnTemaMobile");
    
    btnTema?.addEventListener("click", () => {
        alterarTema();
    });

    btnTemaMobile?.addEventListener("click", () => {
        alterarTema();
    });
});