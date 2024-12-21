// constructor.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const resultContainer = document.getElementById('resultContainer');

    const loadFromStorage = () => {
        const savedData = localStorage.getItem('eisenhowerData');
        return savedData ? JSON.parse(savedData) : null;
    };

    const populateFields = () => {
        const data = loadFromStorage();
        if (data) {
            document.getElementById('urgentImportant').value = data.urgentImportant;
            document.getElementById('notUrgentImportant').value = data.notUrgentImportant;
            document.getElementById('urgentNotImportant').value = data.urgentNotImportant;
            document.getElementById('notUrgentNotImportant').value = data.notUrgentNotImportant;
        }
    };

    const saveToStorage = (data) => {
        localStorage.setItem('eisenhowerData', JSON.stringify(data));
    };

    const generateTable = (data) => {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix';

        function createMatrixSection(title, items, className) {
            const section = document.createElement('div');
            section.className = `matrix__item ${className}`;

            const heading = document.createElement('h3');
            heading.textContent = title;

            const list = document.createElement('ul');
            items.split('\n').forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                list.appendChild(listItem);
            });

            section.appendChild(heading);
            section.appendChild(list);

            return section;
        }

        matrixContainer.appendChild(createMatrixSection(
            'Срочное и важное',
            data.urgentImportant,
            'matrix__item_urgent-important'
        ));
        matrixContainer.appendChild(createMatrixSection(
            'Не срочное, но важное',
            data.notUrgentImportant,
            'matrix__item_not-urgent-important'
        ));
        matrixContainer.appendChild(createMatrixSection(
            'Срочное, но не важное',
            data.urgentNotImportant,
            'matrix__item_urgent-not-important'
        ));
        matrixContainer.appendChild(createMatrixSection(
            'Не срочное и не важное',
            data.notUrgentNotImportant,
            'matrix__item_not-urgent-not-important'
        ));

        resultContainer.textContent = '';
        resultContainer.appendChild(matrixContainer);

    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            urgentImportant: document.getElementById('urgentImportant').value,
            notUrgentImportant: document.getElementById('notUrgentImportant').value,
            urgentNotImportant: document.getElementById('urgentNotImportant').value,
            notUrgentNotImportant: document.getElementById('notUrgentNotImportant').value,
        };

        saveToStorage(data);

        generateTable(data);

        Swal.fire({
            title: 'Готово!', // Заголовок
            text: 'Теперь тут находится табличка, в которую вы вложили частичку своей души! ', // Текст окна
            icon: 'info', // Иконка
            confirmButtonText: 'ОК', // Текст на кнопке
        })
    });

    populateFields();
    const data = {
        urgentImportant: document.getElementById('urgentImportant').value,
        notUrgentImportant: document.getElementById('notUrgentImportant').value,
        urgentNotImportant: document.getElementById('urgentNotImportant').value,
        notUrgentNotImportant: document.getElementById('notUrgentNotImportant').value,
    };
    generateTable(data)
});
