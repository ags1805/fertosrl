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

function initProjectFilters() {

    const buttons = document.querySelectorAll('.filter-btn');

    const projects = document.querySelectorAll('.gallery-project-card');

    if (!buttons.length) return;

    buttons.forEach(button => {

        button.addEventListener('click', () => {

            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            const filter = button.dataset.filter;

            projects.forEach(project => {

                if (
                    filter === 'all' ||
                    project.dataset.category === filter
                ) {

                    project.style.display = 'block';

                } else {

                    project.style.display = 'none';

                }

            });

        });

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

initSite();