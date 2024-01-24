let = examplegameGrid = [
    [7, 7, 7, 6, 0, 0, 3, 4],
    [1, 6, 1, 7, 2, 0, 2, 5],
    [1, 6, 2, 3, 6, 4, 2, 5],
    [2, 0, 7, 5, 7, 4, 0, 5],
    [1, 3, 1, 7, 1, 5, 5, 5],
    [0, 7, 5, 0, 0, 4, 2, 2],
    [3, 3, 3, 1, 4, 0, 7, 2],
    [6, 7, 2, 1, 2, 0, 7, 2]
]

let = grid2 = [
    [7, 2, 2, 1, 7, 4, 3, 0],
    [6, 7, 1, 6, 0, 2, 3, 6],
    [1, 6, 1, 7, 2, 4, 2, 4],
    [1, 6, 2, 3, 6, 0, 2, 1],
    [2, 0, 7, 5, 7, 6, 0, 0],
    [1, 3, 1, 7, 1, 0, 2, 4],
    [0, 7, 5, 1, 4, 3, 7, 3],
    [6, 7, 2, 1, 2, 4, 7, 4]

]

let exampleGameGrid3 = [
    [6, 7, 7, 2, 0, 0, 3, 4],
    [1, 6, 1, 7, 2, 0, 2, 5],
    [1, 6, 2, 3, 6, 4, 2, 5],
    [2, 0, 7, 5, 7, 4, 0, 5],
    [1, 3, 1, 7, 1, 5, 5, 5],
    [0, 7, 5, 0, 0, 4, 2, 2],
    [3, 3, 3, 1, 4, 0, 7, 2],
    [6, 7, 2, 1, 2, 0, 7, 2]
]


let examplegameGridHearts = [
    ['💙', '🧡', '💛', '💚', '🖤', '🧡', '💛', '💛'],
    ['💛', '💖', '💜', '🧡', '💖', '🧡', '🧡', '💜'],
    ['🖤', '💚', '💜', '💖', '💖', '💖', '💖', '💚'],
    ['💚', '💛', '🧡', '🖤', '💛', '💙', '🖤', '💚'],
    ['💚', '💙', '💛', '💛', '💜', '💙', '🧡', '🖤'],
    ['💖', '💜', '💚', '🖤', '💙', '💙', '💚', '🧡'],
    ['🧡', '🧡', '💛', '💙', '🖤', '🧡', '💛', '💚'],
    ['🧡', '🧡', '💜', '💜', '💚', '💜', '💚', '🧡']
]


/////////////////
////////
//
// Main
// 
////////
/////////////////

main()


function main() {

    showGameGrid(grid2)
    // playGame()

    const resultHints = getAllHints(grid2)
    console.log('All the hints :')
    console.log(resultHints)

    showGameGrid(grid2)


}


/////////////////
////////
//
// Game
// 
////////
/////////////////

function playGame() {

    // Generate inital gameGrid making sure there are no matches
    // let gameGrid = buildGameGridWithNoMatches(8, 8)

    // For testing
    gameGrid = examplegameGrid
    console.log('\n**** INITAL GRID')

    showGameGrid(gameGrid)

    // Make a move : switch two items

    // Find matches and delete values
    findAndDeleteMatchingValuesFromGrid(gameGrid)
    console.log('\n**** MATCHES DELETED')
    showGameGrid(gameGrid)


    // Push the remaining values down to the bottom of the grid
    // Affects columns with empty values that are erased matches
    console.log('\n**** PUSH DOWN VALUES AND ERASE ALIGNMENTS')
    pushDownValuesAndEraseAlignments(gameGrid)


    // Fill empty cells with new random values
    gameGrid = fillEmptyCellsWithNoMatches(gameGrid)
    console.log('\n**** EMPTY CELLS FILLED')
    showGameGrid(gameGrid)


}




////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Build gameGrid until it has no matches
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function buildGameGridWithNoMatches(size, numberOfDifferentValues) {

    while (true) {
        gameGrid = buildGameGrid(size, numberOfDifferentValues)
        if (checkGameGridForAlignments(gameGrid) == '') {
            return gameGrid
        }
    }
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
// Display and color the game grid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function showGameGrid(gameGrid) {
    console.log('')
    console.log('    0 1 2 3 4 5 6 7')
    console.log('    - - - - - - - -')

    gameGrid.forEach((row, index) => {
        rowDisplay = ''
        for (let value of row) {
            let colorCode = getColorCode(value);
            let coloredValue = `\x1b[${colorCode}m${value}\x1b[0m`
            rowDisplay += (value !== '') ? coloredValue + ' ' : '* '
        }
        console.log(index + ' | ' + rowDisplay)
    })
    console.log('')
}

function getColorCode(value) {
    // You can customize this function to assign different color codes based on the integer value
    switch (value) {
        case 1:
            return 31; // Red
        case 2:
            return 32; // Green
        case 3:
            return 33; // Yellow
        case 4:
            return 34; // Blue
        case 5:
            return 35; // Magenta
        case 6:
            return 36; // Cyan
        case 7:
            return 37; // White
        // Add more cases for additional integer values and corresponding colors
        default:
            return 0; // Default color (reset)
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Based on given coordinates, get the coordinates of all adjacent cells
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function getAdjacentCells(gameGrid, [y, x]) {
    // Initialize empty array to store adjacent cells coordinates
    let adjacentCells = []

    // console.log('Current item : ' + currentItem)
    // console.log('Current item coordinates : ' + 'y = ' + y + '  x = ' + x)

    // adjacentCellsCoordinatesOffset array contains the offset values of y and x to find adjacent cells
    adjacentCellsCoordinatesOffset = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ]

    // Loop through the coordinates of possible adjacent cells
    for (let adjacentCellOffset of adjacentCellsCoordinatesOffset) {
        // Add offset to coordinates
        let verticalCoordinates = y + adjacentCellOffset[0]
        let horizontalCoordinates = x + adjacentCellOffset[1]
        // console.log('Checking coordinates : ' + 'y = ' + verticalCoordinates + '  x = ' + horizontalCoordinates)

        // Check if calculated coordinates exist (not out of the game board)
        if (isValidCoordinate(gameGrid, [verticalCoordinates, horizontalCoordinates])) {
            adjacentCells.push([verticalCoordinates, horizontalCoordinates])
        }
    }
    return adjacentCells
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Check a grid for matches and delete them replacing value with ''
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function findAndDeleteMatchingValuesFromGrid(gameGrid) {

    // Check if there is a match consequently to the switch
    let matches = checkGameGridForAlignments(gameGrid)

    // If there are matches, updates values of the matches cells to ''
    if (matches != '') {
        updateGridCellValue(gameGrid, matches, '')
    }

    return (gameGrid)
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Fill all empty cells with new random values
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function fillEmptyCellsWithNoMatches(gameGrid) {
    console.log('------------ STARTING FILLING FUNCTION ------------')
    // Make a copy of gameGrid before it is altered
    const initialGrid = [...gameGrid]
    const emptyValuesCoordinates = findEmptyValuesCoordinates(gameGrid)
    let matchesAfter = []

    console.log('SHOWING INITIAL GAMEGRID :')
    showGameGrid(gameGrid)

    do {
        // Reset gameGrid to its value when the function was called (without the new random values)
        gameGrid = initialGrid.map(row => [...row])

        console.log('REINITIALIZED GAMEGRID : ')
        showGameGrid(gameGrid)

        updateGridCellValue(gameGrid, emptyValuesCoordinates, '')
        updateGridCellValue(gameGrid, emptyValuesCoordinates, 'random')
        console.log('Filling empty values with RANDOM : ')
        showGameGrid(gameGrid)

        // Fill empty values with random values
        // gameGrid.forEach((row, i) => row.forEach((cellValue, j) => {
        //     if (cellValue === '') {
        //         gameGrid[i][j] = Math.floor(Math.random() * gameGrid.length)
        //         emptyValuesCoordinates.push([[i, j]])
        //     }
        // }))
        // Check for matches
        matchesAfter = checkGameGridForAlignments(gameGrid)
        console.log("matchesAfter length : " + matchesAfter.length)

        // If no matches, break out of the loop
    } while (matchesAfter.length !== 0)
    console.log('------------ ENDING FILLING FUNCTION ------------')
    return gameGrid
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

function checkForMatchesOneWay(gameGrid, direction, index, allMatches) {

    // previousItem records what item was before current entry
    let previousItem = ''

    // count records the number of matching items 
    let count = 1

    // matches records the coordinates of matching items
    let matches = []

    // Loop through rows/columns of gameGrid
    for (let j = 0; j < gameGrid.length; j++) {

        // Intialize variable for value of the item
        let value = ''

        // y/x coordinates of previous item
        let previousCoordinates = ''

        // y/x coordinates of current item
        let currentCoordinates = ''

        // Set coordinates accordingly for the result regarding the direction chosen
        if (direction == 'row') {
            value = gameGrid[index][j]
            previousCoordinates = [index, j - 1]
            currentCoordinates = [index, j]
        } else {
            value = gameGrid[j][index]
            previousCoordinates = [j - 1, index]
            currentCoordinates = [j, index]
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
                // If the value is the last item in the row/column and is winning match, add coordinates to matches
                if (j === gameGrid.length - 1 && count > 2) {
                    allMatches.push(matches)
                }
            } else {
                // If the value does not match and if count is at least 3, record matches to allMatches array
                if (count > 2) {
                    allMatches.push(matches)
                }
                // Reset matches and count to default values
                matches = []
                count = 1
            }
            // Set previousItem to current value before next iteration
            previousItem = value
        }
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Check if coordinates are not out of the grid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function isValidCoordinate(gameGrid, coord) {
    const gridSize = gameGrid.length
    return coord[0] >= 0 && coord[0] < gridSize && coord[1] >= 0 && coord[1] < gridSize
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Switch two items (coordinatesItem1, coordinatesItem2) on the grid
// Returns the updated gameGrid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function swapTwoItemsOnGrid(gameGrid, [y1, x1], [y2, x2]) {
    // Check if the coordinates are within the grid bounds
    // const gridSize = gameGrid.length
    // const isValidCoordinate = (coord) => coord[0] >= 0 && coord[0] < gridSize && coord[1] >= 0 && coord[1] < gridSize;

    if (isValidCoordinate(gameGrid, [y1, x1]) && isValidCoordinate(gameGrid, [y2, x2])) {
        // Switch values between two items
        const temp = gameGrid[y1][x1];
        gameGrid[y1][x1] = gameGrid[y2][x2];
        gameGrid[y2][x2] = temp;
        console.log(`Switching ${gameGrid[y1][x1]} and ${gameGrid[y2][x2]}`)
        // Return the updated gameGrid after switch
        return gameGrid;
    } else {
        // Return false if move is out of the grid
        console.log(`! Out of the grid move: cannot switch [${y1}, ${x1}] with [${y2}, ${x2}]`);
        return false;
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Update the values of the given coordinates from gameGrid
// value can either be '' (deleting cell value) or 'random' (new random value)
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function updateGridCellValue(gameGrid, cellCoordinates, value) {

    cellCoordinates.forEach(
        (match) => match.forEach((cell) => {
            value === '' ? updatedValue = '' : updatedValue = Math.floor(Math.random() * gameGrid.length)
            gameGrid[cell[0]][cell[1]] = updatedValue
        }))
    return gameGrid
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// On a gameGrid with deleted items, push all the items down
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function pushItemsDown(gameGrid) {

    let colsContent = []

    for (let i = 0; i < gameGrid.length; i++) {
        let colContent = []
        for (let j = 0; j < gameGrid.length; j++) {
            const cellValue = gameGrid[j][i]
            if (cellValue !== '') {
                colContent.push(cellValue)
            }
        }
        colsContent[i] = colContent
    }

    for (let i = 0; i < gameGrid.length; i++) {

        // if 7 values in colsContent
        // start i at 1
        let colValuesCount = 0
        for (let j = 0; j < gameGrid.length; j++) {
            if (j < gameGrid.length - colsContent[i].length) {
                gameGrid[j][i] = ''
            } else {
                gameGrid[j][i] = colsContent[i][colValuesCount]
                colValuesCount++
            }

        }
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Push down all the values until there are no matches
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function pushDownValuesAndEraseAlignments(gameGrid) {
    let matches = ''
    // Push the remaining values down to the bottom of the grid
    pushItemsDown(gameGrid)
    console.log('**** ITEMS PUSHED DOWN')
    showGameGrid(gameGrid)

    do {
        // Check for matches and delete them
        findAndDeleteMatchingValuesFromGrid(gameGrid)
        console.log('**** ITEMS DELETED')
        showGameGrid(gameGrid)

        // Push values down
        pushItemsDown(gameGrid)
        console.log('**** ITEMS PUSHED DOWN')
        showGameGrid(gameGrid)

        // Check if there are matches after values have been pushed down
        matches = checkGameGridForAlignments(gameGrid)
        console.log('Matches length : ' + matches.length)

        // While there are still matches, rerun the loop
    } while (matches.length != 0)
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Find all empty values and add their coordinates to an array
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function findEmptyValuesCoordinates(gameGrid) {
    let result = []
    gameGrid.forEach((row, y) => row.forEach(
        (value, x) => {
            if (value === '') {
                result.push([[y, x]])
            }
        }
    ))
    console.log("Empty cells coordinates : ")
    console.log(result)
    return result
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Check if an array contains a specified given sub-array 
// Disregard the order of the arrays contained in the sub-array
// Example : containsArray([ [[2, 3], [1, 3]] ], [[1, 3], [2, 3]]) returns true
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function containsArray(array, subArray) {
    const subArrayString = JSON.stringify(subArray);
    const invertedSubArray = [subArray[1], subArray[0]];
    const invertedSubArrayString = JSON.stringify(invertedSubArray)
    return array.some(
        (item) =>
            JSON.stringify(item) === subArrayString || JSON.stringify(item) === invertedSubArrayString
    )
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// getAllHints
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function getAllHints(gameGrid) {

    // Initialize empty arrays for cells that have been checked and hints to return
    let checkedPairs = []
    let allHints = []

    gameGrid.forEach(
        (row, y) => row.forEach(
            (value, x) => {
                // Iterating over every cell in the grid
                const currentCell = [y, x]
                console.log(currentCell)
                // Get the adjacent cells of current cell
                const adjacentCells = getAdjacentCells(gameGrid, currentCell)
                console.log('')
                console.log('All adjacent cells :')
                console.log(adjacentCells)
                console.log('-----------------')

                // Iterate over each adjacent cell
                adjacentCells.forEach((adjacentCell) => {
                    console.log('adjacentCell:', adjacentCell)
                    // If cell has not been already checked
                    if (!containsArray(checkedPairs, [currentCell, adjacentCell])) {
                        // Make a copy of gameGrid to prevent altering original grid
                        let testGrid = gameGrid.map(row => [...row])
                        // Swap values of current cell and adjacent cell
                        swapTwoItemsOnGrid(testGrid, currentCell, adjacentCell)
                        // Add adjacent cell coordinates to checkedCells array to avoid rechecking it later
                        checkedPairs.push([currentCell, adjacentCell])
                        // Check if there are alignments consequently to the swap
                        const matches = checkGameGridForAlignments(testGrid)
                        // If there are alignements, push their coordinates to allHints array
                        if (matches.length > 0) {
                            console.log('*************Match to display as hint :')
                            console.log(currentCell, adjacentCell)
                            allHints.push([currentCell, adjacentCell])
                        }
                    }
                })
            }))
    showGameGrid(gameGrid)
    return allHints
}


