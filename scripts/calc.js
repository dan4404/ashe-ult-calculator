const dist = document.getElementById("distance-input");
const distForm = document.getElementById("distance-form");
const time = document.getElementById("time");

distForm.addEventListener("submit", handle);
console.log("hello")

function handle(e) {
    e.preventDefault();
    const data = new FormData(distForm);
    const val = Number(data.get("distance")); 
    if (isNaN(val)) {
        return;
    }
    time.innerHTML = calcStun(val);
}

function calcStun(distance) {
    distance = Math.max(distance, 0);
    distance = Math.min(distance, 2800);
    return Math.min((1 + ((distance / 200) * 0.18)), 3.50).toFixed(2);

}