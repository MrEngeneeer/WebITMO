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




document.addEventListener('DOMContentLoaded', () => {
    const commentPreloader = document.getElementById('comment-preloader');
    const commentList = document.getElementById('comment-list');
    const commentApiUrl = 'https://jsonplaceholder.typicode.com/comments';

    const getCommentFilter = () => Math.random() > 0.5 ? 'id_gte=100' : 'id_lte=50';

    const loadComments = () => {
        const filter = getCommentFilter();
        commentPreloader.style.display = 'block';

        fetch(`${commentApiUrl}?${filter}&_limit=5`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(comments => {
                commentPreloader.style.display = 'none';
                comments.forEach(comment => {
                    const li = document.createElement('li');

                    const name = document.createElement('strong');
                    name.textContent = comment.name;

                    const email = document.createElement('span');
                    email.textContent = ` (${comment.email})`;

                    const body = document.createElement('p');
                    body.textContent = comment.body;

                    li.appendChild(name);
                    li.appendChild(email);
                    li.appendChild(document.createElement('br'));
                    li.appendChild(body);
                    commentList.appendChild(li);
                });
            })
            .catch(error => {
                commentPreloader.style.display = 'none';
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('error');
                errorMessage.textContent = `⚠ Что-то пошло не так: ${error.message}`;
                commentList.appendChild(errorMessage);
            });
    };

    loadComments();
    //Swiper для того, чтобы переключать фотки
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Бесконечная прокрутка
        pagination: {
            el: '.swiper-pagination', // Какой элемент участвует в пагинации
            clickable: true, // Возможность клика по пагинации
        },
        navigation: {
            nextEl: '.swiper-button-next', // Кнопка "вперед"
            prevEl: '.swiper-button-prev', // Кнопка "назад"
        },
        autoplay: {
            delay: 7000, // Автопрокрутка каждые 3 секунды
            disableOnInteraction: false, // Не отключать автопрокрутку при взаимодействии
        },
    });
});



