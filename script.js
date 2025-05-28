// script.js
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sunSwitch = document.getElementById('sun_switch');
    const backToTopButton = document.getElementById('backToTop');
    const currentYearSpan = document.getElementById('currentYear');
    const skillBarFills = document.querySelectorAll('.skills-bar-fill');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const projectFilterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');


    // --- Light/Dark Mode Toggle ---
    function applyMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            // Update toggle switch visuals explicitly if needed beyond CSS :checked
            // This is mostly handled by CSS, but good for direct JS manipulation if required
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // Check local storage for saved mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        sunSwitch.checked = true;
        applyMode(true);
    } else {
        sunSwitch.checked = false;
        applyMode(false);
    }

    sunSwitch.addEventListener('change', () => {
        if (sunSwitch.checked) {
            applyMode(true);
            localStorage.setItem('darkMode', 'enabled');
        } else {
            applyMode(false);
            localStorage.setItem('darkMode', 'disabled');
        }
    });


    // --- Skill Bar Animation ---
    function animateSkillBars() {
        skillBarFills.forEach(el => {
            const percent = el.getAttribute('data-percent');
            el.style.width = '0%'; // Reset for re-animation on scroll for example
            // Ensure the element is in view to trigger animation
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                 setTimeout(() => { // Small delay to ensure it's visible
                    el.style.width = percent;
                 }, 100);
            }
        });
    }
    // Initial animation if visible
    animateSkillBars();
    // Optional: Re-animate on scroll if you want them to animate when they come into view
    // window.addEventListener('scroll', animateSkillBars);


    // --- Back to Top Button ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
            setTimeout(() => backToTopButton.style.opacity = '1', 10); // Fade in
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => backToTopButton.style.display = 'none', 300); // Fade out
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- Current Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // --- Active Navigation Link Highlighting on Scroll ---
    function highlightNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) { // Adjust offset as needed
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call


    // --- Project Filtering ---
    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex'; // Or 'block' if you change display type
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Smooth Scroll for Nav Links ---
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Contact Form Submission (Basic Placeholder) ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real scenario, you'd use Fetch API or XMLHttpRequest to send data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert(`Thank you, ${name}! Your message has been "sent" (for demo purposes).\n\nEmail: ${email}\nMessage: ${message}`);
                contactForm.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }

});