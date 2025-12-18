// EFEITO DE VISUALIZAÇÃO DO MENU OCULTO
document.querySelector("#menu_hamburguer").addEventListener("click", ()=> {
    document.querySelector("#menu").classList.toggle("ativo");
    if (document.querySelector("#menu").classList.contains("ativo"))
        document.querySelector("body").style.overflowY = "hidden"
    else
        document.querySelector("body").style.overflowY = "scroll"
})

// EFEITO DE VISIBILIDADE DO SCROLL
document.querySelectorAll(".link_opcao_menu").forEach(link=> {
    link.addEventListener("click", ()=> {
        document.querySelector("#menu").classList.remove("ativo")
        document.querySelector("body").style.overflowY = "scroll"
    })
})

// CARROSEL DE PERGUNTAS 
const contentorCards = document.querySelector("#div_contentor_card_premio")
const cardsPremios = document.querySelectorAll(".card_premios")
const botaoAnterior = document.querySelector(".carousel_botao.anterior")
const botaoSeguinte = document.querySelector(".carousel_botao.seguinte")

if (cardsPremios.length > 0) {
    const cardEstilo = window.getComputedStyle(cardsPremios[0])
    const cardWidth = parseInt(cardEstilo.width) + parseInt(cardEstilo.marginLeft) + parseInt(cardEstilo.marginRight);

    let posicaoAtual = 0
    const visibilidadeCards = Math.floor(contentorCards.offsetWidth / cardWidth);
    const maxPosition = cardsPremios.length - visibilidadeCards;

    const atualizaBotao = () => {
        botaoAnterior.style.display = posicaoAtual <= 0 ? "none" : "flex";
        botaoSeguinte.style.display = posicaoAtual >= maxPosition ? "none" : "flex";
    };

    const moverCarrosel = () => {
        contentorCards.scrollTo({ left: posicaoAtual * cardWidth, behavior: "smooth" });
        atualizaBotao();
    };

    botaoAnterior.addEventListener("click", () => posicaoAtual > 0 && (posicaoAtual--, moverCarrosel()));
    botaoSeguinte.addEventListener("click", () => posicaoAtual < maxPosition && (posicaoAtual++, moverCarrosel()));

    document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && posicaoAtual > 0) posicaoAtual--;
        else if (e.key === "ArrowRight" && posicaoAtual < maxPosition) posicaoAtual++;
        moverCarrosel();
    })

    let touchStartX = 0;
        contentorCards.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX, { passive: true });
        contentorCards.addEventListener("touchend", e => {
            const delta = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(delta) > 50) {
                if (delta < 0 && posicaoAtual < maxPosition) posicaoAtual++;
                else if (delta > 0 && posicaoAtual > 0) posicaoAtual--;
                moverCarrosel();
            }
        }, { passive: true });
  
        atualizaBotao();
} 

// EFEITO COLORIR TEXTO
const textoEfeito = document.querySelectorAll(".texto_efeito_colorir")
const colorirTexto = ()=> {
    const eixoY = window.innerHeight / 2
    let fechamento = null, Fechamento = Infinity 
    textoEfeito.forEach(t => {
        const medida = Math.abs((t.getBoundingClientRect().top + t.getBoundingClientRect().bottom) / 2 - eixoY)
        if (medida < Fechamento) [Fechamento, fechamento] = [medida, t]
    })

    textoEfeito.forEach(t => t.classList.remove("colorido"))
    if (fechamento)
        fechamento.classList.add("colorido")
}
window.addEventListener("scroll", colorirTexto);
window.addEventListener("resize", colorirTexto);
colorirTexto();

// EFEITO CARDS FUNDADORES
const observador = new IntersectionObserver(entrar => {
    entrar.forEach(card => {
        if (card.isIntersecting)
            card.target.classList.add("visto")   
        else   
            card.target.classList.remove("visto")   
    });
}, {threshold: 0.7});
document.querySelectorAll(".card_fundador").forEach(cards => observador.observe(cards))