import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TouchButton from '../components/TouchButton'
import GameGrid from '../components/GameGrid'
import { buildGameGrid } from '../project_resources/exportGameFunctions'



export default function GameScreen({ navigation }) {

    const exampleGrid = [
        [4, 5, 6, 6, 5, 1, 7, 2],
        [1, 5, 6, 7, 7, 1, 3, 3],
        [1, 3, 6, 0, 4, 7, 2, 1],
        [0, 5, 6, 7, 7, 0, 3, 0],
        [2, 0, 3, 3, 1, 2, 6, 1],
        [0, 7, 2, 3, 2, 6, 6, 1],
        [5, 4, 0, 3, 0, 2, 2, 1],
        [7, 4, 6, 4, 1, 0, 5, 4],
    ]


    const [gameGrid, setGameGrid] = useState(buildGameGrid(8, 8))
    // const [gameGrid, setGameGrid] = useState(exampleGrid)

    const [firstPress, setFirstPress] = useState([null, null])
    const [secondPress, setSecondPress] = useState([null, null])


    

    const getCellCoordinates = (row, col) => {
        console.log(`Cell pressed: ${row}, ${col}`)

        if (firstPress == [row, col]) {
            console.log("Same cell as before!")
        }
        console.log("firstPress before updating state : " + firstPress)
        setFirstPress([row, col])

        console.log("firstPress after updating state : " + firstPress)

    }


    return (
        <View style={styles.mainContainer}>

            <Text>GameScreen</Text>

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
