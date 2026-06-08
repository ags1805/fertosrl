window.history.scrollRestoration = "manual";

window.addEventListener('load', () => {

    if (!window.location.hash) {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });

    }

});

async function loadComponent(id, file) {

    const response = await fetch(file);
    const data = await response.text();

    document.getElementById(id).innerHTML = data;

}

async function initSite() {

    await loadComponent('header', 'components/header.html');

    await loadComponent('footer', 'components/footer.html');

    initHeader();
    initMobileMenu();
    initAnimations();
    initProjectFilters();
    initFaq();
    initProjectModal();

}

function initMobileMenu() {

    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (!menuToggle || !navbar) return;

    menuToggle.addEventListener('click', () => {

        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');

    });

}

function initAnimations() {

    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

        });

    }, {
        threshold: 0.2
    });

    elements.forEach(element => {
        observer.observe(element);
    });

}

function initHeader() {

    const header = document.querySelector('.header');

    if (!header) return;

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

    });

}

function initFaq() {

    const questions = document.querySelectorAll('.faq-question');

    if (!questions.length) return;

    questions.forEach(question => {

        question.addEventListener('click', () => {

            const answer = question.nextElementSibling;
            const icon = question.querySelector('span');

            const isOpen = answer.style.maxHeight;

            document.querySelectorAll('.faq-answer').forEach(item => {
                item.style.maxHeight = null;
            });

            document.querySelectorAll('.faq-question span').forEach(item => {
                item.textContent = '+';
            });

            if (!isOpen) {

                answer.style.maxHeight =
                    answer.scrollHeight + 'px';

                icon.textContent = '−';

            }

        });

    });

}

function initProjectFilters() {

    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.gallery-project-card');

    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {

        button.addEventListener('click', () => {

            buttons.forEach(btn =>
                btn.classList.remove('active')
            );

            button.classList.add('active');

            const filter =
                button.dataset.filter;

            cards.forEach(card => {

                if (
                    filter === 'all' ||
                    card.dataset.category === filter
                ) {

                    card.style.display = 'block';

                } else {

                    card.style.display = 'none';

                }

            });

        });

    });

}

function initProjectModal() {

    const modal = document.getElementById("projectModal");

    if (!modal) return;

    const cards =
        document.querySelectorAll(".gallery-project-card");

    const modalImage =
        document.getElementById("modalImage");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalFeatures =
        document.getElementById("modalFeatures");

    const closeBtn =
        document.querySelector(".project-modal-close");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            modalImage.src =
                card.dataset.image;

            modalCategory.textContent =
                card.dataset.category;

            modalTitle.textContent =
                card.dataset.title;

            modalDescription.textContent =
                card.dataset.description;

            modalFeatures.innerHTML = "";

            card.dataset.features
                .split("|")
                .forEach(feature => {

                    if (feature.trim()) {

                        modalFeatures.innerHTML += `
                            <li>${feature.trim()}</li>
                        `;

                    }

                });

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("active");

        document.body.style.overflow = "auto";

    });

    modal.addEventListener("click", e => {

        if (e.target === modal) {

            modal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    });

}

initSite();