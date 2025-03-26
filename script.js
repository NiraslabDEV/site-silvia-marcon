// Tema claro/escuro
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

// Menu Mobile
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const menuOverlay = document.querySelector(".menu-overlay");

// Função aprimorada para alternar o menu mobile
function toggleMobileMenu() {
  const isOpen = navLinks.classList.contains("active");

  // Alternar classes para o menu
  navLinks.classList.toggle("active");
  menuOverlay.classList.toggle("active");

  // Alternar ícone do botão com animação
  const icon = mobileMenuBtn.querySelector("i");

  if (isOpen) {
    // Animar para fechar o menu
    icon.style.transform = "rotate(0deg)";
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    document.body.style.overflow = ""; // Restaurar scroll

    // Reset das animações dos links
    setTimeout(() => {
      const links = navLinks.querySelectorAll("a");
      links.forEach((link) => {
        link.style.animation = "none";
        link.style.opacity = "0";
        link.style.transform = "translateY(20px)";
      });

      const buttons = navLinks.querySelectorAll("button");
      buttons.forEach((button) => {
        button.style.animation = "none";
        button.style.opacity = "0";
      });
    }, 500);
  } else {
    // Animar para abrir o menu
    icon.style.transform = "rotate(90deg)";
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
    document.body.style.overflow = "hidden"; // Prevenir scroll

    // Animar entrada dos links sequencialmente
    const links = navLinks.querySelectorAll("a");
    links.forEach((link, index) => {
      link.style.animationDelay = `${0.1 * (index + 1)}s`;
    });

    const buttons = navLinks.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.style.animationDelay = `${0.1 * (links.length + index + 1)}s`;
    });
  }
}

// Evento de clique no botão do menu
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

// Fechar o menu ao clicar no overlay
menuOverlay.addEventListener("click", toggleMobileMenu);

// Fechar o menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      toggleMobileMenu();
    }
  });
});

// Fechar o menu quando a tela for redimensionada para desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
    toggleMobileMenu();
  }
});

// Adicionar efeitos de hover nos links da navbar
const navbarLinks = document.querySelectorAll(".nav-links a");
navbarLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (window.innerWidth <= 768) {
      link.style.transform = "translateX(5px)";
      link.style.background = "rgba(0, 255, 157, 0.15)";
    }
  });

  link.addEventListener("mouseleave", () => {
    if (window.innerWidth <= 768) {
      link.style.transform = "translateX(0)";
      link.style.background = "rgba(255, 255, 255, 0.05)";
    }
  });
});

// Hero section interativa
document.addEventListener("DOMContentLoaded", () => {
  // Palavras para o efeito de digitação
  const wordList = ["espaços", "perspectivas", "ambientes", "vidas", "cidades"];
  let wordIndex = 0;
  const typingText = document.querySelector(".typing-text");

  // Função para alternar as palavras no efeito de digitação
  function typeWords() {
    if (!typingText) return;
    typingText.textContent = "";
    typingText.textContent = wordList[wordIndex];
    wordIndex = (wordIndex + 1) % wordList.length;
  }

  // Inicia o efeito de digitação
  typeWords();
  setInterval(typeWords, 4000);

  // Configura os atributos data-text para os efeitos glitch
  const glitchTitle = document.querySelector(".glitch-hero-title");
  if (glitchTitle) {
    const textContent = glitchTitle.textContent;
    glitchTitle.setAttribute("data-text", textContent);
  }

  // Canvas e partículas para o background da hero
  const canvas = document.getElementById("hero-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    // Redimensiona o canvas para ocupar toda a viewport
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Classe para as partículas
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(0, 255, 157, ${Math.random() * 0.5 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce na borda da tela
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Inicializa as partículas
    function initParticles() {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    }

    // Anima as partículas
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Conecta partículas próximas com linhas
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 157, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    // Efeito de mouse nas partículas
    function moveParticles(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const angle = Math.atan2(dy, dx);
          const force = (80 - distance) / 80;

          p.speedX -= Math.cos(angle) * force * 0.2;
          p.speedY -= Math.sin(angle) * force * 0.2;
        }
      }
    }

    // Inicialização e resize
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", moveParticles);

    resizeCanvas();
    initParticles();
    animateParticles();
  }

  // Inicializar o carrossel da hero
  const heroCarousel = document.querySelector(".hero-carousel");
  if (heroCarousel) {
    const slides = heroCarousel.querySelector(".carousel-slides");
    const slideItems = heroCarousel.querySelectorAll(".carousel-slide");
    const prevButton = heroCarousel.querySelector(".carousel-control.prev");
    const nextButton = heroCarousel.querySelector(".carousel-control.next");
    const indicators = heroCarousel.querySelectorAll(".carousel-indicator");

    let currentSlide = 0;
    const totalSlides = slideItems.length;

    // Função para atualizar o carrossel
    function updateCarousel() {
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Atualizar indicadores
      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    }

    // Evento para o botão anterior
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    // Evento para o botão próximo
    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });

    // Eventos para os indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index;
        updateCarousel();
      });
    });

    // Auto-play do carrossel
    let carouselInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 5000);

    // Parar o auto-play ao passar o mouse
    heroCarousel.addEventListener("mouseenter", () => {
      clearInterval(carouselInterval);
    });

    // Retomar o auto-play ao remover o mouse
    heroCarousel.addEventListener("mouseleave", () => {
      carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      }, 5000);
    });

    // Adicionar suporte para gestos de toque
    let touchStartX = 0;
    let touchEndX = 0;

    heroCarousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    heroCarousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;

      if (touchStartX - touchEndX > 50) {
        // Deslizar para a esquerda
        nextButton.click();
      } else if (touchEndX - touchStartX > 50) {
        // Deslizar para a direita
        prevButton.click();
      }
    });
  }

  // Atualizar elementos flutuantes para usar imagens
  const floatingElements = document.querySelectorAll(".floating-element");
  if (floatingElements.length > 0) {
    // Modificar interação para incluir as imagens
    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {
      heroImage.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = heroImage.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        // Movimento paralaxe nos elementos flutuantes
        floatingElements.forEach((el, index) => {
          const speed = 1 + index * 0.1;
          const moveX = (x - 0.5) * 30 * speed;
          const moveY = (y - 0.5) * 30 * speed;

          // Adicionamos translateZ para melhorar o efeito 3D
          el.style.transform = `translateX(${moveX}px) translateY(${moveY}px) translateZ(${
            moveX * 2
          }px) rotate(${moveX * 0.2}deg)`;
        });
      });

      heroImage.addEventListener("mouseleave", () => {
        // Reset dos elementos flutuantes com animação suave
        floatingElements.forEach((el) => {
          el.style.transition = "transform 0.8s ease";
          el.style.transform =
            "translateX(0) translateY(0) translateZ(0) rotate(0)";

          // Remove a transição após a animação terminar
          setTimeout(() => {
            el.style.transition = "";
          }, 800);
        });
      });
    }
  }

  // Ocultar dica de interação após o primeiro movimento do mouse
  const interactionHint = document.querySelector(".image-interaction-hint");
  const heroImage = document.querySelector(".hero-image");

  if (interactionHint && heroImage) {
    heroImage.addEventListener(
      "mousemove",
      () => {
        interactionHint.style.opacity = "0";
        setTimeout(() => {
          interactionHint.style.display = "none";
        }, 500);
      },
      { once: true }
    );
  }
});

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Efeito Parallax no Hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");
  const particles = document.querySelector(".hero-particles");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (hero && heroContent && heroImage) {
    // Efeito de parallax no conteúdo - valores aumentados para efeito mais pronunciado
    heroContent.style.transform = `translateY(${scrolled * 0.7}px)`;
    heroImage.style.transform = `translateY(${scrolled * 0.4}px) scale(${
      1 + scrolled * 0.0005
    })`;

    // Efeito de fade no indicador de scroll
    if (scrollIndicator && scrolled > 100) {
      scrollIndicator.style.opacity = "0";
    } else if (scrollIndicator) {
      scrollIndicator.style.opacity = "1";
    }

    // Efeito de parallax nas partículas com rotação suave
    if (particles) {
      particles.style.transform = `translateY(${scrolled * 0.2}px) rotate(${
        scrolled * 0.01
      }deg)`;
    }

    // Efeito de desvanecimento gradual dos elementos da hero conforme o scroll
    const opacity = Math.max(1 - scrolled / (hero.offsetHeight / 1.3), 0);
    heroContent.style.opacity = opacity;
    heroImage.style.opacity = opacity;
  }
});

// Animação de números
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animação dos números quando aparecem na tela
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("stat-number")) {
        // Use o valor do atributo data-value do pai
        const parent = entry.target.parentElement;
        const finalValue =
          parent.getAttribute("data-value") ||
          parseInt(entry.target.textContent);
        animateValue(entry.target, 0, finalValue, 2000);
      }
      entry.target.classList.add("animate");

      // Animação especial para timeline
      if (entry.target.classList.contains("timeline-item")) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    }
  });
}, observerOptions);

// Observa elementos para animação
document
  .querySelectorAll(
    ".stat-number, section, .product-card, .gallery-item, .about-content, .timeline-item, .exhibition-card, .workshop-info"
  )
  .forEach((element) => {
    observer.observe(element);
  });

// Galeria dinâmica com efeito de hover 3D
const galleryImages = [
  "assets/MOCKUP-FRENTE-E-VERSO-2048x1167.png.webp",
  "assets/mockup-sobrecapa-2048x1536.png.webp",
  "assets/Conteudo.png.webp",
  "assets/Screenshot-2024-09-27-17.04.04.png.webp",
  "assets/Screenshot-2024-09-27-16.54.46.png.webp",
];

const galleryGrid = document.querySelector(".gallery-grid");

galleryImages.forEach((image) => {
  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item";

  const img = document.createElement("img");
  img.src = image;
  img.alt = "Obra de Arte";

  galleryItem.appendChild(img);
  galleryGrid.appendChild(galleryItem);

  // Efeito 3D no hover
  galleryItem.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = galleryItem.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const tiltX = (y - 0.5) * 20;
    const tiltY = (x - 0.5) * -20;

    galleryItem.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  galleryItem.addEventListener("mouseleave", () => {
    galleryItem.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  });
});

// Adiciona estilos dinâmicos
const style = document.createElement("style");
style.textContent = `
    .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        cursor: pointer;
        transition: transform 0.3s ease;
        transform-style: preserve-3d;
    }
    
    .gallery-item img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        transition: filter 0.3s ease;
    }
    
    .gallery-item:hover img {
        filter: brightness(1.1);
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.6s ease;
    }
    
    .timeline-item:nth-child(even) {
        transform: translateX(50px);
    }
    
    .exhibition-card {
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
    }
    
    .exhibition-info {
        transform: translateZ(20px);
    }
    
    .workshop-info {
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from {
            box-shadow: 0 0 5px rgba(0, 255, 157, 0.2);
        }
        to {
            box-shadow: 0 0 20px rgba(0, 255, 157, 0.4);
        }
    }
`;

document.head.appendChild(style);

// Função para criar carrossel
function createCarousel(containerClass, items) {
  const container = document.querySelector(`.${containerClass}`);
  if (!container) return;

  // Criar container do carrossel
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel-container";
  container.parentNode.insertBefore(carouselContainer, container);
  carouselContainer.appendChild(container);

  // Adicionar botões de navegação
  const prevButton = document.createElement("button");
  prevButton.className = "carousel-button prev";
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';

  const nextButton = document.createElement("button");
  nextButton.className = "carousel-button next";
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(nextButton);

  // Criar indicadores de paginação apenas se tivermos itens definidos
  if (items && items.length > 0) {
    const indicatorsContainer = document.createElement("div");
    indicatorsContainer.className = "carousel-indicators";

    // Criar um indicador para cada item
    items.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.className = "carousel-indicator";
      if (index === 0) indicator.classList.add("active");

      // Ao clicar no indicador, navegar para o item correspondente
      indicator.addEventListener("click", () => {
        // Calcular a posição de scroll baseada no índice
        const scrollAmount = getScrollAmount();
        currentScroll = scrollAmount * index;

        // Atualizar o scroll
        container.scrollTo({
          left: currentScroll,
          behavior: "smooth",
        });

        // Atualizar indicadores ativos
        updateActiveIndicator();
      });

      indicatorsContainer.appendChild(indicator);
    });

    // Adicionar os indicadores após o container
    carouselContainer.parentNode.insertBefore(
      indicatorsContainer,
      carouselContainer.nextSibling
    );

    // Função para atualizar o indicador ativo baseado na posição atual
    function updateActiveIndicator() {
      // Calcular qual item está visível
      const scrollAmount = getScrollAmount();
      const currentIndex = Math.round(currentScroll / scrollAmount);

      // Atualizar classes dos indicadores
      const indicators = indicatorsContainer.querySelectorAll(
        ".carousel-indicator"
      );
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    }
  }

  // Configurar navegação
  let currentScroll = 0;

  // Função para calcular o scroll amount baseado no tamanho do viewport
  const getScrollAmount = () => {
    // Em dispositivos móveis, queremos mostrar apenas um item por vez
    if (window.innerWidth <= 768) {
      // Encontrar o primeiro item para pegar sua largura total (incluindo margens)
      const firstItem = container.querySelector(".product-card, .gallery-item");
      if (firstItem) {
        const itemRect = firstItem.getBoundingClientRect();
        return itemRect.width;
      }
    }
    // Em telas maiores, usa a largura do container inteiro
    return container.offsetWidth;
  };

  // Atualiza o scroll amount quando redimensiona a janela
  let scrollAmount = getScrollAmount();
  window.addEventListener("resize", () => {
    scrollAmount = getScrollAmount();
    // Reajusta a posição atual quando redimensiona
    container.scrollTo({
      left: currentScroll,
      behavior: "auto",
    });
  });

  nextButton.addEventListener("click", () => {
    // Recalcula o scrollAmount a cada clique para garantir precisão
    scrollAmount = getScrollAmount();
    currentScroll = Math.min(
      currentScroll + scrollAmount,
      container.scrollWidth - container.offsetWidth
    );
    container.scrollTo({
      left: currentScroll,
      behavior: "smooth",
    });

    // Atualizar indicador ativo, se existir
    if (items && items.length > 0) {
      updateActiveIndicator();
    }
  });

  prevButton.addEventListener("click", () => {
    // Recalcula o scrollAmount a cada clique para garantir precisão
    scrollAmount = getScrollAmount();
    currentScroll = Math.max(currentScroll - scrollAmount, 0);
    container.scrollTo({
      left: currentScroll,
      behavior: "smooth",
    });

    // Atualizar indicador ativo, se existir
    if (items && items.length > 0) {
      updateActiveIndicator();
    }
  });

  // Adicionar touch swipe para mobile
  let touchStart = 0;
  let touchEnd = 0;

  container.addEventListener("touchstart", (e) => {
    touchStart = e.changedTouches[0].screenX;
  });

  container.addEventListener("touchend", (e) => {
    touchEnd = e.changedTouches[0].screenX;
    if (touchStart - touchEnd > 50) {
      nextButton.click();
    } else if (touchEnd - touchStart > 50) {
      prevButton.click();
    }
  });

  // Atualizar indicador ao fazer scroll manual
  container.addEventListener("scroll", () => {
    // Atualizar a posição atual
    currentScroll = container.scrollLeft;

    // Atualizar indicador ativo, se existir
    if (items && items.length > 0) {
      updateActiveIndicator();
    }
  });
}

// Produtos do carrossel
const products = [
  {
    image: "assets/produtos/camiseta monalisa MF 100_ algodão 150 reais.jpeg",
    title: "Camiseta Monalisa",
    description: "Edição Limitada • 100% Algodão",
    price: "R$ 150,00",
    stock: "Restam 10",
  },
  {
    image: "assets/produtos/caneca monaliza 79,90 reais.jpeg",
    title: "Caneca Monalisa",
    description: "Série Especial",
    price: "R$ 79,90",
    stock: "Restam 15",
  },
  {
    image: "assets/produtos/almofada mona -72 e com enchimento 82 reais.jpeg",
    title: "Almofada Mona",
    description: "Com enchimento premium",
    price: "R$ 82,00",
    stock: "Restam 8",
  },
  {
    image: "assets/produtos/camiseta monalisa MF 100_ algodão 150 reais.jpeg",
    title: "Camiseta Monalisa Preta",
    description: "Edição Especial • 100% Algodão",
    price: "R$ 150,00",
    stock: "Restam 5",
  },
  {
    image: "assets/produtos/caneca monaliza 79,90 reais.jpeg",
    title: "Caneca Monalisa Dourada",
    description: "Série Premium",
    price: "R$ 89,90",
    stock: "Restam 12",
  },
  {
    image: "assets/produtos/almofada mona -72 e com enchimento 82 reais.jpeg",
    title: "Almofada Mona Premium",
    description: "Com enchimento especial",
    price: "R$ 92,00",
    stock: "Restam 6",
  },
];

// Atualizar grid de produtos
const productsGrid = document.querySelector(".products-grid");
if (productsGrid) {
  productsGrid.innerHTML = "";
  products.forEach((product) => {
    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}">
        <div class="product-info">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="price-row">
            <p class="price">${product.price}</p>
            <span class="stock">${product.stock}</span>
          </div>
          <a href="https://wa.me/5511941431850?text=Olá! Gostaria de comprar ${product.title}" class="buy-button">
            <i class="fab fa-whatsapp"></i> Comprar
          </a>
        </div>
      </div>
    `;
  });
}

// Inicializar carrosséis
document.addEventListener("DOMContentLoaded", () => {
  createCarousel("gallery-grid", galleryImages);
  createCarousel("products-grid", products);
});

// Animações para a seção Manifesto
document.addEventListener("DOMContentLoaded", () => {
  // Criar textura de ruído para o background
  const noiseTexture = document.createElement("canvas");
  noiseTexture.width = 200;
  noiseTexture.height = 200;
  const ctx = noiseTexture.getContext("2d");

  const imgData = ctx.createImageData(200, 200);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.floor(Math.random() * 255);
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = Math.random() * 50; // Transparência
  }

  ctx.putImageData(imgData, 0, 0);

  // Exportar a imagem para o CSS
  const dataURL = noiseTexture.toDataURL("image/png");
  document.documentElement.style.setProperty(
    "--noise-texture",
    `url(${dataURL})`
  );

  // Animação dos benefícios
  const benefitsItems = document.querySelectorAll(".benefits-list li");
  let delay = 0;

  benefitsItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(20px)";
    item.style.transition = "all 0.5s ease";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, delay);

    delay += 200;
  });

  // Adicionar efeito de hover nos textos destacados
  const highlights = document.querySelectorAll(".highlight");

  highlights.forEach((highlight) => {
    highlight.addEventListener("mouseenter", () => {
      highlight.style.textShadow = "0 0 8px var(--accent-color)";
    });

    highlight.addEventListener("mouseleave", () => {
      highlight.style.textShadow = "none";
    });
  });

  // Efeito de "typing" para o número na estatística
  const statNumber = document.querySelector(".accent-pulse");
  if (statNumber) {
    const finalValue = statNumber.textContent;
    statNumber.textContent = "0";

    let currentValue = 0;
    const targetValue = parseInt(finalValue.replace("+", ""));
    const duration = 1500;
    const increment = targetValue / (duration / 30);

    const updateCounter = () => {
      currentValue += increment;
      if (currentValue < targetValue) {
        statNumber.textContent = Math.floor(currentValue);
        requestAnimationFrame(updateCounter);
      } else {
        statNumber.textContent = finalValue;
      }
    };

    // Iniciar o contador quando o elemento estiver visível
    const observerStat = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(updateCounter);
        observerStat.disconnect();
      }
    });

    observerStat.observe(statNumber);
  }

  // Aumentar a interatividade do botão de CTA
  const pulseButton = document.querySelector(".pulse-button");
  if (pulseButton) {
    // Adiciona uma sombra maior no hover
    pulseButton.addEventListener("mouseenter", () => {
      pulseButton.style.transform = "translateY(-5px) scale(1.05)";
      pulseButton.style.boxShadow = "0 10px 30px rgba(0, 255, 157, 0.7)";
    });

    pulseButton.addEventListener("mouseleave", () => {
      pulseButton.style.transform = "";
      pulseButton.style.boxShadow = "";
    });

    // Adiciona um efeito de clique
    pulseButton.addEventListener("mousedown", () => {
      pulseButton.style.transform = "translateY(2px) scale(0.98)";
    });

    pulseButton.addEventListener("mouseup", () => {
      pulseButton.style.transform = "translateY(-5px) scale(1.05)";
    });

    // Adiciona um efeito de "bounce" ocasional para chamar atenção
    let bounceInterval;

    const bounce = () => {
      pulseButton.style.transform = "translateY(-8px)";
      setTimeout(() => {
        pulseButton.style.transform = "";
      }, 300);
    };

    // Inicia o bounce após 3 segundos e repete a cada 10 segundos
    setTimeout(() => {
      bounce();
      bounceInterval = setInterval(bounce, 10000);
    }, 3000);

    // Para o efeito quando o botão for clicado
    pulseButton.addEventListener("click", () => {
      clearInterval(bounceInterval);
    });
  }
});

// Animações para a seção NFT
document.addEventListener("DOMContentLoaded", () => {
  // Animação do contador da lista de espera NFT
  const counterValue = document.querySelector(".counter-value");
  if (counterValue) {
    // Simula o contador crescendo rapidamente
    const finalValue = parseInt(counterValue.textContent);
    counterValue.textContent = "0";

    animateValue(counterValue, 0, finalValue, 2000);

    // Adiciona um incremento ocasional para simular novas inscrições
    setInterval(() => {
      const currentValue = parseInt(counterValue.textContent);
      const remainingSpan = document.querySelector(".counter-remaining span");

      if (currentValue < 100) {
        const newValue = currentValue + 1;
        animateValue(counterValue, currentValue, newValue, 500);

        if (remainingSpan) {
          const remaining = 100 - newValue;
          remainingSpan.textContent = remaining;
        }
      }
    }, 30000); // A cada 30 segundos
  }

  // Efeito 3D para o cartão NFT
  const nftCard = document.querySelector(".nft-card");
  if (nftCard) {
    nftCard.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = nftCard.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const tiltX = (y - 0.5) * 15;
      const tiltY = (x - 0.5) * -15;

      nftCard.querySelector(
        ".nft-card-inner"
      ).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;

      // Movimento da luz de brilho
      const shine = nftCard.querySelector(".nft-shine");
      if (shine) {
        shine.style.opacity = "0.2";
        shine.style.transform = `
          translate(${x * 100}%, ${y * 100}%) 
          rotate(45deg) 
          scale(1.5)
        `;
      }
    });

    nftCard.addEventListener("mouseleave", () => {
      const cardInner = nftCard.querySelector(".nft-card-inner");
      const shine = nftCard.querySelector(".nft-shine");

      cardInner.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";

      if (shine) {
        shine.style.opacity = "0";
      }
    });
  }

  // Envio do formulário da lista de espera
  const waitlistForm = document.querySelector(".waitlist-form");
  if (waitlistForm) {
    waitlistForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const phoneInput = document.getElementById("phone");
      const experienceInput = document.getElementById("experience");

      // Simulação de envio de dados (em um site real, isto enviaria para um servidor)
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        experience: experienceInput.value,
        timestamp: new Date().toISOString(),
      };

      console.log("Dados do formulário:", formData);

      // Feedback visual
      const button = waitlistForm.querySelector(".waitlist-button");
      const originalText = button.innerHTML;

      button.innerHTML =
        '<i class="fas fa-check-circle"></i> Inscrição Realizada!';
      button.style.backgroundColor = "#00d685";

      // Reseta o formulário e retorna o botão ao estado original após 3 segundos
      setTimeout(() => {
        waitlistForm.reset();
        button.innerHTML = originalText;
        button.style.backgroundColor = "";

        // Adiciona uma pessoa ao contador
        const counterValue = document.querySelector(".counter-value");
        const remainingSpan = document.querySelector(".counter-remaining span");

        if (counterValue && remainingSpan) {
          const currentValue = parseInt(counterValue.textContent);
          if (currentValue < 100) {
            const newValue = currentValue + 1;
            animateValue(counterValue, currentValue, newValue, 500);

            const remaining = 100 - newValue;
            remainingSpan.textContent = remaining;
          }
        }
      }, 3000);
    });
  }

  // Adiciona animações para os elementos da seção NFT
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const nftObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        nftObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observa os elementos para animação
  document
    .querySelectorAll(
      ".nft-card, .nft-benefits, .why-column, .nft-badge, .physical-art"
    )
    .forEach((element) => {
      element.classList.add("prepare-animation");
      nftObserver.observe(element);
    });
});

// Adiciona estilos dinâmicos para as animações do NFT
const nftStyle = document.createElement("style");
nftStyle.textContent = `
  .prepare-animation {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nft-card.animate-in {
    animation: card-reveal 0.7s ease forwards;
  }
  
  @keyframes card-reveal {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .why-column:nth-child(1).animate-in {
    transition-delay: 0.1s;
  }
  
  .why-column:nth-child(2).animate-in {
    transition-delay: 0.2s;
  }
  
  .why-column:nth-child(3).animate-in {
    transition-delay: 0.3s;
  }
  
  .why-column:nth-child(4).animate-in {
    transition-delay: 0.4s;
  }
  
  .nft-nav {
    position: relative;
  }
  
  .nft-nav::after {
    content: "Novo";
    position: absolute;
    top: -10px;
    right: -10px;
    background: var(--accent-color);
    color: #1a1a1a;
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
    border-radius: 10px;
    font-weight: bold;
    animation: bounce 2s infinite;
  }
`;

document.head.appendChild(nftStyle);

// Script para a seção do livro
document.addEventListener("DOMContentLoaded", function () {
  // Manusear opções de envio
  const shippingOptions = document.querySelectorAll(".shipping-toggle .option");
  const shippingContents = document.querySelectorAll(".shipping-content");

  if (shippingOptions.length > 0 && shippingContents.length > 0) {
    shippingOptions.forEach((option, index) => {
      option.addEventListener("click", () => {
        // Remover classes ativas
        shippingOptions.forEach((opt) => opt.classList.remove("active"));
        shippingContents.forEach((content) =>
          content.classList.remove("active")
        );

        // Adicionar classe ativa à opção clicada e ao conteúdo correspondente
        option.classList.add("active");
        shippingContents[index].classList.add("active");
      });
    });
  }

  // Slider de visualização do livro
  const previewTrack = document.querySelector(".preview-track");
  const previewItems = document.querySelectorAll(".preview-item");
  const prevButton = document.querySelector(".preview-arrow.prev");
  const nextButton = document.querySelector(".preview-arrow.next");

  if (previewTrack && previewItems.length > 0) {
    let currentSlide = 0;
    const totalSlides = previewItems.length;

    function updateSlider() {
      previewTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      });

      nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      });
    }
  }

  // Efeito 3D aprimorado para o livro
  const book3D = document.querySelector(".book-3d");
  const bookSection = document.querySelector(".book-section");

  if (book3D && bookSection) {
    // Valores para controlar a rotação máxima
    const maxRotationX = 15;
    const maxRotationY = 15;
    const dampingFactor = 0.05; // Fator de amortecimento para suavizar o movimento

    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    // Quando o mouse se move sobre a seção do livro
    bookSection.addEventListener("mousemove", function (e) {
      // Calcula a posição relativa do cursor dentro da seção do livro
      const rect = bookSection.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calcula a distância do centro
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Normaliza para valores entre -1 e 1
      const normalizedX = (mouseX - centerX) / centerX;
      const normalizedY = (mouseY - centerY) / centerY;

      // Define os ângulos alvo com base na posição do mouse
      targetRotationY = normalizedX * maxRotationY;
      targetRotationX = -normalizedY * maxRotationX;
    });

    // Remove o efeito ao sair da seção do livro
    bookSection.addEventListener("mouseleave", function () {
      targetRotationX = 0;
      targetRotationY = 0;
    });

    // Função de animação para suavizar o movimento
    function animateBook() {
      // Interpola suavemente entre o valor atual e o valor alvo
      currentRotationX += (targetRotationX - currentRotationX) * dampingFactor;
      currentRotationY += (targetRotationY - currentRotationY) * dampingFactor;

      // Aplica a rotação ao livro com efeito de profundidade
      book3D.style.transform = `
        perspective(1200px)
        rotateX(${currentRotationX}deg)
        rotateY(${currentRotationY}deg)
        translateZ(50px)
      `;

      // Continua a animação
      requestAnimationFrame(animateBook);
    }

    // Inicia a animação
    animateBook();

    // Adiciona um efeito de pulsação sutil ao livro para chamar atenção
    let scale = 1;
    let growing = true;
    const pulseMax = 1.02;
    const pulseMin = 0.98;
    const pulseSpeed = 0.0005;

    function pulseAnimation() {
      if (growing) {
        scale += pulseSpeed;
        if (scale >= pulseMax) growing = false;
      } else {
        scale -= pulseSpeed;
        if (scale <= pulseMin) growing = true;
      }

      // Aplica a escala apenas se o mouse não estiver sobre o livro
      if (targetRotationX === 0 && targetRotationY === 0) {
        book3D.style.transform = `
          perspective(1200px)
          scale(${scale})
          translateZ(50px)
        `;
      }

      requestAnimationFrame(pulseAnimation);
    }

    // Inicia a animação de pulso apenas se não estiver em dispositivo móvel
    if (window.innerWidth > 768) {
      pulseAnimation();
    }
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      if (question) {
        question.addEventListener("click", () => {
          const isActive = item.classList.contains("active");

          // Fechar todos os FAQs
          faqItems.forEach((faq) => {
            faq.classList.remove("active");
          });

          // Abrir o FAQ clicado se não estava ativo
          if (!isActive) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  // Contador de estoque (apenas para efeito visual)
  const buyButton = document.querySelector(".buy-book-button");

  if (buyButton) {
    buyButton.addEventListener("click", () => {
      // Animar o botão com um efeito de pulso
      buyButton.classList.add("pulse");
      setTimeout(() => {
        buyButton.classList.remove("pulse");
      }, 500);

      // Se for um link externo, deixar continuar normalmente
    });
  }

  // Efeito de partículas na seção do livro
  if (bookSection) {
    // Adicionar partículas que seguem o mouse com rastro aprimorado
    bookSection.addEventListener("mousemove", (e) => {
      // Criar mais partículas para efeito de rastro mais visível
      if (Math.random() > 0.7) {
        // Aumentada a probabilidade de criar partículas
        // Criar múltiplas partículas para efeito de rastro
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const particle = document.createElement("div");
            particle.classList.add("sparkle");

            // Adicionar variação à posição para efeito mais orgânico
            const offsetX = (Math.random() - 0.5) * 15;
            const offsetY = (Math.random() - 0.5) * 15;

            // Posicionar próximo ao mouse com leve variação
            particle.style.left = `${
              e.pageX - bookSection.offsetLeft + offsetX
            }px`;
            particle.style.top = `${
              e.pageY - bookSection.offsetTop + offsetY
            }px`;

            // Variação de tamanho para efeito mais dinâmico
            const size = Math.random() * 10 + 3;

            // Estilizar com aparência aprimorada
            particle.style.position = "absolute";
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = "var(--accent-color)";
            particle.style.boxShadow = "0 0 10px var(--accent-color)";
            particle.style.borderRadius = "50%";
            particle.style.filter = "blur(1px)";
            particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
            particle.style.pointerEvents = "none";
            particle.style.zIndex = "5";

            // Animar e remover
            bookSection.appendChild(particle);

            // Animação de movimento e fade out mais fluida
            const speedX = (Math.random() - 0.5) * 70;
            const speedY = (Math.random() - 0.5) * 70;
            const duration = Math.random() * 1500 + 800;

            const animation = particle.animate(
              [
                {
                  transform: "scale(1) translate(0, 0)",
                  opacity: particle.style.opacity,
                },
                {
                  transform: `scale(0) translate(${speedX}px, ${speedY}px)`,
                  opacity: 0,
                },
              ],
              {
                duration: duration,
                easing: "cubic-bezier(0.25, 1, 0.5, 1)",
              }
            );

            animation.onfinish = () => {
              particle.remove();
            };
          }, i * 40); // Timing escalonado para criar efeito de rastro
        }
      }
    });
  }
});

// Script para a seção do artista
document.addEventListener("DOMContentLoaded", function () {
  // Efeito de digitação para o subtítulo do artista
  const descriptions = [
    "Artista visual contemporânea",
    "Mosaicista urbana",
    "Transformadora de espaços",
    "Embaixadora da Monalisa",
    "Democratizadora da arte",
  ];

  const typingEffect = document.querySelector(".artist-section .typing-effect");
  const cursor = document.querySelector(".artist-section .cursor");

  if (typingEffect && cursor) {
    let descIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeText() {
      const currentText = descriptions[descIndex];

      if (isDeleting) {
        // Apagando texto
        typingEffect.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Apagar mais rápido que digitar
      } else {
        // Digitando texto
        typingEffect.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150; // Digitar mais devagar
      }

      // Lógica para alternar entre digitar e apagar
      if (!isDeleting && charIndex === currentText.length) {
        // Terminou de digitar - esperar antes de começar a apagar
        isDeleting = true;
        typingDelay = 1500; // Pausa quando termina de digitar
      } else if (isDeleting && charIndex === 0) {
        // Terminou de apagar - mudar para o próximo texto
        isDeleting = false;
        descIndex = (descIndex + 1) % descriptions.length;
        typingDelay = 500; // Pausa antes de começar a digitar novo texto
      }

      setTimeout(typeText, typingDelay);
    }

    // Iniciar o efeito de digitação
    setTimeout(typeText, 1000);
  }

  // Controlador de abas para a bio
  const bioTabs = document.querySelectorAll(".bio-tab");
  const bioContents = document.querySelectorAll(".bio-tab-content");

  if (bioTabs.length > 0 && bioContents.length > 0) {
    bioTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remover classe active de todas as abas e conteúdos
        bioTabs.forEach((t) => t.classList.remove("active"));
        bioContents.forEach((c) => c.classList.remove("active"));

        // Adicionar classe active à aba clicada
        tab.classList.add("active");

        // Mostrar o conteúdo correspondente
        const tabId = tab.getAttribute("data-tab");
        const content = document.getElementById(tabId);
        if (content) {
          content.classList.add("active");
        }
      });
    });
  }

  // Animação dos contadores quando visíveis na tela
  const statNumbers = document.querySelectorAll(".artist-section .stat-number");

  if (statNumbers.length > 0) {
    const options = {
      threshold: 0.5,
      rootMargin: "0px",
    };

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statElement = entry.target;
          const finalValue = statElement.getAttribute("data-value");

          if (finalValue && !statElement.classList.contains("animated")) {
            statElement.classList.add("animated");

            // Remover "+" se existir, para cálculo
            const numericValue = parseInt(finalValue.replace(/\+/g, ""));

            // Animar o contador
            let startValue = 0;
            let duration = 2000;
            let increment = numericValue / (duration / 20);

            const updateCounter = () => {
              startValue += increment;
              if (startValue < numericValue) {
                // Adicionar "+" de volta se existia no original
                statElement.textContent =
                  Math.floor(startValue) +
                  (finalValue.includes("+") ? "+" : "");
                requestAnimationFrame(updateCounter);
              } else {
                statElement.textContent = finalValue;
              }
            };

            requestAnimationFrame(updateCounter);

            // Parar de observar este elemento
            statObserver.unobserve(statElement);
          }
        }
      });
    }, options);

    // Observar cada contador
    statNumbers.forEach((stat) => {
      statObserver.observe(stat);
    });
  }
});

// Efeito de digitação para o subtítulo do livro
document.addEventListener("DOMContentLoaded", function () {
  const bookTypingEffect = document.querySelector(".book-typing-effect");
  const bookGlitchText = document.querySelector(".book-section .glitch-text");

  if (bookGlitchText) {
    // Garante que o atributo data-text esteja definido para o efeito glitch
    const textContent = bookGlitchText.textContent.trim();
    bookGlitchText.setAttribute("data-text", textContent);
  }

  if (bookTypingEffect) {
    const phrases = [
      "Um mergulho na arte urbana através do olhar de Mona Lisa",
      "180 intervenções artísticas que transformaram o espaço público",
      "Uma década de criação, transformação e resistência",
      "A arte como diálogo entre tradição e contemporaneidade",
      "Um livro para colecionadores e amantes da arte urbana",
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80; // Velocidade de digitação em ms
    let pauseDuration = 2000; // Pausa entre frases em ms

    function typeEffect() {
      const currentPhrase = phrases[currentPhraseIndex];

      // Determina a velocidade com base na ação (digitando ou deletando)
      if (isDeleting) {
        typingSpeed = 40; // Mais rápido para deletar
      } else {
        typingSpeed = 80; // Normal para digitar
      }

      // Se estiver digitando
      if (!isDeleting && currentCharIndex <= currentPhrase.length) {
        bookTypingEffect.textContent = currentPhrase.substring(
          0,
          currentCharIndex
        );
        currentCharIndex++;

        // Quando terminar de digitar, pausa e depois começa a deletar
        if (currentCharIndex > currentPhrase.length) {
          isDeleting = true;
          typingSpeed = pauseDuration; // Pausa antes de começar a deletar
        }
      }
      // Se estiver deletando
      else if (isDeleting && currentCharIndex >= 0) {
        bookTypingEffect.textContent = currentPhrase.substring(
          0,
          currentCharIndex
        );
        currentCharIndex--;

        // Quando terminar de deletar, muda para a próxima frase
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Inicia o efeito de digitação
    typeEffect();
  }
});

// ===== PRODUTOS SECTION =====
document.addEventListener("DOMContentLoaded", function () {
  // Filtro de produtos
  const productNavItems = document.querySelectorAll(".produtos-nav-item");
  const productCards = document.querySelectorAll(".produto-card");

  if (productNavItems.length > 0) {
    productNavItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remover classe active de todos os itens
        productNavItems.forEach((navItem) =>
          navItem.classList.remove("active")
        );

        // Adicionar classe active ao item clicado
        this.classList.add("active");

        // Obter a categoria selecionada
        const category = this.textContent.trim().toLowerCase();

        // Filtrar os produtos com base na categoria
        if (category === "todos") {
          // Mostrar todos os produtos
          productCards.forEach((card) => {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          });
        } else {
          // Filtrar produtos com base na categoria
          productCards.forEach((card) => {
            const cardCategory = card.getAttribute("data-category") || "";

            if (cardCategory.includes(category)) {
              card.style.display = "flex";
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, 50);
            } else {
              card.style.opacity = "0";
              card.style.transform = "translateY(20px)";
              setTimeout(() => {
                card.style.display = "none";
              }, 300);
            }
          });
        }
      });
    });
  }

  // Favoritos
  const favoriteButtons = document.querySelectorAll(".produto-favorite");

  if (favoriteButtons.length > 0) {
    favoriteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        this.classList.toggle("active");

        // Trocar o ícone
        const icon = this.querySelector("i");
        if (this.classList.contains("active")) {
          icon.classList.remove("far", "fa-heart");
          icon.classList.add("fas", "fa-heart");

          // Feedback visual (opcional)
          const hearts = createHeartParticles();
          button.appendChild(hearts);

          setTimeout(() => {
            hearts.remove();
          }, 1000);
        } else {
          icon.classList.remove("fas", "fa-heart");
          icon.classList.add("far", "fa-heart");
        }
      });
    });
  }

  // Função para criar partículas de coração ao favoritar
  function createHeartParticles() {
    const hearts = document.createElement("div");
    hearts.classList.add("heart-particles");

    // Criar várias partículas
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("i");
      heart.classList.add("fas", "fa-heart", "heart-particle");

      // Posição e tamanho aleatórios
      heart.style.left = `${Math.random() * 40}px`;
      heart.style.top = `${Math.random() * 40}px`;
      heart.style.fontSize = `${Math.random() * 10 + 10}px`;
      heart.style.animationDuration = `${Math.random() * 1 + 0.5}s`;

      hearts.appendChild(heart);
    }

    return hearts;
  }
});

// ===== WORKSHOP SECTION =====
document.addEventListener("DOMContentLoaded", function () {
  // Animação de contador para estatísticas
  const workshopPriceElement = document.querySelector(".workshop-price");

  if (workshopPriceElement) {
    // Criar observador de interseção
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se o elemento estiver visível
          if (entry.isIntersecting) {
            // Iniciar animação de contagem
            animateCounter(workshopPriceElement, 0, 350, 2000);
            // Parar de observar após animação
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Iniciar observação
    observer.observe(workshopPriceElement);
  }

  // Função para animar contador
  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };

    window.requestAnimationFrame(step);
  }

  // Carrossel de datas de workshop
  const workshopDateItems = document.querySelectorAll(".workshop-date-item");

  if (workshopDateItems.length > 0) {
    workshopDateItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateX(10px) scale(1.02)";
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateX(0) scale(1)";
      });
    });
  }
});

// ===== FOOTER =====
document.addEventListener("DOMContentLoaded", function () {
  // Ação do botão de "Voltar ao topo"
  const backToTopButton = document.querySelector(".footer-back-top");

  if (backToTopButton) {
    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Rolagem suave para o topo
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Mostrar/ocultar botão "Voltar ao topo" com base na rolagem
  window.addEventListener("scroll", function () {
    if (backToTopButton) {
      if (window.scrollY > 500) {
        backToTopButton.style.opacity = "1";
        backToTopButton.style.visibility = "visible";
      } else {
        backToTopButton.style.opacity = "0";
        backToTopButton.style.visibility = "hidden";
      }
    }
  });

  // Animação de entrada para o formulário do footer
  const footerForm = document.querySelector(".footer-form-container");

  if (footerForm) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footerForm.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(footerForm);
  }

  // Funcionalidade do formulário de newsletter
  const newsletterForm = document.querySelector(".footer-form-container");
  const newsletterInput = document.querySelector(".footer-form-input");
  const newsletterButton = document.querySelector(".footer-form-btn");

  if (newsletterForm && newsletterInput && newsletterButton) {
    newsletterButton.addEventListener("click", function () {
      const email = newsletterInput.value.trim();

      // Validação simples de email
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Aqui você faria a integração com seu sistema de newsletters
        // Por enquanto, vamos apenas mostrar um feedback visual
        newsletterInput.value = "";

        // Criar elemento de confirmação
        const confirmation = document.createElement("div");
        confirmation.classList.add("newsletter-confirmation");
        confirmation.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <span>Cadastro realizado com sucesso!</span>
        `;

        // Substituir o formulário pela confirmação
        newsletterForm.style.display = "none";
        newsletterForm.parentNode.appendChild(confirmation);

        // Remover confirmação após alguns segundos
        setTimeout(() => {
          confirmation.style.opacity = "0";
          setTimeout(() => {
            confirmation.remove();
            newsletterForm.style.display = "flex";
          }, 500);
        }, 3000);
      } else {
        // Feedback de erro
        newsletterInput.classList.add("error");

        setTimeout(() => {
          newsletterInput.classList.remove("error");
        }, 1000);
      }
    });
  }
});

// Adicionar estilos CSS dinâmicos para as novas funcionalidades
(function () {
  const style = document.createElement("style");
  style.textContent = `
    .heart-particles {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .heart-particle {
      position: absolute;
      color: #ff6b6b;
      animation: float-up 1s ease-out forwards;
      opacity: 0;
    }
    
    @keyframes float-up {
      0% {
        transform: translateY(0) scale(0.5);
        opacity: 1;
      }
      100% {
        transform: translateY(-30px) scale(1.2);
        opacity: 0;
      }
    }
    
    .produto-favorite.active {
      background-color: rgba(255, 107, 107, 0.2);
      color: #ff6b6b;
    }
    
    .newsletter-confirmation {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #00ff9d;
      font-size: 0.95rem;
      margin-top: 10px;
      transition: opacity 0.5s ease;
    }
    
    .newsletter-confirmation i {
      font-size: 1.2rem;
    }
    
    .footer-form-input.error {
      border-color: #ff6b6b;
      animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    
    @keyframes shake {
      10%, 90% { transform: translateX(-1px); }
      20%, 80% { transform: translateX(2px); }
      30%, 50%, 70% { transform: translateX(-3px); }
      40%, 60% { transform: translateX(3px); }
    }
    
    .footer-form-container.animate-in {
      animation: slideUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  document.head.appendChild(style);
})();

// Melhorar a navegação ativa durante a rolagem da página
window.addEventListener("scroll", highlightNavOnScroll);
window.addEventListener("load", highlightNavOnScroll);

// Função para destacar o link de navegação ativo com base na seção visível
function highlightNavOnScroll() {
  // Obter a posição atual de rolagem
  const scrollPosition = window.scrollY;

  // Obter todas as seções com ids
  const sections = document.querySelectorAll("section[id], header[id]");

  // Obter os links da navegação
  const navLinks = document.querySelectorAll(".nav-links a");

  // Verificar qual seção está visível
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Ajuste para compensar a altura da navbar
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remover a classe ativa de todos os links
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Adicionar a classe ativa ao link correspondente
      const activeLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");

        // Adicionar efeito visual especial para o link ativo
        activeLink.style.transition = "all 0.3s ease";
        activeLink.style.transform = "scale(1.05)";
        setTimeout(() => {
          activeLink.style.transform = "scale(1)";
        }, 300);
      }
    }
  });
}

// Animar a rolagem ao clicar nos links de navegação
document.querySelectorAll('.nav-links a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Fechar o menu mobile, se estiver aberto
    if (navLinks.classList.contains("active")) {
      toggleMobileMenu();
    }

    // Rolar suavemente para a seção
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70, // Ajuste para compensar a navbar
        behavior: "smooth",
      });
    }
  });
});

// ===== FINE ART PAGE =====
document.addEventListener("DOMContentLoaded", function () {
  // Filtros da galeria de Fine Arts removidos - mantendo apenas as categorias em cada item para referência

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", function () {
        // Fecha todos os outros itens
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });

        // Toggle active class no item atual
        item.classList.toggle("active");
      });
    });
  }

  // Animação de entrada dos elementos na página
  const animateElements = document.querySelectorAll(
    ".fine-art-item, .process-step, .faq-item"
  );

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "all 0.6s ease";
      observer.observe(element);
    });

    // Estilo para a animação de entrada
    document.head.insertAdjacentHTML(
      "beforeend",
      `
      <style>
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      </style>
    `
    );
  }

  // Smooth Scroll para links de ancoragem
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  if (scrollLinks.length > 0) {
    scrollLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href !== "#") {
          e.preventDefault();
          const target = document.querySelector(href);

          if (target) {
            window.scrollTo({
              top: target.offsetTop - 80,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }
});
