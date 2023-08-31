document.getElementById("myButton").addEventListener("click", function(){
    const inputText = document.getElementById("input");
    const text = inputText.value;
    const container = document.getElementById("container");
    
    if (text !== "") {
        const div = document.createElement("div");
        div.className = "seed";

        const paragraph = document.createElement("p");
        paragraph.id = "p1";
        paragraph.innerHTML = text;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "";

        const trash = document.createElement("i");
        trash.className = "fa-solid fa-trash fa-1x";
        deleteButton.addEventListener("click", function(){
            div.remove();
            saveCoordinates();
        });

        const kolor = document.createElement("input");
        kolor.type = "color";
        kolor.className = "kolor";

        div.appendChild(kolor);
        deleteButton.appendChild(trash);
        div.appendChild(paragraph);
        div.appendChild(deleteButton);
        container.appendChild(div);
        saveCoordinates();
        inputText.value = "";
    } else {
        alert("Please enter your Minecraft coordinates");
    }
});

// Przeniesiono funkcję nasłuchującą input poza funkcję tworzenia elementu "seed"
function setupColorListeners() {
    var kolorInputs = document.querySelectorAll(".kolor");
    kolorInputs.forEach(function(kolorInput) {
        var paragraph = kolorInput.parentNode.querySelector("p");
        
        kolorInput.addEventListener("input", function() {
            paragraph.style.color = kolorInput.value;
            saveCoordinates();
        });
    });
}

function saveCoordinates() {
    var cords = document.getElementById("container").innerHTML;
    localStorage.setItem("cords", cords);
}

function loadcords() {
    var savedcords = localStorage.getItem("cords");
    if (savedcords) {
        document.getElementById("container").innerHTML = savedcords;
        attachEventListeners();
        setupColorListeners(); // Dodajemy wywołanie funkcji nasłuchującej
    }
}

function attachEventListeners() {
    var items = document.querySelectorAll(".seed");
    items.forEach(function(item) {
        var deleteButton = item.querySelector("button");
        deleteButton.onclick = function () {
            item.remove();
            saveCoordinates();
        }
    });
}

loadcords();