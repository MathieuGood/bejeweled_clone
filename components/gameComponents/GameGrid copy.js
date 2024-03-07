import React from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import GameTile from './GameTile'


export default function GameGrid({
    gridContent,
    pressCellCallback,
    firstPress,
    disableTouchCapacity,
    theme,
    hintTiles
}) {

    const pressCellFunction = (row, col) => {
        pressCellCallback(row, col)
    }

    function renderGrid(gameGrid) {
        return gameGrid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((tile, colIndex) => {
                    // Déterminez si cette tuile doit être animée
                    const animate = hintTiles && hintTiles.some(hint => hint[0] === rowIndex && hint[1] === colIndex);
    
                    return (
                        <TouchableOpacity
                            key={colIndex}
                            style={styles.cell}
                            onPress={() => pressCellFunction(rowIndex, colIndex)}
                            disabled={disableTouchCapacity}
                        >
                            <GameTile
                                tileReference={tile}
                                firstPress={firstPress}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                theme={theme}
                                animate={animate} 
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        ));
    }
    

    return (

        <View style={styles.grid}>
            {renderGrid(gridContent)}
        </View>

    )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    grid: {
        // flex: 0.65,
        // flex: 1,
        width: windowWidth * 0.98,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        // width: 50,
        // height: 50,
        // width: 'auto',
        // height: 'auto',
        flex:1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 0.5,
        // borderColor: '#ddd',
        // backgroundColor: 'rgba(176, 141, 87, 0.5)'
    }
})