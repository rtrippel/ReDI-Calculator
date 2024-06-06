document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('operators');
    const display = document.getElementById("display");

    let sign = "";


    function clean() {
        display.value = "";
        window.dispatchEvent(myEvent("clean"))
    }

    const actions = {
        "+": function() {
            window.dispatchEvent(myEvent("+"));
        },
        "-": function() {
            window.dispatchEvent(myEvent("-"));
        },
        "*": function() {
            window.dispatchEvent(myEvent("*"));
        },
        "/": function() {
            window.dispatchEvent(myEvent("/"));
        },
        "C": function() {
            clean();
        },
        "=": function() {
            console.log("Pressed '='");
            window.dispatchEvent(myEvent("test"));
        }
    };


    for (let i = 1; i <= 6; i++) {
        switch (i) {
            case 1:
                sign = "+";
                break;
            case 2:
                sign = "-"
                break;
            case 3:
                sign = "*"
                break;
            case 4:
                sign = "/"
                break;
            case 5:
                sign = "C"
                break;
            case 6:
                sign = "=";
                break;

        }

        // const elementHTML = `
        //     <button id="operator${i}"  class="element outlined-text" style="background: var(--color${i})">
        //         ${sign}
        //     </button>
        // `;
        // container.innerHTML += elementHTML;

        const button = document.createElement("button");
        button.className = "element outlined-text";
        button.style.background = `var(--color${i})`;
        button.textContent = sign;

        button.addEventListener("click", actions[sign]);

        container.appendChild(button);
    }

    function myEvent(message) {
        return new CustomEvent("myCustomEvent", { detail: { input: message } });
    }
});