function acheter(produit) {
    const numero = '221777269484'; // Numéro WhatsApp du client
    const message = encodeURIComponent(`Bonjour, je souhaite acheter : ${produit}`);
    window.open(`https://wa.me/${numero}?text=${message}`, '_blank');
}

function ouvrirPaiement(produit) {
    document.getElementById('modalPaiement').classList.add('active');
    document.getElementById('produitPaiement').textContent = `Produit : ${produit}`;
}

function fermerPaiement() {
    document.getElementById('modalPaiement').classList.remove('active');
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons rapidement.');
    this.reset();
});

// Animation scroll top-down
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animate');
    const triggerBottom = window.innerHeight * 0.92;
    elements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Recherche de produits
const searchInput = document.getElementById('searchProduit');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        document.querySelectorAll('.produit-card').forEach(card => {
            const titre = card.querySelector('h3').textContent.toLowerCase();
            if (titre.includes(value)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// === Carousel de présentation des produits ===
window.addEventListener('DOMContentLoaded', function() {
    // Récupérer les infos produits depuis le DOM
    const produits = Array.from(document.querySelectorAll('.produit-card')).map(card => ({
        img: card.querySelector('.produit-img').src,
        alt: card.querySelector('.produit-img').alt,
        titre: card.querySelector('h3').textContent,
        prix: card.querySelector('.prix').textContent,
        whatsapp: card.querySelector('.btns-flex button:nth-child(1)').getAttribute('onclick'),
        payer: card.querySelector('.btns-flex button:nth-child(2)').getAttribute('onclick'),
    }));
    const carouselInner = document.querySelector('.carousel-inner');
    const dotsContainer = document.querySelector('.carousel-dots');
    let current = 0;
    // Générer les slides
    function renderSlides() {
        carouselInner.innerHTML = '';
        produits.forEach((prod, i) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-item' + (i === 0 ? ' active' : '');
            slide.innerHTML = `
                <img src="${prod.img}" alt="${prod.alt}" class="produit-img">
                <h3>${prod.titre}</h3>
                <p class="prix">${prod.prix}</p>
                <div class="btns-flex">
                    <button onclick="${prod.whatsapp}">WhatsApp</button>
                    <button onclick="${prod.payer}">Payer ici</button>
                </div>
            `;
            carouselInner.appendChild(slide);
        });
    }
    // Générer les points
    // function renderDots() {
    //     dotsContainer.innerHTML = '';
    //     produits.forEach((_, i) => {
    //         const dot = document.createElement('button');
    //         dot.className = i === 0 ? 'active' : '';
    //         dot.addEventListener('click', () => goToSlide(i));
    //         dotsContainer.appendChild(dot);
    //     });
    // }
    function updateCarousel() {
        document.querySelectorAll('.carousel-item').forEach((el, i) => {
            el.classList.toggle('active', i === current);
        });
        document.querySelectorAll('.carousel-dots button').forEach((el, i) => {
            el.classList.toggle('active', i === current);
        });
    }
    function goToSlide(idx) {
        current = (idx + produits.length) % produits.length;
        updateCarousel();
    }
    document.querySelector('.carousel-nav.left').onclick = () => goToSlide(current - 1);
    document.querySelector('.carousel-nav.right').onclick = () => goToSlide(current + 1);
    // Auto-slide
    let autoSlide = setInterval(() => goToSlide(current + 1), 2000);
    carouselInner.onmouseenter = () => clearInterval(autoSlide);
    carouselInner.onmouseleave = () => autoSlide = setInterval(() => goToSlide(current + 1), 2000);
    // Init
    renderSlides();
    // renderDots();
});

// === Mini-carousel dans chaque carte produit ===
document.querySelectorAll('.mini-carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.mini-carousel-img');
    let current = 0;
    function showImage(idx) {
        images.forEach((img, i) => img.classList.toggle('active', i === idx));
    }
    carousel.querySelector('.mini-carousel-nav.left').onclick = () => {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    };
    carousel.querySelector('.mini-carousel-nav.right').onclick = () => {
        current = (current + 1) % images.length;
        showImage(current);
    };
}); 