// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Form validation and optional redirect
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            form.classList.add('was-validated');
            const redirect = form.dataset.redirect;
            if (redirect) {
                event.preventDefault();
                window.location.href = redirect;
            }
        }, false);
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const cards = document.querySelectorAll('.item-card');
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }

    // Toast notifications
    function showToast(message, type = 'success') {
        const toast = document.getElementById('liveToast');
        if (!toast) return;
        const toastBody = toast.querySelector('.toast-body');
        if (!toastBody) return;

        toastBody.textContent = message;
        toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    // Report form submission
    const reportForms = document.querySelectorAll('.report-form');
    reportForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Item reported successfully! ✅');
            this.reset();
            this.classList.remove('was-validated');
        });
    });

    // Stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            const increment = target / 100;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(statsSection);
    } else if (statsSection) {
        animateCounters();
    }
});
