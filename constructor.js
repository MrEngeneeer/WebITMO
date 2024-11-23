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
        resultContainer.innerHTML = `
      <div class="matrix">
        <div class="matrix__item matrix__item_urgent-important">
          <h3>Срочное и важное</h3>
          <ul>${data.urgentImportant.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="matrix__item matrix__item_not-urgent-important">
          <h3>Не срочное, но важное</h3>
          <ul>${data.notUrgentImportant.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="matrix__item matrix__item_urgent-not-important">
          <h3>Срочное, но не важное</h3>
          <ul>${data.urgentNotImportant.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="matrix__item matrix__item_not-urgent-not-important">
          <h3>Не срочное и не важное</h3>
          <ul>${data.notUrgentNotImportant.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>
    `;
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
    });

    populateFields();
});
