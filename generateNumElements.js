document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('numbers');

    const actions = {
        "1": function() {
            console.log("Pressed '1'");
        },
        "2": function() {
            console.log("Pressed '2'");
        },
        "3": function() {
            console.log("Pressed '3'");
        },
        "4": function() {
            console.log("Pressed '4'");
        },
        "5": function() {
            console.log("Pressed '5'");
        },
        "6": function() {
            console.log("Pressed '6'");
        },
        "7": function() {
            console.log("Pressed '7'");
        },
        "8": function() {
            console.log("Pressed '8'");
        },
        "9": function() {
            console.log("Pressed '9'");
        },
        "0": function() {
            console.log("Pressed '0'");
        }
    };

    for (let i = 1; i <= 10; i++) {
        // const elementHTML = `
        //
        //     <button id="number${i}" class="element outlined-text">
        //     ${i !==10 ? i : 0}
        //     </button>
        // `;
        // container.innerHTML += elementHTML;

        const sign = i !== 10 ? i : 0;

        const button = document.createElement("button");
        button.className = "element outlined-text";
        button.textContent = sign;

        button.addEventListener("click", actions[sign]);

        container.appendChild(button);
    }


});