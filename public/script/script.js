(function() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();

        const loadTimeInSeconds = (loadTime / 1000).toFixed(2);

        const footer = document.querySelector('footer');
        const loadTimeElement = document.createElement('p');
        loadTimeElement.textContent = `Загрузка страницы заняла: ${loadTimeInSeconds} секунд.`;
        footer.appendChild(loadTimeElement);
    });

    const menuLinks = document.querySelectorAll('nav ul li a');

    menuLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.color = '#FFD700';
        });

        link.addEventListener('mouseout', function() {
            this.style.color = '';
        });

        // Добавление класса активной страницы
        if (link.href === document.location.href) {
            link.classList.add('active');
        }
    });
})();