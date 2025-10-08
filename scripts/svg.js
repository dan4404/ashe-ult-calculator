// SVG box + drag and drop circles

let dX = 0, dY = 0, startX = 0, startY = 0;

const ashe = document.getElementById("asheimg");
const enemy = document.getElementById("enemyimg");
const svg = document.getElementById("board");
const line = document.getElementById("link");
const viewbox = {w: 600, h: 386};
let unit = null;

ashe.onpointerdown = mouseDown
ashe.onpointerup = mouseUp
enemy.onpointerdown = mouseDown
enemy.onpointerup = mouseUp

function mouseDown (e) {
    unit = e.target
    unit.onpointermove = mouseMove;
    unit.setPointerCapture(e.pointerId)
    e.preventDefault();
}

function mouseMove(e) {
    if (unit === null) return;
    const pt = svgPoint(e);
    const x = bound(pt.x, viewbox.w) - Number(unit.getAttribute("width")) / 2
    const y = bound(pt.y, viewbox.h)- Number(unit.getAttribute("height")) / 2
    unit.setAttribute("x", x);
    unit.setAttribute("y", y);
    lineUpdate();
}

function mouseUp(e) {
    unit.releasePointerCapture(e.pointerId);
    unit = null;
}

// Converts mouse coordinates from clientX and Y to svg coordinates
function svgPoint(evt) {
    const pt = svg.createSVGPoint();
    pt.x = (evt.touches ? evt.touches[0].clientX : evt.clientX);
    pt.y = (evt.touches ? evt.touches[0].clientY : evt.clientY);
    const m = svg.getScreenCTM().inverse();
    return pt.matrixTransform(m);
}

function lineUpdate() {
    const asheX = Number(ashe.getAttribute("x"));
    const asheY = Number(ashe.getAttribute("y"));
    const enemyX = Number(enemy.getAttribute("x"))
    const enemyY = Number(enemy.getAttribute("y"))
    // add offset to center the line in the circle
    line.setAttribute("x1", asheX + Number(ashe.getAttribute("width")) / 2);
    line.setAttribute("y1", asheY +  Number(ashe.getAttribute("height")) / 2);
    line.setAttribute("x2", enemyX + Number(enemy.getAttribute("width")) / 2);
    line.setAttribute("y2", enemyY +  Number(enemy.getAttribute("height")) / 2);

    // update the time display
    // ratio of SVG units to LoL map units 1:10 .. it is an approximation
    const units = Math.sqrt(Math.pow(asheX - enemyX, 2) + Math.pow(asheY - enemyY, 2)) * 10
    time.innerHTML = calcStun(units);
    // update the input box 
    dist.value = units.toFixed(2);
}

function calcStun(distance) {
    distance = Math.max(distance, 0);
    distance = Math.min(distance, 2800);
    return Math.min((1 + ((distance / 200) * 0.18)), 3.50).toFixed(2);
}

function bound(pos, max) {
    return Math.max(0, Math.min(pos, max))
}