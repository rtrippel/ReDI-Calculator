document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('operators');
    let sign = [".", "%", "back", "+", "-", "*", "/", "Esc", "="];

    for (let i = 0; i < 9; i++) {
        const isBackspaceButton = i === 2;

        const button = document.createElement("button");
        button.className = "element outlined-text";
        button.style.background = `var(--color${(i % 6) + 1})`;
        isBackspaceButton ?
            button.innerHTML = `<i class="fas fa-backspace"></i>&nbsp<p>back</p>`
            : button.textContent = sign[i];

        button.addEventListener("click", function () {
            myEvent(sign[i]);
        });

        container.appendChild(button);
    }
});