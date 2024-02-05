import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import TouchButton from '../components/TouchButton'
import GameGrid from '../components/GameGrid'
import {
    buildGameGridWithNoMatches,
    showGameGrid,
    checkGameGridForAlignments,
    swapTwoItemsOnGrid,
    pushDownValuesAndEraseAlignments,
    fillEmptyCellsWithNoMatches,
    getAllHints,
    getOneRandomHint,
    endGameAlert
} from '../project_resources/exportGameFunctions'



export default function GameScreen({ navigation }) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // States and variables
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

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


    let exampleGrid = [
        [5, 1, 2, 3, 2, 0, 5, 0],
        [4, 0, 6, 0, 5, 0, 7, 1],
        [1, 7, 7, 1, 7, 7, 3, 7],
        [3, 5, 6, 4, 2, 6, 1, 1],
        [0, 5, 6, 3, 4, 7, 5, 1],
        [3, 7, 4, 0, 3, 2, 3, 0],
        [2, 2, 0, 4, 5, 4, 7, 0],
        [4, 0, 3, 6, 0, 5, 2, 6]
    ]

    // const [gameGrid, setGameGrid] = useState(exampleGrid)

    // Build a grid with no matches
    const gridSize = 8
    const gridNumberOfDifferentItems = 8
    const [gameGrid, setGameGrid] = useState(() => buildGameGridWithNoMatches(gridSize, gridNumberOfDifferentItems))
    const [gridBackup, setGridBackup] = useState([])

    // Set the number of attempts to 3
    const [attempts, setAttempts] = useState(3)

    // Set timer start
    const [timer, setTimer] = useState(0)
    const [timerPause, setTimerPause] = useState(false)

    // Set score, level, progress bar and hint to starting values
    const [score, setScore] = useState(50)
    const [level, setLevel] = useState(1)
    const [progressBar, setProgressBar] = useState(50)
    const [progressBarMax, setProgressBarMax] = useState(100)
    const [hint, setHint] = useState(null)

    // Set states to record user entry
    const [firstPress, setFirstPress] = useState(null)
    const [secondPress, setSecondPress] = useState(null)
    const [lastPress, setLastPress] = useState(null)



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    const getCellCoordinates = (row, col) => {
        console.log(`\nPRESS: row ${row}, col ${col}`)

        if (firstPress == [row, col]) {
            console.log("Same cell as before!")
        }
        // console.log("firstPress before updating state : " + firstPress)
        setLastPress([row, col])
    }

    // Build a grid with empty values
    const buildEmptyGrid = Array(gridSize).fill(Array(gridSize).fill(''))

    // Show hint
    function showHint(gameGrid) {
        let resultHints = getAllHints(gameGrid)

        if (resultHints.length === 0) {
            console.log("No hints available")
            Alert.alert(
                "No hints available",
                "No matches found on the grid",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            )
        } else {
            let hint = getOneRandomHint(resultHints)
            // Norah :
            // INTEGRER CODE POUR AFFICHER LE HINT SUR LE GRID
            console.log("Hint : ", hint)
            Alert.alert(
                "Hint",
                `Swap cells ${hint[0]} and ${hint[1]}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed after hint") }
                ],
                { cancelable: false }
            )
            return hint
        }

    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // useEffect functions
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Timer
    // Trigger actions when the timerPause state is updated
    useEffect(() => {
        // If the timer is not paused, increment the timer every second
        const intervalId = setInterval(() => {
            if (timerPause === false) {
                setTimer(prevTimer => {
                    const newTimer = prevTimer + 1
                    return newTimer
                })
            }
        }, 1000)
        return () => clearInterval(intervalId)
    }, [timerPause])


    // Decrement progress bar every 3 seconds
    // Trigger actions when the progressBar state is updated
    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgressBar(prevProgressBar => {
                const newProgressBar = prevProgressBar - 1;
                // Make sure the progress bar doesn't go below 0
                return Math.max(0, newProgressBar)
            });
        }, 3000);

        // Clean up function to clear the interval when the component unmounts or the effect is re-run
        return () => clearInterval(intervalId);
    }, [progressBar]);


    // Trigger actions when the lastPress state is updated
    useEffect(() => {

        // Get current grid from state
        let grid = gameGrid

        console.log("useEffect : lastPress is " + lastPress)
        if (firstPress === null) {
            // If it user's first press on jewel, record press to firstPress state
            setFirstPress(lastPress)
            // Norah :
            // INTEGRER CODE POUR METTRE EN SURBRILLANCE LA PREMIERER CELLULE SELECTIONNEE SUR LE GRID
            // Coordoonnées de la première cellule sélectionnée : firstPress
            console.log("useEffect : firstPress recorded >>> " + lastPress)
        } else {
            setSecondPress(lastPress)
            console.log("useEffect : secondPress recorded >>> " + lastPress)

            console.log("firstPress is " + firstPress)
            console.log("secondPress is " + lastPress)

            // Player has selected two cells
            // NOW DO SOMETHING !

            showGameGrid(grid)

            // If the two selected cells are ok for swapping (result in new match)
            if (swapTwoItemsOnGrid(grid, firstPress, lastPress) != false) {

                // Swap cells
                let swapGrid = swapTwoItemsOnGrid(grid, firstPress, lastPress)

                // Check if there are matches
                let matches = checkGameGridForAlignments(swapGrid)
                console.log("Matches found after swap test", matches)

                // If 1 or more matches have been found
                if (matches.length > 0) {
                    console.log("OK TO SWAP ", firstPress, 'and', lastPress)

                    // Apply grid with swapped cells to the game grid
                    grid = swapGrid
                    showGameGrid(grid)

                    // Find matches, erase matches and push down values until there are no more matches
                    pushDownValuesAndEraseAlignments(grid, level, setScore)

                    // Fill the empty cells with random values, checking there are no matches
                    grid = fillEmptyCellsWithNoMatches(grid)
                    showGameGrid(grid)

                    // Save the new grid to the gameGrid state
                    setGameGrid(grid)

                    if (getAllHints(grid).length === 0) {
                        console.log("No more valid move possible. End of game.")
                        // Norah :
                        // INSERER MODAL DE FIN DE JEU À LA PLACE DE L'ALERT

                        // Show alert and stop game
                        endGameAlert("No more valid move possible.", score, timer,)

                        // Navigate back to player screen
                        navigation.navigate('PlayerScreen')
                    }

                } else {
                    // If the cells are not ok for swapping, decrement attempts counter
                    setAttempts(attempts - 1)

                    // If the attempts counter is 0, show alert and stop game
                    if (attempts - 1 === 0) {

                        endGameAlert("You used all your attempts.", score, timer,)

                        // Navigate back to player screen
                        navigation.navigate('PlayerScreen')
                    }
                }
            }

            showGameGrid(grid)
            setGameGrid(grid)

            // Reset firstPress and secondPress
            setFirstPress(null)
            setSecondPress(null)

            if (firstPress.toString() === lastPress.toString()) {
                console.log("CELLS ARE THE SAME!!!!!!")

                // Decrement attempts
                setAttempts(attempts - 1)
                // If it is the last attempt, show alert and stop game
                if (attempts - 1 === 0) {
                    // Norah :
                    // INSERER MODAL DE FIN DE JEU À LA PLACE DE L'ALERT

                    // Show alert
                    endGameAlert("You used all your attempts.", score, timer,)

                    // Navigate back to player screen
                    navigation.navigate('PlayerScreen')
                }
            }
        }
    }, [lastPress])



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Component return
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <View style={styles.mainContainer}>

            <Text>Number of tries left : {attempts}</Text>
            <Text></Text>
            <Text>Level : {level}</Text>
            <Text>Score : {score}</Text>
            <Text>Progress bar : {progressBar} / {progressBarMax}</Text>
            <Text></Text>
            <Text>firstPress : {firstPress}     secondPress : {secondPress}</Text>
            <Text></Text>
            <Text>Timer : {timer}</Text>

            <GameGrid
                gridContent={gameGrid}
                // If timer is paused, do not allow cell press
                // Else, return the coordinates of the cell pressed through getCellCoordinates()
                pressCellCallback={getCellCoordinates}
                // If timer is paused, disable touch capacity
                disableTouchCapacity={timerPause === false ? false : true}
            />

            <View style={styles.bottomContainer}>
                <TouchButton
                    // Show 'Pause' button if the game is running
                    // Else, show 'Resume' button
                    title={timerPause === false ? 'Pause' : 'Resume'}
                    // On click, pause or resume the game
                    press={() => {
                        // If the game is running, pause it
                        if (timerPause === false) {
                            console.log("Pause button pressed")
                            setTimerPause(true)
                            setGameGrid(buildEmptyGrid)
                            // Make a deep copy of the gameGrid to gridBackup
                            setGridBackup(JSON.parse(JSON.stringify(gameGrid)))
                        } else {
                            // If the game is paused, resume it
                            console.log("Resume button pressed")
                            setTimerPause(false)
                            setGameGrid(gridBackup)
                        }
                    }}
                />
                <TouchButton
                    title={'Hint'}
                    press={() => {
                        console.log("Hint button pressed")
                        showHint(gameGrid)
                    }}
                />
                <TouchButton
                    title='Back to player screen'
                    press={() => {
                        navigation.navigate('PlayerScreen')
                    }}
                />
            </View>
        </View>
    )
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Stylesheet
//
////////////////////////////////////////////////////////////////////////////////////////////////////

let styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'lightgray',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 0.22,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
