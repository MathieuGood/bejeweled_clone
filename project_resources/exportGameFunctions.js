// #################################################################################################
// #################################################################################################
// #################################################################################################
//
// ##### Game functions
//
// #################################################################################################
// #################################################################################################
// #################################################################################################



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Build gameGrid until it has no matches
//
////////////////////////////////////////////////////////////////////////////////////////////////////

export const buildGameGridWithNoMatches = (size, numberOfDifferentValues) => {

    while (true) {
        console.log('Generating grid...')
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

const buildGameGrid = (size, numberOfDifferentValues) => {

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
// Check if there are any alignments of matching items on the game grid
// Return an array for each alignement with coordinates of each matching cell
//
////////////////////////////////////////////////////////////////////////////////////////////////////

export const checkGameGridForAlignments = (gameGrid) => {

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

const checkForMatchesOneWay = (gameGrid, direction, index, allMatches) => {

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
// Display and color the game grid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

export const showGameGrid = (gameGrid) => {
    console.log('')
    console.log('    0 1 2 3 4 5 6 7')
    console.log('    - - - - - - - -')

    gameGrid.forEach((row, index) => {
        rowDisplay = ''
        for (let value of row) {
            let colorCode = getColorCode(value)
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
            return 31 // Red
        case 2:
            return 32 // Green
        case 3:
            return 33 // Yellow
        case 4:
            return 34 // Blue
        case 5:
            return 35 // Magenta
        case 6:
            return 36 // Cyan
        case 7:
            return 37 // White
        // Add more cases for additional integer values and corresponding colors
        default:
            return 0 // Default color (reset)
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
// Swap two items (coordinatesItem1, coordinatesItem2) on the grid
// Returns the updated gameGrid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

export const swapTwoItemsOnGrid = (gameGrid, [y1, x1], [y2, x2]) => {
    // Make a deep copy of the gameGrid
    gameGrid = JSON.parse(JSON.stringify(gameGrid))
    

    // Check if the coordinates are within the grid bounds
    if (isValidCoordinate(gameGrid, [y1, x1]) && isValidCoordinate(gameGrid, [y2, x2])) {
        // Swap values between two items
        const temp = gameGrid[y1][x1]
        gameGrid[y1][x1] = gameGrid[y2][x2]
        gameGrid[y2][x2] = temp
        // console.log(`Swapping ${gameGrid[y1][x1]} and ${gameGrid[y2][x2]}`)
        // Return the updated gameGrid after switch
        return gameGrid
    } else {
        // Return false if move is out of the grid
        // console.log(`! Out of the grid move: cannot swap [${y1}, ${x1}] with [${y2}, ${x2}]`)
        return false
    }
}
