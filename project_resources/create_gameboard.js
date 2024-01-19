let jewels = ['🧡', '💛', '💚', '💙', '💜', '🖤', '❤️']
let gb = buildGameGrid(jewels, 8)


exampleGameGrid = [
    ['❤️', '💚', '💙', '🧡', '🧡', '🧡', '🧡', '💜'],
    ['💙', '🖤', '💙', '🖤', '💛', '🖤', '💜', '🖤'],
    ['🖤', '❤️', '💙', '💙', '💚', '🖤', '❤️', '💙'],
    ['💜', '💜', '💜', '🖤', '🧡', '💛', '💚', '🖤'],
    ['💚', '🖤', '💜', '💜', '🧡', '💚', '💜', '💙'],
    ['🧡', '❤️', '💜', '🖤', '💜', '❤️', '❤️', '❤️'],
    ['🧡', '🖤', '💛', '🖤', '💛', '💙', '🧡', '🖤'],
    ['💛', '🖤', '💛', '💚', '💚', '💚', '🖤', '💜']
]


// let result = checkAdjacentCellsForSimilarItem(exampleGameGrid, 5, 6)
// console.log(result)


////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Based on a gameGrid array and the y, x coordinates of one cell,
// check if there are similar items in any of the adjacent cells
// and return their coordinates in an array
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function checkAdjacentCellsForSimilarItem(gameGrid, y, x) {

    matchingItems = []

    // y = horizontal position of current item
    // x = vertical position of current item

    let currentItem = gameGrid[y][x]
    let gameGridSize = gameGrid.length

    console.log('Current item : ' + currentItem)
    console.log('Current item coordinates : ' + 'y = ' + y + '  x = ' + x)

    // adjacentCellsCoordinatesOffset array contains the offset values of y and x to find adjacent cells
    adjacentCellsCoordinatesOffset = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ]

    // Loop through the coordinates of adjacent cells
    for (let adjacentCellOffset of adjacentCellsCoordinatesOffset) {

        let verticalCoordinates = y + adjacentCellOffset[0]
        let horizontalCoordinates = x + adjacentCellOffset[1]

        // For debug
        // console.log('Checking adjacent cell : ' + 'y = ' + verticalCoordinates + '  x = ' + horizontalCoordinates)

        // Check if calculated coordinates exist (not out of the game board)
        if (
            (verticalCoordinates >= 0 && verticalCoordinates < gameGridSize) &&
            (horizontalCoordinates >= 0 && horizontalCoordinates < gameGridSize)
        ) {
            console.log('Checking if gameGrid [' + verticalCoordinates + ', ' + horizontalCoordinates + '] = ' + currentItem)
            // Check if the item in the adjacent cell is the same as in the current cell (currentItem)
            // If it is the case, add the coordinates of the matching item in the matchingItems array
            if (gameGrid[verticalCoordinates][horizontalCoordinates] == currentItem) {
                matchingItems.push([verticalCoordinates, horizontalCoordinates])
            }
        }
    }
    return matchingItems
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Build the game board of given size as a multidimensional array
// and populate it with random integers between 0 and numberOfDifferentValues
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function buildGameGrid(size, numberOfDifferentValues) {
    let gameGrid = []

    for (let i = 0; i < size; i++) {
        let row = []
        for (let j = 0; j < size; j++) {
            const randomInteger = Math.floor(Math.random() * numberOfDifferentValues)
            row.push(randomInteger)
        }
        gameGrid.push(row)
    }
    return gameGrid
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Build the game board of given size as a multidimensional array
// and populate it with random elements of the items array
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function buildGameGridWithItems(items, size) {
    let gameGrid = []

    for (let i = 0; i < size; i++) {
        let row = []
        for (let j = 0; j < size; j++) {
            row.push(getRandomItemFromArray(items))
        }
        gameGrid.push(row)
    }
    return gameGrid
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Get random item from a given array
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function getRandomItemFromArray(array) {
    let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Check if there are any alignments of matching items on the game grid
// Return an array for each alignement with coordinates of each matching cell
//
////////////////////////////////////////////////////////////////////////////////////////////////////


function checkGameGridForAlignments(gameGrid) {

    let allMatches = []

    for (let i = 0; i < gameGrid.length; i++) {

        checkForMatchesOneWay(gameGrid, 'row', i, allMatches)
        checkForMatchesOneWay(gameGrid, 'col',i, allMatches)
    }

    console.log(allMatches)
    return allMatches

}


function checkForMatchesOneWay(gameGrid, direction, i, allMatches) {

    let rowPreviousItem = ''
    let rowCount = 1
    let matches = []

    for (let j = 0; j < gameGrid.length; j++) {

        let value = ''
        let previousCoordinates = ''
        let currentCoordinates = ''

        if (direction == 'row') {
            value = gameGrid[i][j]
            previousCoordinates = [i, j - 1]
            currentCoordinates = [i, j]
        } else {
            value = gameGrid[j][i]
            previousCoordinates = [j - 1, i]
            currentCoordinates = [j, i]
        }


        if (rowPreviousItem === '') {

            rowPreviousItem = value

        } else {

            if (value === rowPreviousItem) {

                if (rowCount === 1) {
                    matches.push(previousCoordinates)
                }
                matches.push(currentCoordinates)
                rowCount++

            } else {
                if (rowCount > 2) {
                    allMatches.push(matches)
                    matches = []
                    rowCount = 1
                }
                rowPreviousItem = value
            }
        }

    }
}




checkGameGridForAlignments(exampleGameGrid)