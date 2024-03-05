import React, { useState, useEffect, useContext } from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
} from "react-native"
import AppContext from "../providers/AppContext"
import TouchButton from "../components/TouchButton"
import IconButton from "../components/IconButton"
import ScoresModal from "../components/modalComponents/ScoresModal"
import GameGrid from "../components/gameComponents/GameGrid"
import ScoreBoard from "../components/gameComponents/ScoreBoard"
import ProgressBar from "../components/gameComponents/ProgressBar"
import {
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

import MusicPlayer from "../components/MusicPlayer"

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

  // Get theme from context
  const theme = useContext(AppContext).theme

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

   // State to control automatic music playback based on game events and user interactions
   const [shouldPlayMusic, setShouldPlayMusic] = useState(true);
  
  // State to control the on/off position of the music switch. 
   const [musicSwitchEnabled, setMusicSwitchEnabled] = useState(true);

   // Indicates readiness for navigation.
   const [isReadyForNavigation, setIsReadyForNavigation] = useState(false);

   const [hint, setHint] = useState(null);





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
      setHint(hint); // Met à jour l'état avec les coordonnées du hint sélectionné
      console.log("Hint : ", hint)
      // Alert.alert(
      //   "Hint",
      //   `Swap cells ${hint[0]} and ${hint[1]}`,
      //   [{ text: "OK", onPress: () => console.log("OK Pressed after hint") }],
      //   { cancelable: false },
      // )
      return hint
    }
  }


  // Handle end of game showing Modal with current score, top scores and add current score to database
  const endGame = (message, score, timer) => {
    console.log("Game over : " + message)

    // Pause the time
    setTimerPause(true)

    // Stop music playback when the game ends
    setShouldPlayMusic(false);  
    setMusicSwitchEnabled(false);


    // Get current time in GMT and format it into a DateTime string (YYYY-MM-DD HH:MM:SS)
    const endTime = new Date().toISOString().slice(0, 19).replace("T", " ")

    // If route parameters contain logged in user info, add score, duration and endTime in database
    if (route.params) {
      const player_id = route.params.player_id
      addScore(player_id, score, timer, endTime)
    }

    console.log("END TIME : " + endTime)
    console.log("TIMER : " + timer)

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
    setShouldPlayMusic(true); //music playback is enabled for a new game
    setMusicSwitchEnabled(true);

  }

  // Initiates game quit process by stopping music and marking readiness for navigation.
  const quitGame = () => {
    setShouldPlayMusic(false);
    setIsReadyForNavigation(true);
  };




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

    if (firstPress === null) {
      // If it user's first press on a cell, record press to firstPress state
      setFirstPress(lastPress)

      // TO DO : Highlight the first cell selected on the grid

    } else {
      // If it user's second press on a cell, run the game logic to swap cells and check for matches

      // If the two selected cells are ok for swapping (result in new match)
      if (swapTwoItemsOnGrid(grid, firstPress, lastPress) != false) {
        // Swap cells
        let swapGrid = swapTwoItemsOnGrid(grid, firstPress, lastPress)
        // Check if there are matches
        let matches = checkGameGridForAlignments(swapGrid)

        // If at least one match is found, swap the values between the two cells
        if (matches.length > 0) {

          // Apply grid with swapped cells to the game grid
          grid = swapGrid

          // Find matches, erase matches and push down values until there are no more matches
          pushDownValuesAndEraseAlignments(grid, level, setScore, score, setLevel, setProgressBar)

          // Fill the empty cells with random values, checking there are no matches
          grid = fillEmptyCellsWithNoMatches(grid)

          // Save the new grid to the gameGrid state
          setGameGrid(grid)

          // If no hints can be found, end the game
          if (getAllHints(grid).length === 0) {
            console.log("No more matches on the grid, regenerating grid in order to continue game")
            grid = buildGameGridWithNoMatches(gridSize, gridNumberOfDifferentItems)
          }
        } else {
          // If the cells are not ok for swapping, decrement attempts counter
          setAttempts(attempts - 1)
        }
      }

      // Update gameGrid state with the new grid and reset firstPress
      setGameGrid(grid)
      setFirstPress(null)
    }
  }, [lastPress])

  // Ensures navigation occurs only after component has handled all pre-navigation tasks and is ready to unmount, preventing premature transitions.
  useEffect(() => {
    if (isReadyForNavigation) {
      route.params
        ? navigation.navigate('HomeScreen', { player_id: route.params.player_id, player_name: route.params.player_name })
        : navigation.navigate('HomeScreen');

      // Reset state for future navigation
      setIsReadyForNavigation(false);
    }
  }, [isReadyForNavigation, navigation, route.params]);


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
        <View style={styles.topContainer}>

          <ScoreBoard level={level} score={score} attempts={attempts} />
        </View>


        <View style={styles.centerContainer}>

          <GameGrid
            gridContent={gameGrid}
            // Return the coordinates of the cell pressed through getCellCoordinates()
            pressCellCallback={getCellCoordinates}
            firstPress={firstPress}
            // If timer is paused, disable touch capacity
            disableTouchCapacity={timerPause === false ? false : true}
            theme={theme}
            hintTiles={hint}
          />

          <ProgressBar
            level={level}
            nextLevel={level + 1}
            progress={progressBar}
          />

        </View>


        <View style={styles.bottomContainer}>
          {/* <Text>
            Progress bar : {progressBar} / 100      Timer : {timer}
          </Text> */}

          {/* <Text>firstPress : {firstPress}     secondPress : {secondPress}</Text> */}

          {/* <TouchButton
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
                setShouldPlayMusic(true);
                setMusicSwitchEnabled(false);

                // Make a deep copy of the gameGrid to gridBackup
                setGridBackup(JSON.parse(JSON.stringify(gameGrid)))
              } else {
                // If the game is paused, resume it
                console.log("Resume button pressed")
                setTimerPause(false)
                setGameGrid(gridBackup)
                setShouldPlayMusic(true);
                setMusicSwitchEnabled(true);

              }
            }}
          /> */}

          <IconButton
            // Show 'Pause' on button text if the game is running
            // Else, show 'Resume' on button text
            iconName={timerPause ? "play-circle-outline" : "pause-circle-outline"}
            iconColor='#2b50c8'
            iconSize={40}
            title={timerPause === false ? "Pause" : "Resume"}
            // On click, pause or resume the game
            press={() => {
              // If the game is running, pause it
              if (timerPause === false) {
                console.log("Pause button pressed")
                setTimerPause(true)
                setGameGrid(buildEmptyGrid)
                setShouldPlayMusic(true);
                setMusicSwitchEnabled(false);

                // Make a deep copy of the gameGrid to gridBackup
                setGridBackup(JSON.parse(JSON.stringify(gameGrid)))
              } else {
                // If the game is paused, resume it
                console.log("Resume button pressed")
                setTimerPause(false)
                setGameGrid(gridBackup)
                setShouldPlayMusic(true);
                setMusicSwitchEnabled(true);

              }
            }}
          />

          {/* <TouchButton
            title={"Hint"}
            press={() => {
              console.log("Hint button pressed")
              showHint(gameGrid)
            }}
          /> */}

          <IconButton
            iconName="help-circle-outline"
            title={"Hint"}
            press={() => {
               console.log("Hint button pressed")
               showHint(gameGrid)
            }}
          />

          {/* <TouchButton
            title="Quit game"
            press={quitGame}
          /> */}

          <IconButton
          iconName="exit-to-app" 
            title="Quit game"
            press={quitGame}
          />

          <MusicPlayer 
            shouldPlayAutomatically={shouldPlayMusic} 
            musicSwitchEnabled={musicSwitchEnabled} 
            setMusicSwitchEnabled={setMusicSwitchEnabled} 
          />
          

        </View>

        <ScoresModal
          visible={isModalvisible}
          changeModalVisible={setisModalVisible}
          navigation={navigation}
          route={route}
          title={"Game over"}
          resetGame={resetGame}
          score={score}
          endGame={true}
        />

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

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "lightgrey",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    // alignItems: 'stretch',
    justifyContent: "space-around",
  },
  topContainer: {
    backgroundColor: '#e8b923',
    flex: 0.15, 
    marginHorizontal: 30, //modifier la largeur du container suivant appareil
    paddingVertical: 'auto'

     
    },
  centerContainer: {
    // backgroundColor: 'black',
    flex: 0.8,
    justifyContent: 'space-around',
    // alignContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    backgroundColor:  '#87CEEB',
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
     width: '100%'
  },
  // Add opacity to ImageBackground
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.5,
  },
})
