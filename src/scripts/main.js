document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.nav__toggle');
    const menuItems = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__item');
    const eventDate = new Date('2025-06-02T20:00:00');

    menuToggle.addEventListener('click', () => {
        menuItems.classList.toggle('active');
    });


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            menuItems.classList.remove('active');
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    function updateCountdown() {
        const now = new Date();
        const timeDifference = eventDate - now;

        if (timeDifference <= 0) {
            document.getElementById('countdown').innerText = 'O evento começou!';
            clearInterval(interval); 
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerText = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Atualiza a contagem a cada segundo
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); 
});