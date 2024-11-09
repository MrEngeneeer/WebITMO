(function () {

    window.addEventListener("load", function () {

        const loadTime = performance.now();
        const footer = document.querySelector("footer");
        const loadInfo = document.createElement("p");
        loadInfo.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
        footer.appendChild(loadInfo);

        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('nav ul');
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show');
        });

        const menuItems = document.querySelectorAll('nav a');
        const currentPath = document.location.pathname.split("/").pop();
        menuItems.forEach((item) => {
            if (item.getAttribute("href") === currentPath) {
                item.classList.add("active");
            }
        });

    });

})();
