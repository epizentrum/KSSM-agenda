/**
 * Google Sheets integration
 *
 * https://docs.google.com/spreadsheets/d/1ffjK-aSWFp4GYaetBaOuiWITABSi8hAB0FgnMjvvkl4/edit#gid=0
 */
const sheetId = '1ffjK-aSWFp4GYaetBaOuiWITABSi8hAB0FgnMjvvkl4';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Czwartek, 1 czerwca';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;


document.addEventListener('DOMContentLoaded', init);

function init() {
    const table = document.querySelector('.lectures');
    if (!table) return;

    const data = [];

    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];

            jsonData.table.rows.forEach((rowData) => {
                const row = {};

                /* Downloading data */
                if (rowData.c[0] != null && rowData.c[0].v != sheetName) {
                    row['lectureName'] = (rowData.c[0].v != null) ? rowData.c[0].v : '';
                    row['lectureAuthor'] = (rowData.c[1].v != null) ? rowData.c[1].v : '';
                    row['lectureHall'] = (rowData.c[2].v != null) ? rowData.c[2].v : '';
                    row['lectureTime'] = (rowData.c[3].f != null) ? rowData.c[3].f : '';
                    row['lectureDescription'] = (rowData.c[4].v != null) ? rowData.c[4].v : '';
                    row['lectureDayTag'] = (rowData.c[5].v != null) ? rowData.c[5].v : '';

                    data.push(row);
                }
            })
            processRows(data, table);
        })
        .catch((error) => {
            console.log(error)
        })

}

function processRows(json, table) {
    json.forEach((row) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('card-main');
        card.setAttribute('data-day', row['lectureDayTag']);
        /* Card inner content - style accordingly */
        const cardInner =
            `
        <div class="card-body d-flex flex-column">
            <div class="card-top d-flex justify-content-between">
                <p class="card-text text-left card-time">${row['lectureTime']}</p>
                <img src="./resources/logoipsum-225.svg" alt="logo" class="">
            </div>
            <div class="card-center py-4">
                <h4 class="card-title text-center">${row['lectureName']}</h4>
                <p class="card-text text-center card-author">${row['lectureAuthor']}</p>
            </div>
            <p class="card-text card-hall">${row['lectureHall']}</p>
        </div>
        `;
        card.innerHTML = cardInner;

        const modal = document.createElement('dialog');
        const modalBtn = document.createElement('button');
        // Change for some X icon if needed
        modalBtn.innerText = 'X';
        modalBtn.setAttribute('aria-label', 'Zamknij');
        modalBtn.addEventListener("click", (e) => {
            modal.close();
        });


        /* Card modal content - style accordingly */
        const modalInner =
            `
        <div class="card-body d-flex flex-column">
            <div class="card-top d-flex justify-content-between">
                <p class="card-text text-left card-time">${row['lectureTime']}</p>
                <img src="./resources/logoipsum-225.svg" alt="logo" class="">
            </div>
            <div class="card-center py-4">
                <h4 class="card-title text-center">${row['lectureName']}</h4>
                <p class="card-text text-center card-author">${row['lectureAuthor']}</p>
            </div>
            <p class="card-text card-hall">${row['lectureHall']}</p>
            <p class="card-text card-description">${row['lectureDescription']}</p>
        </div>
        `;

        modal.innerHTML = modalInner;
        modal.insertBefore(modalBtn, modal.firstChild);


        card.addEventListener("click", e => {
            modal.showModal();
        })

        modal.addEventListener("click", e => {
            const dialogDimensions = modal.getBoundingClientRect()
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close()
            }
        })
        table.appendChild(card);
        table.appendChild(modal)
    })
}