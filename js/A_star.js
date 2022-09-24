import {Grid} from './Grid.js'

var grid 

var openSet = [] //cells that are not checked
var closedSet = [] //checked cells
var path = [] // the shortest path

var rows
var cols

var start
var end

var interval

function createGrid(gridEl, r, c, startXY) {
    grid = new Grid(c, r, gridEl).grid
    rows = r
    cols = c
}


function setStartEnd(startXY, endXY) {
    
    start = grid[startXY[1]][startXY[0]]
    end = grid[endXY[1]][endXY[0]]
    
    start.wall = false
    end.wall = false

    start.remClass("unvisited")
    start.addClass("start")
    
    end.remClass("unvisited")
    end.addClass("end")
    
    openSet.push(start)
}

interval = setInterval(A_star, 10)

function A_star() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = grid[i][j]

            if (cell.wall) {
                cell.addClass("wall")
                cell.remClass("unvisited")
            }
        }
    }
    if (openSet.length > 0) {
        //find the node in openSet with the smallest f value 
        let winner = 0
        for(let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[i].f) {
                winner = i
            }
        }
        var current = openSet[winner]


        if (current === end) {
            //done; make a path
            let temp = current
            path.push(temp)


            while (temp.cameFrom) {
                path.push(temp.cameFrom)
                temp = temp.cameFrom
            }

            clearInterval(interval)
        }

        //remove current from openSet and add it to closedSet
        openSet.splice(winner, 1)
        closedSet.push(current)

        //loop through every neighbor of current
        current.neighbors.forEach(neighbor => {
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG
                    }
                }
                else {
                    neighbor.g = tempG
                    
                    openSet.push(neighbor)
                }

                neighbor.cameFrom = current
                neighbor.h = heuristic(neighbor, end)
                neighbor.f = neighbor.g + neighbor.h

            }
        })
    }
    else {
        console.log("no solution")

        clearInterval(interval)
    }

    //for every cell that is in closedSet, assign it the visited class
    closedSet.forEach(entry => {
        entry.remClass("unvisited")
        entry.addClass("visited")
    })

    //for every cell in path, assign it the path class
    path.forEach(entry => {
        entry.remClass("unvisited")
        entry.remClass("visited")
        entry.addClass("path")
    })
}

function heuristic(a, b) {
    //in this case:
    //  i - x value
    //  j - y value

    // var d = Math.sqrt((b.i - a.i)**2 + (b.j - a.j)**2)

    var d = Math.abs(b.i - a.j) + Math.abs(b.j - a.j)

    return d
}

export {createGrid, setStartEnd}