document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('numbers');

    for (let i = 1; i <= 10; i++) {
        const sign = i !== 10 ? i : 0;

        const button = document.createElement("button");
        button.className = "element outlined-text";
        button.textContent = sign;

        button.addEventListener("click", function () {
            //TODO remove Event, add just function
            myEvent(sign);
        });

        container.appendChild(button);
    }
});