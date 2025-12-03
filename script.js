// 1. Seleciona os elementos necessários
const header = document.querySelector('header');
const hero = document.querySelector('.hero');
const logoImg = document.querySelector('.logo img'); // Seleciona a tag <img> do logo

// 2. Define os caminhos das imagens
// Caminho do logo original (branco para fundo escuro)
const logoOriginalSrc = 'images/logo.png';
// Caminho do NOVO logo para quando rolar a página (conforme seu pedido)
const logoScrolledSrc = 'images/logo.png';


// 3. Função principal que verifica o scroll
function handleScroll() {
    // Calcula a altura da hero e o ponto de gatilho
    const heroHeight = hero.offsetHeight;
    const triggerPoint = heroHeight - 100; // Troca 100px antes de sair da hero

    // Verifica a posição atual do scroll
    if (window.scrollY > triggerPoint) {
        // --- ESTADO SCROLLED (ATIVO) ---
        // Verifica se já não está ativo para evitar trocar a imagem repetidamente
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
            // Troca o SRC da imagem para o novo logo
            logoImg.src = logoScrolledSrc;
        }
    } else {
        // --- ESTADO NORMAL (HERO) ---
        // Verifica se estava ativo antes de remover
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
            // Volta o SRC da imagem para o logo original
            logoImg.src = logoOriginalSrc;
        }
    }
}

// 4. Adiciona os ouvintes de evento
// Executa quando rola a página
window.addEventListener('scroll', handleScroll);
// Executa assim que a página carrega (para o caso de dar F5 já scrollado)
document.addEventListener('DOMContentLoaded', handleScroll);

// Inicializa ícones (mantido do seu código original)
lucide.createIcons();



const track = document.querySelector('.gallery-track');
const btnPrev = document.querySelector('.gallery-nav-btn.prev');
const btnNext = document.querySelector('.gallery-nav-btn.next');

if (track && btnPrev && btnNext) {

    // Largura do Card (450px) + Gap (40px) = 490px
    // Usamos um valor aproximado ou pegamos dinamicamente para garantir scroll perfeito
    const scrollAmount = 490;

    btnNext.addEventListener('click', () => {
        track.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    btnPrev.addEventListener('click', () => {
        track.scrollBy({
            left: -scrollAmount, // Valor negativo volta
            behavior: 'smooth'
        });
    });
}



















window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const video = document.querySelector("video.videobg");

    if (video) {
        if (video.readyState >= 4) {
            hidePreloader();
        } else {
            video.addEventListener("canplaythrough", hidePreloader);
            video.addEventListener("error", hidePreloader);
        }
    } else {
        hidePreloader();
    }

    function hidePreloader() {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
            document.body.style.overflow = "auto";
        }, 500);
    }
});


document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO PARA ÍCONES E ANIMAÇÃO DE SCROLL DOS SERVIÇOS ---
    lucide.createIcons();

    // --- CÓDIGO ORIGINAL (CABEÇALHO, MENU, ETC.) ---
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        const headline = document.getElementById("headline");
        let textSwitched = false;
        let animating = false;
        let startY = 0;

        window.scrollTo(0, 0);

        // Função genérica para trocar o texto suavemente
        function switchText(newText, switched) {
            animating = true;
            headline.classList.add("fade-out");

            // Aguarda o fim da transição de fade-out
            headline.addEventListener("transitionend", function handler() {
                headline.removeEventListener("transitionend", handler);

                // Troca o texto e remove a classe para fazer o fade-in
                headline.textContent = newText;
                headline.classList.remove("fade-out");

                textSwitched = switched;
                animating = false;
            });
        }

        function animateSwitchText() {
            switchText("Transformamos ideias em soluções digitais inteligentes.", true);
        }

        function animateRevertText() {
            switchText("Inove. Floresça.", false);
        }

        // --- Scroll desktop ---
        window.addEventListener("wheel", (e) => {
            if (animating) return;
            if (!textSwitched && e.deltaY > 0 && window.scrollY < 10) {
                e.preventDefault();
                animateSwitchText();
            } else if (textSwitched && e.deltaY < 0 && window.scrollY === 0) {
                e.preventDefault();
                animateRevertText();
            }
        }, { passive: false });

        // --- Scroll mobile (toque) ---
        window.addEventListener("touchstart", (e) => {
            startY = e.touches[0].clientY;
        }, { passive: false });

        window.addEventListener("touchmove", (e) => {
            if (animating) return;
            const currentY = e.touches[0].clientY;
            const deltaY = startY - currentY;

            if (!textSwitched && deltaY > 20 && window.scrollY < 10) {
                e.preventDefault();
                animateSwitchText();
                startY = currentY; // 🔑 atualiza para evitar bloqueio no "press drag"
            } else if (textSwitched && deltaY < -20 && window.scrollY === 0) {
                e.preventDefault();
                animateRevertText();
                startY = currentY; // 🔑 idem aqui
            }
        }, { passive: false });
    }


    const menu = document.getElementById('mobileMenu');
    const links = menu.querySelectorAll('a');
    const hamburger = document.querySelector('.hamburger');

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            hamburger.textContent = '☰';
            document.body.classList.remove('no-scroll');
        });
    });
});

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const isOpen = menu.classList.toggle('show');
    hamburger.textContent = isOpen ? '✕' : '☰';
    document.body.classList.toggle('no-scroll', isOpen);
}

function redirect() {
    const isMobile = window.innerWidth <= 768;
    const url = isMobile
        ? "https://bitbloomai.com/apresentacao-mobile.pdf"
        : "https://bitbloomai.com/apresentacao.pdf";
    window.open(url, '_blank');
}
