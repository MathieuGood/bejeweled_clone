import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
} from "react-native"
import TouchButton from "../components/TouchButton"
import GameGrid from "../components/GameGrid"
import ScoreBoard from "../components/ScoreBoard"
import ProgressBar from "../components/ProgressBar"
import ModalScore from "../components/ModalScore"
import {
  getHighScores,
  addScore
} from "../core/apiRequests"
import {
  buildGameGridWithNoMatches,
  showGameGrid,
  checkGameGridForAlignments,
  swapTwoItemsOnGrid,
  pushDownValuesAndEraseAlignments,
  fillEmptyCellsWithNoMatches,
  getAllHints,
  getOneRandomHint,
} from "../core/gameFunctions"



export default function GameScreen({ navigation, route }) {


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
    [4, 0, 3, 6, 0, 5, 2, 6],
  ]

  // const [gameGrid, setGameGrid] = useState(exampleGrid)

  // Build a grid with no matches
  const gridSize = 8
  const gridNumberOfDifferentItems = 8
  const [gameGrid, setGameGrid] = useState(() =>
    buildGameGridWithNoMatches(gridSize, gridNumberOfDifferentItems),
  )
  const [gridBackup, setGridBackup] = useState([])

  // Set the number of attempts to 3
  const [attempts, setAttempts] = useState(3)

  // Set timer start
  const [timer, setTimer] = useState(0)
  const [timerPause, setTimerPause] = useState(false)

  // Set score, level, progress bar to starting values
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [progressBar, setProgressBar] = useState(50)

  // Set states to record user entry
  const [firstPress, setFirstPress] = useState(null)
  const [lastPress, setLastPress] = useState(null)

  // Set the modal visibility to false
  const [isModalvisible, setisModalVisible] = useState(false)

  // Set high scores to null
  const [highScores, setHighScores] = useState(null)



  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Functions
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Build a grid with empty values
  const buildEmptyGrid = Array(gridSize).fill(Array(gridSize).fill(""))

  // Retrieve cell coordinates and record them to lastPress state
  const getCellCoordinates = (row, col) => {
    console.log(`\nPRESS: row ${row}, col ${col}`)

    if (firstPress == [row, col]) {
      console.log("Same cell as before!")
    }
    // console.log("firstPress before updating state : " + firstPress)
    setLastPress([row, col])
  }


  // Show hint
  const showHint = (gameGrid) => {
    let resultHints = getAllHints(gameGrid)

    if (resultHints.length === 0) {
      console.log("No hints available")
      Alert.alert(
        "No hints available",
        "No matches found on the grid",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      let hint = getOneRandomHint(resultHints)
      // TO DO : Display hint with animation
      console.log("Hint : ", hint)
      Alert.alert(
        "Hint",
        `Swap cells ${hint[0]} and ${hint[1]}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed after hint") }],
        { cancelable: false },
      )
      return hint
    }
  }


  // Handle end of game showing Modal with current score, top scores and add current score to database
  const endGame = (message, score, timer) => {
    console.log("Game over : " + message)

    // Pause the timer
    setTimerPause(true)

    // Get current time in GMT and format it into a DateTime string (YYYY-MM-DD HH:MM:SS)
    const endTime = new Date().toISOString().slice(0, 19).replace("T", " ")

    // If route parameters contain logged in user info, add score, duration and endTime in database
    if (route.params) {
      const player_id = route.params.player_id
      addScore(player_id, score, timer, endTime)
    }

    console.log("END TIME : " + endTime)
    console.log("TIMER : " + timer)

    // Retrieve high scores
    getHighScores(setHighScores)

    // Show scores Modal
    setisModalVisible(true)
  }


  // Reset all the states to default in order to start a new game
  const resetGame = () => {
    setGameGrid(buildGameGridWithNoMatches(gridSize, gridNumberOfDifferentItems))
    setAttempts(3)
    setScore(0)
    setLevel(1)
    setProgressBar(50)
    setTimerPause(false)
  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // useEffect functions
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Timer and progress bar update
  // Trigger actions when the timerPause state is updated
  useEffect(() => {
    // If the timer is not paused, increment the timer every second
    const intervalId = setInterval(() => {
      if (timerPause === false) {
        // Increment timer
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1
          return newTimer
        })
        // Decrement progressBar
        setProgressBar((prevProgressBar) => {
          const newProgressBar = prevProgressBar - 1
          return newProgressBar
        })
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timerPause])



  // End the game if attemps or progressBar reach 0
  useEffect(() => {
    // Checks if game over conditions are met (no more attempts or progress reached 0)
    if (attempts < 1) {
      endGame("You used all your attempts.", score, timer)
    } else if (progressBar < 1) {
      endGame("Time is up!", score, timer)
    }
  }, [attempts, progressBar])



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
          console.log("OK TO SWAP ", firstPress, "and", lastPress)

          // Apply grid with swapped cells to the game grid
          grid = swapGrid
          showGameGrid(grid)

          // Find matches, erase matches and push down values until there are no more matches
          pushDownValuesAndEraseAlignments(grid, level, setScore, score, setLevel, setProgressBar)

          // Fill the empty cells with random values, checking there are no matches
          grid = fillEmptyCellsWithNoMatches(grid)
          showGameGrid(grid)

          // Save the new grid to the gameGrid state
          setGameGrid(grid)

          // If no hints can be found, end the game
          if (getAllHints(grid).length === 0) {
            endGame("No more valid move possible. End of game.", score, timer)
          }
        } else {
          // If the cells are not ok for swapping, decrement attempts counter
          setAttempts(attempts - 1)
        }
      }

      // Update gameGrid state with the new grid
      setGameGrid(grid)

      showGameGrid(grid)

      // Reset firstPress
      setFirstPress(null)
    }
  }, [lastPress])



  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Component return
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground
                source={require('../assets/hieroglyphics.png')}
                style={styles.imageBackground}
            > */}

      <SafeAreaView style={styles.safeArea}>
        <ModalScore
          visible={isModalvisible}
          changeModalVisible={setisModalVisible}
          navigation={navigation}
          route={route}
          resetGame={resetGame}
          title={"Game is over"}
          score={score}
          highScores={highScores}
        />

        <ScoreBoard level={level} score={score} attempts={attempts} />

        <GameGrid
          gridContent={gameGrid}
          // If timer is paused, do not allow cell press
          // Else, return the coordinates of the cell pressed through getCellCoordinates()
          pressCellCallback={getCellCoordinates}
          // If timer is paused, disable touch capacity
          disableTouchCapacity={timerPause === false ? false : true}
        />

        <ProgressBar
          level={level}
          nextLevel={level + 1}
          progress={progressBar}
        />

        <View style={styles.bottomContainer}>
          <Text>
            Progress bar : {progressBar} / 100      Timer : {timer}
          </Text>
          {/* <Text>firstPress : {firstPress}     secondPress : {secondPress}</Text> */}

          <TouchButton
            // Show 'Pause' on button text if the game is running
            // Else, show 'Resume' on button text
            title={timerPause === false ? "Pause" : "Resume"}
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
            title={"Hint"}
            press={() => {
              console.log("Hint button pressed")
              showHint(gameGrid)
            }}
          />

          <TouchButton
            title="Quit game"
            press={() => {
              route.params
                ? navigation.navigate('HomeScreen', { player_id: route.params.player_id, player_name: route.params.player_name })
                : navigation.navigate('HomeScreen')
            }}
          />
        </View>
      </SafeAreaView>

      {/* </ImageBackground> */}
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
    // backgroundColor: 'rgba(255, 230, 128, 0.5)', // Background with 50% opacity
    backgroundColor: "lightgrey",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-around",
  },
  bottomContainer: {
    height: "26%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  // Add opacity to ImageBackground
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.5,
  },
})
