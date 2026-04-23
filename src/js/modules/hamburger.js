export function iniciarHamburger() {
    const btnHamburger = document.getElementById("btnHamburger");
    const menuMobile = document.getElementById("menuMobile");
    const linksMenu = menuMobile?.querySelectorAll("a");

    if (!btnHamburger || !menuMobile) return;

    // Abrir/fechar menu ao clicar no botão
    btnHamburger.addEventListener("click", () => {
        toggleMenu();
    });

    // Fechar menu ao clicar em um link
    linksMenu?.forEach(link => {
        link.addEventListener("click", () => {
            fecharMenu();
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener("click", (evento) => {
        const ehClickMenu = menuMobile.contains(evento.target);
        const ehClickBotao = btnHamburger.contains(evento.target);

        if (!ehClickMenu && !ehClickBotao) {
            fecharMenu();
        }
    });
}

function toggleMenu() {
    const menuMobile = document.getElementById("menuMobile");
    const btnHamburger = document.getElementById("btnHamburger");

    menuMobile?.classList.toggle("ativo");
    btnHamburger?.classList.toggle("ativo");
}

function fecharMenu() {
    const menuMobile = document.getElementById("menuMobile");
    const btnHamburger = document.getElementById("btnHamburger");

    menuMobile?.classList.remove("ativo");
    btnHamburger?.classList.remove("ativo");
}
