let total = [];

window.addEventListener("myCustomEvent", function(event) {
    console.log(event.detail.input);
    if (event.detail.input === "clean") {
        total = [];
    } else {
        total.push(event.detail.input);
    }
    console.log(total);
});