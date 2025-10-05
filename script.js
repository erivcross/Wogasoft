// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animar as linhas do hambúrguer
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Resetar animação do hambúrguer
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
        
        // Restore body scroll
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside (mobile improvement)
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Resetar animação do hambúrguer
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
});

// Close menu on escape key (mobile improvement)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Resetar animação do hambúrguer
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
});

// Prevent body scroll when mobile menu is open
hamburger.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Header com scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature, .stat, .contact-item, .screenshot');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obter valores do formulário
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validação básica
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Simular envio (em um projeto real, aqui seria feita uma requisição AJAX)
    showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    
    // Limpar formulário
    this.reset();
});

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (hero && phoneMockup) {
        const rate = scrolled * -0.5;
        phoneMockup.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Observar estatísticas para animação
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h3');
            const text = statElement.textContent;
            
            // Verificar se é um número
            if (!isNaN(text) && text !== '✓') {
                const target = parseInt(text);
                animateCounter(statElement, target);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar elementos de estatísticas
document.addEventListener('DOMContentLoaded', () => {
    const statElements = document.querySelectorAll('.stat');
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Efeito de hover nos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .contact-item, .faq-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Animação dos ícones flutuantes
document.addEventListener('DOMContentLoaded', () => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.style.animationDuration = `${3 + index * 0.5}s`;
    });
});

// Efeito especial no panda no foguete
document.addEventListener('DOMContentLoaded', () => {
    const pandaImage = document.querySelector('.panda-rocket-image');
    
    if (pandaImage) {
        // Adicionar efeito de brilho ocasional
        setInterval(() => {
            pandaImage.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) brightness(1.1)';
            setTimeout(() => {
                pandaImage.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))';
            }, 500);
        }, 8000);
        
        // Efeito de hover mais elaborado
        pandaImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.filter = 'drop-shadow(0 25px 50px rgba(251, 191, 36, 0.4)) brightness(1.2)';
        });
        
        pandaImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))';
        });
    }
});

// Interação com os planos de preço
document.addEventListener('DOMContentLoaded', () => {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover classe ativa de todos os cards
            pricingCards.forEach(c => c.classList.remove('selected'));
            
            // Adicionar classe ativa ao card clicado
            this.classList.add('selected');
            
            // Adicionar efeito visual
            this.style.borderColor = '#6366f1';
            this.style.boxShadow = '0 20px 25px -5px rgba(99, 102, 241, 0.3)';
            
            // Resetar outros cards
            pricingCards.forEach(c => {
                if (c !== this) {
                    c.style.borderColor = '#e5e7eb';
                    c.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }
            });
        });
    });
});

// Animação do botão de download
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Adicionar efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simular redirecionamento
            showNotification('Redirecionando para a Google Play Store...', 'success');
            
            setTimeout(() => {
                window.open('https://play.google.com/store/apps/details?id=com.wogasoft.wobet', '_blank');
            }, 1000);
        });
    }
});

// FAQ interativo
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        // Criar botão de toggle
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggleBtn.className = 'faq-toggle';
        toggleBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1rem;
            color: #6b7280;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        
        item.style.position = 'relative';
        item.appendChild(toggleBtn);
        
        // Inicialmente ocultar resposta
        answer.style.display = 'none';
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        toggleBtn.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            if (isOpen) {
                answer.style.display = 'none';
                answer.style.maxHeight = '0';
                this.style.transform = 'rotate(0deg)';
            } else {
                answer.style.display = 'block';
                answer.style.maxHeight = answer.scrollHeight + 'px';
                this.style.transform = 'rotate(180deg)';
            }
        });
    });
});

// Lazy loading para imagens (se houver)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Mobile Touch Improvements
document.addEventListener('DOMContentLoaded', () => {
    // Touch-friendly interactions
    const touchElements = document.querySelectorAll('.btn, .feature-card, .pricing-card, .contact-item, .faq-item');
    
    touchElements.forEach(element => {
        // Add touch feedback
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Improved scroll behavior for mobile
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Add smooth scroll behavior
                document.body.style.scrollBehavior = 'smooth';
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Prevent zoom on double tap for buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve form interactions on mobile
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Scroll to input on mobile to avoid keyboard covering
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
    });
    
    // Add swipe gestures for mobile navigation (optional)
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        // Swipe left to open menu, swipe right to close
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && window.innerWidth <= 768) {
                // Swipe left - open menu
                if (!navMenu.classList.contains('active')) {
                    hamburger.click();
                }
            } else if (diff < 0 && navMenu.classList.contains('active')) {
                // Swipe right - close menu
                hamburger.click();
            }
        }
    }
    
    // Performance optimization for mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.documentElement.style.setProperty('--transition-duration', '0s');
    }
    
    // Add loading states for better UX
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('submit-btn')) {
                // Add loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
                this.disabled = true;
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
    
    // Add viewport meta tag validation
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
    }
    
    // Enhanced table scrolling for mobile
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        let isScrolling = false;
        let scrollTimeout;
        
        comparisonTable.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                
                // Add visual feedback during scroll
                this.style.transition = 'transform 0.1s ease';
                
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                    this.style.transition = '';
                }, 150);
            }
        });
        
        // Add momentum scrolling for iOS
        comparisonTable.style.webkitOverflowScrolling = 'touch';
        
        // Hide scroll indicator after user starts scrolling
        let hasScrolled = false;
        comparisonTable.addEventListener('scroll', function() {
            if (!hasScrolled) {
                hasScrolled = true;
                const indicator = document.querySelector('.premium-comparison::after');
                if (indicator) {
                    indicator.style.opacity = '0';
                }
            }
        });
        
        // Add snap scrolling for better UX
        comparisonTable.style.scrollSnapType = 'x mandatory';
        const comparisonPlans = document.querySelectorAll('.comparison-plan');
        comparisonPlans.forEach(plan => {
            plan.style.scrollSnapAlign = 'start';
        });
    }
});
