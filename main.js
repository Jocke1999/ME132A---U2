"use strict";
//Skapar först ett katt objekt och sedan returnerar den
function createNewCat(name, breed, age, color) {
    let cat = {
        name: name,
        breed: breed,
        age: age,
        color: color,
    };

    return cat;
}

//lägger till en katt till min databas
function addCatToDatabase(database, cat) {
    database.push(cat);
}

// tar bort katt utifrån sitt id från databasen
function removeCatById(cats, id) {
    for (let i = 0; i < cats.length; i++) {
        let cat = cats[i];
        if (cat.id == id) {
            cats.splice(i, 1);
            return;
        }
    }
}

function getCatsByName(cats, name) {
    let catsByName = [];

    for (let cat of cats) {
        if (cat.name.toLowerCase() == name.toLowerCase()) {
            catsByName.push(cat);
        }
    }

    return catsByName;
}

// returnerar alla raser 
function getCatsByBreed(cats, breed) {
    let catsByBreed = [];

    for (let cat of cats) {
        if (cat.breed.toLowerCase() == breed.toLowerCase()) {
            catsByBreed.push(cat);
        }
    }

    return catsByBreed;
}

// returnerar alla åldrar 
function getCatsByAge(cats, age) {
    let catsByAge = [];

    for (let cat of cats) {
        if (cat.age == age) {
            catsByAge.push(cat);
        }
    }

    return catsByAge;
}


// räknar ut den ungefärliga åldern på katterna
function getAverageCatAge(cats) {
    let sumOfAges = 0;


    for (let cat of cats) {
        sumOfAges = sumOfAges + cat.age;
    }


    return Math.round(sumOfAges / cats.length);
}
// returnerar alla färger
function getCatsByColor(cats, color) {
    let catsByColor = [];

    for (let cat of cats) {
        if (cat.color.toLowerCase() == color.toLowerCase()) {
            catsByColor.push(cat);
        }
    }

    return catsByColor;
}

// framställer katterna i ett HTML element
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

    setRemoveCat();
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

function setAddCat() {
    let form = document.getElementById("add-cat-form");
    form.addEventListener("submit", onAddCatSubmit);
}

function onRemoveCatClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    removeCatById(database, id);
    renderCats(database);
}

function setRemoveCat() {
    let buttons = document.querySelectorAll(".cat button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveCatClick);
    }
}

function onFilterByNameSubmit(event) {
    event.preventDefault();
    let name = document.getElementById("filter-name").value;
    let cats = getCatsByName(database, name);
    renderCats(cats);
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
    document.getElementById("filter-name").value = "";
    document.getElementById("filter-breed").value = "";
    document.getElementById("filter-age").value = "";
    document.getElementById("filter-color").value = "";
    renderCats(database);
}

function setFilterCat() {
    let nameForm = document.getElementById("filter-by-name");
    let breedForm = document.getElementById("filter-by-breed");
    let ageForm = document.getElementById("filter-by-age");
    let colorForm = document.getElementById("filter-by-color");
    let showAll = document.getElementById("show-all");

    nameForm.addEventListener("submit", onFilterByNameSubmit);
    breedForm.addEventListener("submit", onFilterByBreedSubmit);
    ageForm.addEventListener("submit", onFilterByAgeSubmit);
    colorForm.addEventListener("submit", onFilterByAgeSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

renderCats(database);
setAddCat();
setFilterCat();