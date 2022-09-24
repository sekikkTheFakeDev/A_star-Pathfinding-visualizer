import { createGrid, setStartEnd } from "./A_star.js"

const gridEl = document.querySelector(".grid")
const cols = Math.round(35 * 0.72)
const rows = Math.round(20 * 0.72)

createGrid(gridEl, rows, cols, [3,6])
setStartEnd([0, 0], [cols-1, rows-1])
