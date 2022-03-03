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
// returnerar alla namn
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

// framställer katterna(objekt) i ett HTML element
function renderCat(cat) {
    let div = document.createElement("div");
    div.classList.add("cat");
    div.id = cat.id;

    div.innerHTML = `
        <li>${cat.name}</li>
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
    //man sätter HTML elementens värde i en variabel
    let name = document.getElementById("name").value;
    let breed = document.getElementById("breed").value;
    let age = Number(document.getElementById("age").value);
    let color = document.getElementById("color").value;

    //skapar en "alert" som visar användaren att man måste fylla i alla rutor först
    if (name == "") {
        return alert("Please fill in all the boxes")
    } else if (breed == "") {
        return alert("Please fill in all the boxes")
    }
    else if (age == "") {
        return alert("Please fill in all the boxes")
    }
    else if (color == "") {
        return alert("Please fill in all the boxes")
    }

    else if (confirm("Are you sure?") == true) {

        let cat = createNewCat(name, breed, age, color);

        cat.id = database[database.length - 1].id + 1;
        //lägger till i databasen
        addCatToDatabase(database, cat)
        renderCats(database);

        let form = document.getElementById("add-cat-form");
        form.reset();
    }
}

function setAddCat() {
    let form = document.getElementById("add-cat-form");
    form.addEventListener("submit", onAddCatSubmit);
}

//När man klickar på "remove" ska det försvinna en katt från databasen under "id'et "cat"."
function onRemoveCatClick(event) {
    let button = event.target;
    let id = button.parentElement.id;

    let result = confirm('Are you sure you want to delete?');

    if (result == true) {
        removeCatById(database, id);
    }
    else {
        return false;
    }
    renderCats(database);

    alert(message);
}

function setRemoveCat() {
    let buttons = document.querySelectorAll(".cat button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveCatClick);
    }
}

//Detta filterar de olika "age, breed, name, color och det sammanställande(showallclick)
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

//när man matar in värdena i "filter" och submitar och clickar på de
function setFilterCat() {
    let nameForm = document.getElementById("filter-by-name");
    let breedForm = document.getElementById("filter-by-breed");
    let ageForm = document.getElementById("filter-by-age");
    let colorForm = document.getElementById("filter-by-color");
    let showAll = document.getElementById("show-all");

    nameForm.addEventListener("submit", onFilterByNameSubmit);
    breedForm.addEventListener("submit", onFilterByBreedSubmit);
    ageForm.addEventListener("submit", onFilterByAgeSubmit);
    colorForm.addEventListener("submit", onFilterByColorSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

//Direkt kod, konstant kod
renderCats(database);
setAddCat();
setFilterCat();