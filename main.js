"use strict";

function createNewCat(name, breed, age, color) {
    let cat = {
        name: name,
        breed: breed,
        age: age,
        color: color,
    };

    return cat;
}


function addCatToDatabase(database, cat) {
    database.push(cat);
}

function removeCatById(cats, id) {
    for (let i = 0; i < cats.length; i++) {

        let cat = cats[i];

        if (cat.id == id) {

            cats.splice(i, 1);
            return;
        }
    }
}

function getCatsByBreed(cats, breed) {
    let catsByBreed = [];

    for (let cat of cats) {
        if (cat.breed.toLowerCase() == breed.toLowerCase()) {
            catsByBreed.push(cat);
        }
    }

    return catsByBreed;
}


function getCatsByAge(cats, age) {
    let catsByAge = [];

    for (let cat of cats) {
        if (cat.age == age) {
            catsByAge.push(cat);
        }
    }

    return catsByAge;
}



function getAverageCatAge(cats) {
    let sumOfAges = 0;


    for (let cat of cats) {
        sumOfAges = sumOfAges + cat.age;
    }


    return Math.round(sumOfAges / cats.length);
}

function getCatsByColor(cats, color) {
    let catsByColor = [];

    for (let cat of cats) {
        if (cat.color.toLowerCase() == color.toLowerCase()) {
            catsByColor.push(cat);
        }
    }

    return catsByColor;
}


function renderCat(cat) {
    let div = document.createElement("div");
    div.classList.add("cat");
    div.id = cat.id;

    div.innerHTML = `
        <div>${cat.name}</div>
        <div>${cat.breed}</div>
        <div>${cat.age}</div>
        <div>${cat.color}</div>
        <button type="button">Remove</button>
    `;

    return div;
}


function renderCats(cats) {
    let catsElement = document.getElementById("cats");
    catsElement.innerHTML = "";

    for (let cat of cats) {
        let catElement = renderCat(cat);
        catsElement.appendChild(catElement);
    }

    setRemoveCatHandlers();
}

function onAddCatSubmit(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let breed = document.getElementById("breed").value;
    let age = Number(document.getElementById("age").value);
    let color = document.getElementById("color").value;

    let cat = createNewCat(name, breed, age, color);

    cat.id = database[database.length - 1].id + 1;

    addCatToDatabase(database, cat)
    renderCats(database);

    let form = document.getElementById("add-cat-form");
    form.reset();
}

function setAddCatHandler() {
    let form = document.getElementById("add-car-form");
    form.addEventListener("submit", onAddCatSubmit);
}

function onRemoveCatClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    removeCatById(database, id);
    renderCats(database);
}

function setRemoveCatHandlers() {
    let buttons = document.querySelectorAll(".cat button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveCatClick);
    }
}

function onFilterByBreedSubmit(event) {
    event.preventDefault();
    let breed = document.getElementById("filter-breed").value;
    let cats = getCatsByBreed(database, breed);
    renderCats(cats);
}

function onFilterByAgeSubmit(event) {
    event.preventDefault();
    let age = document.getElementById("filter-age").value;
    let cats = getCatsByAge(database, age);
    renderCats(cats);
}

function onFilterByColorSubmit(event) {
    event.preventDefault();
    let color = document.getElementById("filter-color").value;
    let cats = getCatsByColor(database, color);
    renderCats(cats);
}

function onShowAllClick() {
    document.getElementById("filter-breed").value = "";
    document.getElementById("filter-age").value = "";
    document.getElementById("filter-color").value = "";
    renderCats(database);
}

function setFilterCatHandlers() {
    let breedForm = document.getElementById("filter-by-breed");
    let ageForm = document.getElementById("filter-by-age");
    let colorForm = document.getElementById("filter-by-color");
    let showAll = document.getElementById("show-all");

    breedForm.addEventListener("submit", onFilterByBreedSubmit);
    ageForm.addEventListener("submit", onFilterByAgeSubmit);
    colorForm.addEventListener("submit", onFilterByAgeSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

renderCats(database);
setAddCatHandler();
setFilterCatHandlers();