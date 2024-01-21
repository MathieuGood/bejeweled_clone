let jewels = ['🧡', '💛', '💚', '💙', '💜', '🖤', '❤️']
let gb = buildGameGrid(jewels, 8)


let exampleGameGrid = [
    ['❤️', '💚', '💙', '🧡', '🧡', '🧡', '🧡', '💜'],
    ['💙', '🖤', '💙', '🖤', '💛', '🖤', '💜', '🖤'],
    ['🖤', '❤️', '💙', '💙', '💚', '🖤', '❤️', '💙'],
    ['💜', '💜', '💜', '🖤', '🧡', '💛', '💚', '🖤'],
    ['💚', '🖤', '💜', '💜', '🧡', '💚', '💜', '💙'],
    ['🧡', '❤️', '💜', '🖤', '💜', '❤️', '❤️', '❤️'],
    ['🧡', '🖤', '💛', '🖤', '💛', '💙', '🧡', '🖤'],
    ['💛', '🖤', '💛', '💚', '💚', '💚', '🖤', '💜']
]



let foundMatches = checkGameGridForAlignments(exampleGameGrid)

// switchTwoItemsOnGrid(exampleGameGrid, [-1, 1], [0, 2])

// let result = checkAdjacentCellsForSimilarItem(exampleGameGrid, 5, 6)
// console.log(result)

removeMatchesFromGrid(exampleGameGrid, foundMatches)



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
        checkForMatchesOneWay(gameGrid, 'col', i, allMatches)
    }
    console.log('Matches found :')
    console.log(allMatches)
    return allMatches

}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Check for matches one way (x or y axis)
//
// direction parameter : 'row' or 'col'
// i : counter of the loop the function is inserted  in
// allMatches : array to return all results in
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function checkForMatchesOneWay(gameGrid, direction, i, allMatches) {

    // previousItem records what item was before current entry
    let previousItem = ''

    // count records the number of matching items 
    let count = 1

    // matches records the coordinates of matching items
    let matches = []

    // Loop through rows/columns of gameGrid
    for (let j = 0; j < gameGrid.length; j++) {

        // value of the item
        let value = ''

        // y/x coordinates of previous item
        let previousCoordinates = ''

        // y/x coordinates of current item
        let currentCoordinates = ''

        // Set coordinates accordingly for the result regarding the direction chosen
        if (direction == 'row') {
            value = gameGrid[i][j]
            previousCoordinates = [i, j - 1]
            currentCoordinates = [i, j]
        } else {
            value = gameGrid[j][i]
            previousCoordinates = [j - 1, i]
            currentCoordinates = [j, i]
        }

        // If it is the first occurence of the list, initalize previousItem to current value
        if (previousItem === '') {
            previousItem = value

        } else {
            // For all other items
            // Check if current value matches previous item
            if (value === previousItem) {
                // In case of a match, add the coordinates of the previous (first) item of the row/column to match array
                if (count === 1) {
                    matches.push(previousCoordinates)
                }
                // Add the coordinates of current item to match array
                matches.push(currentCoordinates)
                // Increase match count 
                count++

            } else {
                // If the value does not match and if count is at least 3, record matches to allMatches array
                if (count > 2) {
                    allMatches.push(matches)
                    matches = []
                    count = 1
                }

                // Set previousItem to current value before next iteration
                previousItem = value
            }
        }
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Switch two items (coordinatesItem1, coordinatesItem2) on the grid
// Returns the updated gameGrid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

// function switchTwoItemsOnGrid(gameGrid, gridSize, [coordinatesItem1], coordinatesItem2) {

//     // Check if the coordinates are not out of the grid
//     const validCoordinates = (coord) => coord[0] >= 0 && coord[0] < gridSize && coord[1] >= 0 && coord[1] < gridSize

//     if (validCoordinates(coordinatesItem1) && validCoordinates(coordinatesItem2)) {
//         // Switch values between two items
//         const tempCoordinates = gameGrid[coordinatesItem1[0]][coordinatesItem1[1]]
//         gameGrid[coordinatesItem1[0]][coordinatesItem1[1]] = gameGrid[coordinatesItem2[0]][coordinatesItem2[1]]
//         gameGrid[coordinatesItem2[0]][coordinatesItem2[1]] = tempCoordinates
//         console.log(gameGrid)
//         // Return the updated gameGrid after switch
//         return gameGrid
//     } else {
//         // Return false if move is out of the grid
//         console.log(`! Out of the grid move : cannot switch ${coordinatesItem1} with ${coordinatesItem2}`)
//         return false
//     }
// }


function switchTwoItemsOnGrid(gameGrid, [y1, x1], [y2, x2]) {
    // Check if the coordinates are within the grid bounds
    const gridSize = gameGrid[0].length
    const isValidCoordinate = (coord) => coord[0] >= 0 && coord[0] < gridSize && coord[1] >= 0 && coord[1] < gridSize;

    if (isValidCoordinate([y1, x1]) && isValidCoordinate([y2, x2])) {
        // Switch values between two items
        const temp = gameGrid[y1][x1];
        gameGrid[y1][x1] = gameGrid[y2][x2];
        gameGrid[y2][x2] = temp;
        console.log(gameGrid);
        // Return the updated gameGrid after switch
        return gameGrid;
    } else {
        // Return false if move is out of the grid
        console.log(`! Out of the grid move: cannot switch [${y1}, ${x1}] with [${y2}, ${x2}]`);
        return false;
    }
}


function removeMatchesFromGrid(gameGrid, allMatches) {
    allMatches.forEach((match) => match.forEach((cell) => gameGrid[cell[0]][cell[1]] = ''))
}

