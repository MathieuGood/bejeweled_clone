import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Artifact from './Artifact'


export default function GameGrid({ gridContent, press }) {

    const [gameGrid, setGameGrid] = useState([])


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

    function renderGrid() {
        console.log('Render grid')
    }

    return (
        // <View>
        //     <TouchableOpacity style={styles.buttonContainer} onPress={press}>
        //         <Image source='' style={styles.artifactImage} />
        //     </TouchableOpacity>

        // </View>

        <View style={styles.grid}>
            {renderGrid()}
        </View>


    )
}


const styles = StyleSheet.create({
    artifactImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    grid: {
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'rgba(176, 141, 87, 0.5)'
    }
})