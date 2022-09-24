import {Cell} from "./Cell.js"

export class Grid {
    constructor(cols, rows, element) {
        this.element = element
        this.cols = cols
        this.rows = rows
        this.grid = this.createGrid()
    }

    createGrid() {
        this.createRowsCols()

        var grid = new Array(this.rows)

        for (let i = 0; i < this.rows; i++) {
            grid[i] = new Array(this.cols)
        }

        this.populateGrid(grid)
        return grid
    }

    createRowsCols() {
        this.element.style.gridTemplateColumns = `repeat(${this.cols}, ${100 / this.cols}vmin)`
        this.element.style.gridTemplateRows = `repeat(${this.rows}, ${100 / this.cols}vmin)`
    }

    populateGrid(grid) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let elem = document.createElement("div")
                elem.classList.add("cell")
                elem.classList.add("unvisited")
                elem.style.setProperty("--i", j) 
                elem.style.setProperty("--j", i) 
                this.element.appendChild(elem)
        
                //i - row number / y coordinate
                //j - col number / x coordinate
                grid[i][j] = new Cell(elem, j , i)
            }
        }
        this.getNeighbors(grid)
    }

    getNeighbors(grid) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let neighbors = []

                //i - row number / y coordinate
                //j - col number / x coordinate



                //right
                if (j + 1 < this.cols) {
                    neighbors.push(grid[i][j+1])
                }

                //bottom 
                if (i + 1 < this.rows) {
                    neighbors.push(grid[i+1][j])
                }

                //left 
                if (j > 0) {
                    neighbors.push(grid[i][j-1])
                }

                //top 
                if (i > 0) {
                    neighbors.push(grid[i-1][j])
                }

                //diagonals aren't added because they act weird 

                // if (i > 0 && j > 0) {
                //     neighbors.push(grid[i-1][j-1])
                // }

                // if (i + 1 < this.rows && j > 0 ) {
                //     neighbors.push(grid[i+1][j-1])
                // }

                // if (i > 0 && j + 1 < this.cols) {
                //     neighbors.push(grid[i-1][j+1])
                // }

                // if (i + 1 > this.rows && j + 1 < this.cols) {
                //     neighbors.push(grid[i+1][j+1])
                // }

                grid[i][j].neighbors = neighbors

            }
        }  
    }
}