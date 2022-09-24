export class Cell {
    constructor(element, i, j) {
        this.element = element;

        this.i = i
        this.j = j

        this.f = 0
        this.g = 0
        this.h = 0

        this.neighbors = null
        this.cameFrom = null

        this.wall = false

        if (Math.random() < 0.15) {
            this.wall = true
        }

    }

    addClass(name) {
        this.element.classList.add(name)
    }

    remClass(name) {
        this.element.classList.remove(name)
    }
}