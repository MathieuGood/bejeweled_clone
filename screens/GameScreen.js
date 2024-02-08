import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Text, Alert} from 'react-native'
import TouchButton from '../components/TouchButton'
import ScoreBoard from '../components/ScoreBoard'
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
import ProgressBar from '../components/ProgressBar'
import ModalScore from '../components/ModalScore'



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

    // Set timer start
    const [timer, setTimer] = useState("")

    // Set score and level (progress added by Norah)
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(1)
    const [progress, setProgress] = useState(50); 

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
    const  [isModalvisible, setisModalVisible] = useState(false);

    const handleGameOver = () => {
        setisModalVisible(true); 
      };


    // Record last cell pressed in either firstPress or secondPress
    useEffect(() => {

        // Get current score, level and grid from states
        let currentScore = score
        let currentLevel = level
        let grid = gameGrid

        console.log("useEffect : lastPress is " + lastPress)
        if (firstPress === null) {
            // If it user's first press on jewel, record press to firstPress state
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

                    let pointsPerMatch
                    let pointsToAdd = 0
                    matches.forEach((matchingCells) => {
                        if (matchingCells.length === 3) {
                            pointsPerMatch = 50
                        } else if (matchingCells.length === 4) {
                            pointsPerMatch = 150
                        } else if (matchingCells.length > 4) {
                            pointsPerMatch = 500
                        }
                        pointsToAdd += pointsPerMatch * level
                    })
                    console.log("Points to add to score : " + pointsToAdd)
                    setScore(score + pointsToAdd)


                    setTimeout(() => {
                        pushDownValuesAndEraseAlignments(grid);
                        grid = fillEmptyCellsWithNoMatches(grid);
                        showGameGrid(grid);
                        setGameGrid(grid);
                    }, 500);

                } else {
                    setAttempts(attempts - 1)
                    if (attempts - 1 === 0) {
                        // Alert.alert(r
                        //     'End of game',
                        //     'Loser! Game is over!',
                        //     [
                        //         { text: 'OK' }
                        //     ],
                        //     { cancelable: false }
                        // );
                        // navigation.navigate('PlayerScreen')
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



                    // Alert.alert(
                    //     'End of game',
                    //     'Loser! Game is over!',
                    //     [
                    //         { text: 'OK' }
                    //     ],
                    //     { cancelable: false }
                    // );
                    // navigation.navigate('PlayerScreen')
                }
            }
        }
    }, [lastPress])
    const resetGame = () => {
        // Réinitialiser l'état du jeu à ses valeurs par défaut
        setGameGrid(buildGameGridWithNoMatches(8, 8));
        setAttempts(3);
        setScore(0);
        setLevel(1);
        setProgress(50);
      };
      
    useEffect(() => {
        // Checks if game over conditions are met (no more attempts or progress reached 0)
        if (attempts === 0 || progress === 0) {
          handleGameOver(); // Function to handle game over logic
        }
      }, [attempts, progress]); // This useEffect runs whenever `attempts` or `progress` changes
      


    return (
        <View style={styles.mainContainer}>


         <SafeAreaView style={styles.safeArea}>
            
            {/* <Text>Number of tries left : {attempts}</Text>
            <Text></Text>
            <Text>Level : {level}</Text>
           <Text>Score : {score}</Text> 
            <Text></Text>*/} 

            <Text>firstPress : {firstPress}</Text>
            <Text>secondPress : {secondPress}</Text>

            <ModalScore 
                visible={isModalvisible}
                changeModalVisible= {setisModalVisible}
                navigation={navigation}
                resetGame={resetGame}
                score = {score}
           />

            <ScoreBoard level={level} score={score}  attempts={attempts}/>


            <GameGrid
                gridContent={gameGrid}
                pressCellCallback={getCellCoordinates}
            />
            
            {/* nextLevel à ne pas tenir compte car pas forcément level + 1 */}
            <ProgressBar level={level} nextLevel={level + 1} progress={progress} /> 

          
            <TouchButton
                title='Back to player screen'
                press={() => {
                    navigation.navigate('PlayerScreen')
                }}
            />
              
        </SafeAreaView>

        </View>
    )
}

let styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'lightgray',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeArea: {
        flex: 1,
         justifyContent: 'space-around'
       }
})
