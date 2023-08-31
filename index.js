document.getElementById("addButton").addEventListener("click", function(){
    const inputText = document.getElementById("input");
    const text = inputText.value;
    const container = document.getElementById("container");

    // Wykonywanie funkcji po kolei
    setTimeout(function() {
        attachEventListeners();
        setupColorListeners();
        saveCoordinates();
    }, 0);
    
    inputText.value = ""
    
    if (text !== "") {
        const div = document.createElement("div");
        div.className = "seed";
        const seedId = Date.now().toString(); // Id do każdego elementu
        div.id = seedId;

        const paragraph = document.createElement("p");
        paragraph.id = "p1";
        paragraph.innerHTML = text;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "";

        const trash = document.createElement("i"); 
        trash.className = "fa-solid fa-trash fa-1x";
        deleteButton.addEventListener("click", function(){ // Usunięcie elementu po kliknięciu ikony kosza
            div.remove();
            saveCoordinates();
        });

        const color = document.createElement("input");
        color.type = "color";
        color.className = "color";
        color.value = "#000000";

        // Ułożenie elementów dodanego punktu w kolejności
        div.appendChild(color);
        deleteButton.appendChild(trash);
        div.appendChild(paragraph);
        div.appendChild(deleteButton);
        container.appendChild(div);
        saveCoordinates();
        inputText.value = "";
    } else {
        alert("Please enter your Minecraft coordinates");
        // Wyświetlenie alertu, jeśli pole jest puste
    }
});

// Przeniesiono funkcję nasłuchującą input poza funkcję tworzenia elementu "seed"
function setupColorListeners() {
    var colorInputs = document.querySelectorAll(".color");
    colorInputs.forEach(function(colorInput) {
        colorInput.addEventListener("input", function() {
            var paragraph = colorInput.nextElementSibling;
            paragraph.style.color = colorInput.value;
            saveColor(colorInput); // Zapisywanie koloru do localStorage
            saveCoordinates();
        });
    });
}

function saveCoordinates() {
    var cords = document.getElementById("container").innerHTML;
    localStorage.setItem("cords", cords);
    // Zapisywanie do localStorage
}

function loadcords() {
    var savedcords = localStorage.getItem("cords");
    if (savedcords) {
        document.getElementById("container").innerHTML = savedcords;
        attachEventListeners();
        setupColorListeners(); // Dodajemy wywołanie funkcji nasłuchującej
    }
}

function saveColor(colorInput) {
    var seedItem = colorInput.closest(".seed");
    var seedId = seedItem.id;
    var colorValue = colorInput.value;
    localStorage.setItem("color-" + seedId, colorValue);
}



function attachEventListeners() {
    var items = document.querySelectorAll(".seed");
    items.forEach(function(item) {
        var deleteButton = item.querySelector("button");
        deleteButton.onclick = function () {
            item.remove();
            saveCoordinates();
            // Wywołanie funkcji zapisującej po usunięciu elementu
        }
        
        // Podłączenie funkcji nasłuchującej do każdego elementu
        var colorInput = item.querySelector(".color");
        colorInput.addEventListener("input", function() {
            var paragraph = colorInput.nextElementSibling;
            paragraph.style.color = colorInput.value;
            saveCoordinates();
        });

        var savedColor = localStorage.getItem("color-" + item.id);
        if (savedColor) {
            colorInput.value = savedColor;
            var paragraph = colorInput.nextElementSibling;
            paragraph.style.color = savedColor;
        }
    });
}

loadcords();