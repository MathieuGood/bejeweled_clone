let jewels = ['🧡', '💛', '💚', '💙', '💜', '🖤', '❤️']
let gb = buildGameBoard(jewels, 8)


exampleGameBoard = [
    ['❤️', '💚', '💙', '🧡', '🖤', '💜', '🧡', '💜'],
    ['💙', '🖤', '💙', '🖤', '💛', '🖤', '💜', '🖤'],
    ['🖤', '❤️', '🧡', '💙', '💚', '🖤', '❤️', '💙'],
    ['💜', '💜', '❤️', '🖤', '🧡', '💛', '💚', '🖤'],
    ['💚', '🖤', '💜', '💜', '🧡', '💚', '💜', '💙'],
    ['🧡', '❤️', '💜', '🖤', '💜', '❤️', '❤️', '❤️'],
    ['🧡', '🖤', '💛', '🖤', '💛', '💙', '🧡', '🖤'],
    ['💛', '🖤', '💛', '🖤', '💚', '💚', '🖤', '💜']
]


let result = checkAdjacentCellsForSimilarItem(exampleGameBoard, 5, 6)
console.log(result)


////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Based on a gameBoard array and the y, x coordinates of one cell,
// check if there are similar items in any of the adjacent cells
// and return their coordinates in an array
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function checkAdjacentCellsForSimilarItem(gameBoard, y, x) {

    matchingItems = []

    // y = horizontal position of current item
    // x = vertical position of current item

    let currentItem = gameBoard[y][x]
    let gameBoardSize = gameBoard.length

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
            (verticalCoordinates >= 0 && verticalCoordinates < gameBoardSize) &&
            (horizontalCoordinates >= 0 && horizontalCoordinates < gameBoardSize)
        ) {
            console.log('Checking if gameBoard [' + verticalCoordinates + ', ' + horizontalCoordinates + '] = ' + currentItem)
            // Check if the item in the adjacent cell is the same as in the current cell (currentItem)
            // If it is the case, add the coordinates of the matching item in the matchingItems array
            if (gameBoard[verticalCoordinates][horizontalCoordinates] == currentItem) {
                matchingItems.push([verticalCoordinates, horizontalCoordinates])
            }
        }
    }
    return matchingItems
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Build the game board of given size as a multidimensional array
// and populate it with random elements of the items array
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function buildGameBoard(items, size) {
    let gameBoard = []

    for (let i = 0; i < size; i++) {
        let row = []
        for (let j = 0; j < size; j++) {
            row.push(getRandomItemFromArray(items))
        }
        gameBoard.push(row)
    }
    return gameBoard
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
