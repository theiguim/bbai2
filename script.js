document.addEventListener('DOMContentLoaded', function () {

    // --- 1. CONFIGURAÇÕES GERAIS ---
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const logoImg = document.querySelector('.logo img');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-content a'); // Links do menu mobile

    // Caminhos das logos
    const logoOriginalSrc = 'images/logo-w.png';
    const logoScrolledSrc = 'images/logo.png';

    // --- 2. LÓGICA DO MENU MOBILE ---
    function toggleMenu() {
        header.classList.toggle('menu-open');

        // Trava o scroll do site quando o menu está aberto
        if (header.classList.contains('menu-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Adiciona evento de clique no botão hambúrguer
    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }

    // Fecha o menu automaticamente ao clicar em qualquer link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (header.classList.contains('menu-open')) {
                toggleMenu(); // Fecha o menu
            }
        });
    });


    // --- 3. LÓGICA DE SCROLL E LOGO ---
    function handleScroll() {
        // Se não houver hero (pág interna), usa 500px padrão
        const heroHeight = hero ? hero.offsetHeight : 500;
        const triggerPoint = heroHeight - 100;

        if (window.scrollY > triggerPoint) {
            // Estado Scrolled
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
                if (logoImg) logoImg.src = logoScrolledSrc;
            }
        } else {
            // Estado Normal
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
                if (logoImg) logoImg.src = logoOriginalSrc;
            }
        }
    }

    // Ativa o scroll listener
    window.addEventListener('scroll', handleScroll);
    // Roda uma vez ao carregar para garantir estado correto
    handleScroll();

    // --- 4. ÍCONES ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});



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





function toggleLeadForm() {
    const overlay = document.getElementById('leadOverlay');
    const isActive = overlay.classList.contains('active');

    if (isActive) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Destrava scroll
    } else {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Trava scroll do site
    }
}

// Opcional: Fechar ao apertar ESC
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        const overlay = document.getElementById('leadOverlay');
        if (overlay.classList.contains('active')) {
            toggleLeadForm();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('scrollFxSection');
    const textLeft = document.getElementById('textLeft');
    const textRight = document.getElementById('textRight');
    const logo = document.getElementById('logo3d');

    // Variáveis para controlar a suavização (Lerp)
    let currentX = 0;      // Posição atual do texto (visível)
    let targetX = 0;       // Para onde o texto DEVERIA ir (baseado no scroll)

    let currentRot = 0;    // Rotação atual
    let targetRot = 0;     // Rotação alvo

    function animateScrollFx() {
        // Se a seção não existir, para a função (segurança)
        if (!section) return;

        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const distanceFromCenter = screenCenter - sectionCenter;

        // Verifica se está visível para calcular o ALVO
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {

            // 1. Define o ALVO (Onde queremos chegar)
            // Velocidade baseada no scroll (0.3 é um bom equilíbrio)
            targetX = Math.abs(distanceFromCenter * 0.3);
            targetRot = distanceFromCenter * 0.1;

        } else {
            // Se sair da tela, podemos resetar o alvo ou parar, 
            // mas manter calculando garante que a animação termine suavemente mesmo saindo.
        }

        // 2. A MÁGICA DA SUAVIZAÇÃO (LERP)
        // O valor atual persegue o valor alvo.
        // 0.05 = Fator de suavidade (quanto menor, mais "pesado/lento" o movimento)
        // Se quiser mais rápido, mude para 0.1. Mais lento, 0.03.
        currentX += (targetX - currentX) * 0.05;
        currentRot += (targetRot - currentRot) * 0.05;

        // 3. Aplica os valores SUAVIZADOS ao DOM
        // Math.max(0) garante que nunca cruze o centro
        const finalX = Math.max(0, currentX);

        textLeft.style.transform = `translateX(-${finalX}px)`;
        textRight.style.transform = `translateX(${finalX}px)`;

        // Aplica rotação suavizada
        logo.style.transform = `rotateY(${currentRot}deg) rotateZ(${currentRot * 0.05}deg)`;

        // Loop Infinito
        requestAnimationFrame(animateScrollFx);
    }

    // Inicia
    requestAnimationFrame(animateScrollFx);
})










/* --- LÓGICA DO CHATBOT --- */

// Variáveis de Estado
let chatStep = 0; // 0: Nome, 1: Motivo, 2: Finalizado
let userData = { name: '', reason: '' };
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Abre/Fecha Chat
function toggleChat() {
    chatWindow.classList.toggle('active');
    // Se abriu e está vazio, inicia conversa
    if (chatWindow.classList.contains('active') && chatMessages.children.length === 0) {
        setTimeout(() => botSay("Olá! Bem-vindo à BitBloom AI. Qual é o seu nome?"), 400);
    }
}

// Adiciona Mensagem do Bot
function botSay(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot';
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll para baixo
}

// Adiciona Mensagem do Usuário
function userSay(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Processa o Input
function processUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    userSay(text);
    chatInput.value = '';

    // Máquina de Estados
    if (chatStep === 0) {
        // Captura Nome
        userData.name = text;
        setTimeout(() => botSay(`Prazer, ${text}! Qual o motivo do seu contato hoje?`), 600);
        chatStep++;
    } else if (chatStep === 1) {
        // Captura Motivo e Finaliza
        userData.reason = text;
        setTimeout(() => {
            botSay("Perfeito! Estou gerando seu protocolo e abrindo o WhatsApp...");
            redirectToWhatsapp();
        }, 600);
        chatStep++;
    }
}

// Lógica de Envio para o WhatsApp
// Lógica de Envio para o WhatsApp (FIX iOS)
function redirectToWhatsapp() {
    // 1. Calcula Saudação 
    const hour = new Date().getHours();
    let greeting = "Bom dia";
    if (hour >= 12 && hour < 18) greeting = "Boa tarde";
    if (hour >= 18) greeting = "Boa noite";

    // 2. Gera Protocolo 
    const protocol = "BB-" + Math.floor(1000 + Math.random() * 9000);

    // 3. Monta a Mensagem com Emojis
    const finalMessage = `${greeting}! Meu nome é ${userData.name}.\nMotivo do contato: ${userData.reason}.\n\n Protocolo: ${protocol}\n(Aguardo atendimento.)`;

    // 4. Cria o Link
    const phone = "5532999526526";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;

    // 5. Redirecionamento (Correção iOS)
    setTimeout(() => {
        // Em vez de window.open (bloqueado no iOS com delay), usamos location.href
        window.location.href = url;
    }, 4000); // 4 Segundos de leitura
}

// Enviar com Enter
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processUserMessage();
    }
});
























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
