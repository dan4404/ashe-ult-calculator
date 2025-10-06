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
    line.setAttribute("x1", Number(ashe.getAttribute("x")) + Number(ashe.getAttribute("width")) / 2);
    line.setAttribute("y1", Number(ashe.getAttribute("y")) +  Number(ashe.getAttribute("height")) / 2);
    line.setAttribute("x2", Number(enemy.getAttribute("x")) + Number(enemy.getAttribute("width")) / 2);
    line.setAttribute("y2", Number(enemy.getAttribute("y")) +  Number(enemy.getAttribute("height")) / 2);
}

function bound(pos, max) {
    return Math.max(0, Math.min(pos, max))
}