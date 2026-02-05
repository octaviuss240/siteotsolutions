// Configurações do WhatsApp
const WHATSAPP_NUMBER = '5531999999999'; // SUBSTITUA pelo seu número com DDI+DDD
const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da OTS e gostaria de saber mais sobre os serviços.';

// Função para redirecionar ao WhatsApp
function redirectWhatsApp() {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');

        // Anima as barras do hamburger
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Fecha menu mobile se estiver aberto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        }
    });
});

// Formulário de contato - redireciona para WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const telefone = this.querySelector('input[type="tel"]').value;
        const servico = this.querySelector('select').value;
        const mensagem = this.querySelector('textarea').value;

        // Monta mensagem personalizada para WhatsApp
        const whatsappMsg = `*Novo contato pelo site OTS*\n\n` +
                          `*Nome:* ${nome}\n` +
                          `*E-mail:* ${email}\n` +
                          `*Telefone:* ${telefone}\n` +
                          `*Serviço:* ${servico}\n` +
                          `*Mensagem:* ${mensagem}`;

        const encodedMsg = encodeURIComponent(whatsappMsg);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

        window.open(whatsappURL, '_blank');

        // Limpa o formulário
        this.reset();

        // Feedback visual
        alert('Você será redirecionado para o WhatsApp!');
    });
}

// Adiciona CSS para menu mobile responsivo
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 968px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }

        .nav-menu.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }

        .nav-menu li {
            margin: 0.5rem 0;
        }
    }
`;
document.head.appendChild(style);

// Animação de entrada para elementos quando aparecem na tela
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa cards e elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .differential-item, .contact-grid > div');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

console.log('🚀 Site OTS carregado com sucesso!');
console.log('⚠️ IMPORTANTE: Não esqueça de alterar o número do WhatsApp na linha 2 do arquivo script.js');