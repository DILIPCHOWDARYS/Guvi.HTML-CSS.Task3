const dataContainer = document.getElementById('data-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumberElement = document.createElement('span'); // Create a span element for page number

nextButton.parentNode.insertBefore(pageNumberElement, nextButton);

let currentPage = 1;
const itemsPerPage = 10;
let dataList = [];

fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    .then(response => response.json())
    .then(data => {
        dataList = data;
        displayData();
        updatePaginationButtons();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function displayData() {
    dataContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = dataList.slice(start, end);

    itemsToDisplay.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.textContent = `${item.id}: ${item.name} : ${item.email}`;
        dataContainer.appendChild(div);
    });

    updatePageNumber();
}

function updatePaginationButtons() {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(dataList.length / itemsPerPage);
}

function updatePageNumber() {
    pageNumberElement.textContent = ` Page ${currentPage} `;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayData();
        updatePaginationButtons();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(dataList.length / itemsPerPage)) {
        currentPage++;
        displayData();
        updatePaginationButtons();
    }
});
