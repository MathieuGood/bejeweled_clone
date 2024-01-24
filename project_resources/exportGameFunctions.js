// #################################################################################################
// #################################################################################################
// #################################################################################################
//
// Game functions
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

export const buildGameGrid = (size, numberOfDifferentValues) => {

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
