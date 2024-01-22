let = examplegameGrid = [
    [1, 7, 7, 6, 0, 0, 3, 2],
    [7, 6, 1, 7, 2, 5, 2, 5],
    [4, 6, 2, 3, 6, 4, 2, 0],
    [7, 0, 7, 5, 7, 4, 0, 3],
    [1, 3, 0, 7, 1, 5, 2, 2],
    [0, 7, 5, 6, 6, 4, 2, 5],
    [3, 3, 3, 1, 4, 0, 7, 2],
    [6, 7, 2, 1, 2, 7, 7, 7]
]


// switchTwoItemsOnGrid(exampleGameGrid, [-1, 1], [0, 2])

// let result = checkAdjacentCellsForSimilarItem(exampleGameGrid, 5, 6)
// console.log(result)

// let foundMatches = checkGameGridForAlignments(exampleGameGrid)
// updateGridCellValue(exampleGameGrid, foundMatches, '')
// updateGridCellValue(exampleGameGrid, foundMatches, 'random')

let results = []

for (let counter = 0; counter < 100000; counter++) {
    results.push(buildGameGridWithNoMatches(8, 8))
}

// console.log(results)
const sum = results.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const average = sum / results.length;

console.log('Average:', average);



////////
//
// Game
// 
////////


function buildGameGridWithNoMatches(size, numberOfDifferentValues) {

    // let gameGrid = buildGameGrid(8, 8)

    let i = 1

    while (true) {
        gameGrid = buildGameGrid(size, numberOfDifferentValues)
        showGameGrid(gameGrid)
        if (checkGameGridForAlignments(gameGrid) == '') {
            break
        } else {
            console.log('Regenerating grid')
        }
        i++
    }

    showGameGrid(gameGrid)
    console.log('Obtained after ' + i + ' iterations')
    return i
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
// Display the game grid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function showGameGrid(gameGrid) {
    let formattedGameGrid = JSON.stringify(gameGrid)
        .replace(/\[/, '[\n')
        .replace(/\],\[/g, ']\n[')
        .replace(/[\[\]]/g, '')
        .replace(/\]$/, '\n]')
    console.log(`[${formattedGameGrid}]`)
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
// Switch two items (coordinatesItem1, coordinatesItem2) on the grid
// Returns the updated gameGrid
//
////////////////////////////////////////////////////////////////////////////////////////////////////

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
    console.log(gameGrid)
    return gameGrid
}


