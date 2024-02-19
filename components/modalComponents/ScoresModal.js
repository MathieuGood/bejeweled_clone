import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import TouchButton from '../TouchButton'
import HighScores from '../HighScores'


export default function ScoresModal({
    changeModalVisible,
    navigation,
    route,
    resetGame,
    score,
    endGame
}) {

    return (
        <View>

            {endGame
                ? <View>
                    <Text style={styles.scoreText}>
                        You scored <Text style={styles.score}>{score}</Text> points.
                    </Text>
                </View>
                : null
            }

            <HighScores
            />

            {endGame
                // If the modal is an endGame modal, display the buttons to restart the game or go back to the menu
                ? <View style={styles.bottomButtonsContainer}>

                    <TouchButton title="Restart game" press={() => {
                        changeModalVisible(false)
                        resetGame()
                    }}
                    />

                    <TouchButton title="Back to menu" press={() => {
                        changeModalVisible(false)
                        route.params
                            ? navigation.navigate('HomeScreen', { player_id: route.params.player_id, player_name: route.params.player_name })
                            : navigation.navigate('HomeScreen')
                    }}
                    />

                </View>
                // If the modal is a highScores modal, display the button to close modal
                : <View>
                    <TouchButton title="Close" press={() => {
                        changeModalVisible(false)
                    }}
                    />
                </View>
            }

        </View>
    )
}



const styles = StyleSheet.create({
    scoreText: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 17
    },
    score: {
        color: '#E53935', // Par exemple, une couleur rouge pour le score
        fontWeight: 'bold',
    },
    bottomButtonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly'
    }
})
