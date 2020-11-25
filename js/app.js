/* Variables */

const url = 'https://randomuser.me/api/?results=12&nat=gb,us,fr';
const employees = [];
const main = document.getElementById('main');
const modalOverlay = document.querySelector('.modal-overlay');

/* Fetch Functions */

fetch(url)
    .then((response) => response.json())
    .then(employeeData);

/* Functions */

// Employee Card Function

/* This function fetches the employee data from the Fetch API and displays the results for the employee thumbnail and employee data. */

function employeeData(data) {
    for(let i = 0; i < data.results.length; i += 1) {
        employees.push(data.results[i]);
        main.innerHTML +=  ` 
            <div class="card">
                <div class="image-container">
                    <img src="${data.results[i].picture.medium}" alt="">
                </div>
                <div class="employee-info">
                    <h2 class="employee-name">${data.results[i].name.first} ${data.results[i].name.last}</h2>
                    <p>${data.results[i].email}<p>
                    <p>${data.results[i].location.city}</p>
                </div>
            </div>
        `;
    }

    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', (event) => {
            modal(employees[index], index);
        });
    });
}

// Modal Function

/* This function parses the data from the Fetch API based on search critieria and displays a large employee thumbnail and employee data in the popup modal window. */

function modal(employee, index) {
    
    const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);

    modalOverlay.innerHTML = `
        <div class="modal-content" data-index="${index}">
            <span class="close">X</span>
            <div class="modal-image-container">
                <button class="left-arrow"><</button>
                <img src="${employee.picture.large}" alt="">
                <button class="right-arrow">></button>
            </div>
            <h2 class="employee-name">${employee.name.first} ${employee.name.last}</h2>
            <p>${employee.email}</p>
            <p>${employee.location.city}</p>
            <hr>
            <p>${employee.cell}</p>
            <p>${employee.location.street.number} ${employee.location.street.name}, 
            ${employee.location.state} ${employee.location.postcode}</p>
            <p>Birthday: ${dob}</p>
        </div>
    `;

    modalOverlay.style.display = 'flex';
    const modalClose = document.getElementsByClassName('close')[0];

    modalClose.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
}

// Event Listeners

/* This event listener listens for clicks on the navigation arrows in the popup modal window and increments the employee data either forwards or backwards in the current list of employees. */

modalOverlay.addEventListener('click', (event) => {
    if(event.target.className === 'right-arrow') {
        let indexPosition = parseInt(modalOverlay.firstElementChild.getAttribute('data-index'));
        indexPosition += 1;
        if (indexPosition < 12) {
            modal(employees[indexPosition], indexPosition);
        }
    }
    if(event.target.className === 'left-arrow') {
        let indexPosition = parseInt(modalOverlay.firstElementChild.getAttribute('data-index'));
        indexPosition -= 1;
        if (indexPosition > -1) {
            modal(employees[indexPosition], indexPosition);
        }
    }
});

/* Search Filter */

/* This event listener listens for any keyup events in the input search field and displays the resulting card of the search based on the card data. */

const searchString = document.getElementById('search');
const a = document.getElementsByClassName('card');

searchString.addEventListener('keyup', () => {
    const input = searchString.value.toLowerCase();

    for (let i = 0; i < a.length; i += 1) {
        const nameData = a[i].innerHTML;
        if (nameData.toLowerCase().indexOf(input) > -1) {
            a[i].style.display = "";
            } else {
            a[i].style.display = "none";
        }
    }
});

/* This event listener listens for a null value in the input search field so the search results are reset and all cards are displayed. */

searchString.addEventListener('search', () => {
    if (event.target.value === '') {
      for (let i = 0; i < a.length; i += 1) {
        a[i].style.display = "";
      }
    }
});
