import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Artifact from './Artifact'


export default function GameGrid({ gridContent, pressCellCallback , disableTouchCapacity}) {

    const pressCellFunction = (row, col) => {
        pressCellCallback(row, col)

    }

    function renderGrid(gameGrid) {
        return gameGrid.map((row, rowIndex) => (

            <View key={rowIndex} style={styles.row}>

                {row.map((artefact, colIndex) => (

                    <TouchableOpacity                                
                        key={colIndex}
                        style={styles.cell}
                        onPress={() => pressCellFunction(rowIndex, colIndex)}
                        disabled={disableTouchCapacity}
                    >
                        <Artifact artifactNumber={artefact} />
                    </TouchableOpacity>

                ))}

            </View>
        ))
    }

    return (

        <View style={styles.grid}>
            {renderGrid(gridContent)}
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