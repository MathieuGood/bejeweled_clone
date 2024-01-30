import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import TouchButton from '../components/TouchButton'
import GameGrid from '../components/GameGrid'
import {
    buildGameGridWithNoMatches,
    showGameGrid,
    checkGameGridForAlignments,
    swapTwoItemsOnGrid,
    updateGridCellValue,
    pushDownValuesAndEraseAlignments,
    fillEmptyCellsWithNoMatches
} from '../project_resources/exportGameFunctions'



export default function GameScreen({ navigation }) {

    // const exampleGrid = [
    //     [4, 5, 6, 6, 5, 1, 7, 2],
    //     [1, 5, 6, 7, 7, 1, 3, 3],
    //     [1, 3, 6, 0, 4, 7, 2, 1],
    //     [0, 5, 6, 7, 7, 0, 3, 0],
    //     [2, 0, 3, 3, 1, 2, 6, 1],
    //     [0, 7, 2, 3, 2, 6, 6, 1],
    //     [5, 4, 0, 3, 0, 2, 2, 1],
    //     [7, 4, 6, 4, 1, 0, 5, 4],
    // ]
    // const [gameGrid, setGameGrid] = useState(exampleGrid)

    // Build a 8*8 grid with no matches
    const [gameGrid, setGameGrid] = useState(() => buildGameGridWithNoMatches(8, 8))

    // Set the number of attempts to 3
    const [attempts, setAttempts] = useState(3)

    // Set states to record user entry
    const [firstPress, setFirstPress] = useState(null)
    const [secondPress, setSecondPress] = useState(null)
    const [lastPress, setLastPress] = useState(null)




    const getCellCoordinates = (row, col) => {
        console.log(`\nPRESS: row ${row}, col ${col}`)

        if (firstPress == [row, col]) {
            console.log("Same cell as before!")
        }

        // console.log("firstPress before updating state : " + firstPress)
        setLastPress([row, col])

    }

    // Record last cell pressed in either firstPress or secondPress
    useEffect(() => {

        // let grid = gameGrid
        let grid = JSON.parse(JSON.stringify(gameGrid));

        console.log("useEffect : lastPress is " + lastPress)
        if (firstPress === null) {
            setFirstPress(lastPress)
            console.log("useEffect : firstPress recorded >>> " + lastPress)
        } else {
            setSecondPress(lastPress)
            console.log("useEffect : secondPress recorded >>> " + lastPress)

            console.log("firstPress is " + firstPress)
            console.log("secondPress is " + lastPress)

            // Player has selected two cells
            // NOW DO SOMETHING !

            showGameGrid(grid)

            if (swapTwoItemsOnGrid(grid, firstPress, lastPress) != false) {
                let swapGrid = swapTwoItemsOnGrid(grid, firstPress, lastPress)
                let matches = checkGameGridForAlignments(swapGrid)
                console.log("Matches found after swap test", matches)
                if (matches.length > 0) {
                    console.log("OK TO SWAP ", firstPress, 'and', lastPress)

                    grid = swapGrid
                    showGameGrid(grid)

                    grid = updateGridCellValue(grid, matches, '')
                    showGameGrid(grid)

                    pushDownValuesAndEraseAlignments(grid)

                    grid = fillEmptyCellsWithNoMatches(grid)

                } else {
                    setAttempts(attempts - 1)
                    if (attempts - 1 === 0) {
                        Alert.alert(
                            'End of game',
                            'Loser! Game is over!',
                            [
                                { text: 'OK' }
                            ],
                            { cancelable: false }
                        );
                        navigation.navigate('PlayerScreen')
                    }
                }

            }

            showGameGrid(grid)
            setGameGrid(grid)

            setFirstPress(null)
            setSecondPress(null)

            if (firstPress.toString() === lastPress.toString()) {
                console.log("CELLS ARE THE SAME!!!!!!")

                // Decrement attempts
                setAttempts(attempts - 1)
                // If it is the last attempt, show alert and stop game
                if (attempts - 1 === 0) {
                    Alert.alert(
                        'End of game',
                        'Loser! Game is over!',
                        [
                            { text: 'OK' }
                        ],
                        { cancelable: false }
                    );
                    navigation.navigate('PlayerScreen')
                }
            }
        }
    }, [lastPress])


    return (
        <View style={styles.mainContainer}>

            <Text>GameScreen</Text>
            <Text>Number of tries left : {attempts}</Text>
            <Text></Text>
            <Text>firstPress : {firstPress}</Text>
            <Text>secondPress : {secondPress}</Text>

            <TouchButton
                title='Back to player screen'
                press={() => {
                    navigation.navigate('PlayerScreen')
                }}
            />

            <GameGrid
                gridContent={gameGrid}
                pressCellCallback={getCellCoordinates}
            />

        </View>
    )
}

let styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'lightgray',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
