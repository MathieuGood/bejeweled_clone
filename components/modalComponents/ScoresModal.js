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
    highScores,
    endGame
}) {

    // Set title whether it is an endGame Modal or simple HighScores Modal
    let title
    if (endGame) {
        title = 'Game over'
    } else {
        title = 'High scores'
    }

    return (
        <View style={styles.modal}>

            <Text style={styles.modalText}>{title}</Text>

            {/* If it is an endGame Modal, display finished game score */}
            {endGame
                ? <View>
                    <Text style={{
                        textAlign: 'center',
                        marginBottom: 15,
                        fontSize: 17
                    }}>
                        You scored <Text style={styles.scoreStyle}>{score}</Text> points.
                    </Text>
                </View>
                : null
            }



            <HighScores
                data={highScores}
                styles={{}}
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
                // If the modal is a highScores modal, display the button to go back
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

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    modal: {
        marginTop: 300,
        width: windowWidth - 50,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#1E201C',
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform: "uppercase",
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 15
    },
    scoreStyle: {
        color: '#E53935', // Par exemple, une couleur rouge pour le score
        fontWeight: 'bold',
    },
    highScores: {
        backgroundColor: '#f2f2f2',
        width: '80%',
        alignSelf: 'center',
        paddingVertical: 10,
    },
    flatListRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    flatListCol: {
        flex: 1,
        justifyContent: 'center',
    },
    leftCol: {
        width: '50%',
        textAlign: 'right',
        marginEnd: 5
    },
    rightCol: {
        width: '50%',
        textAlign: 'left',
        marginStart: 5
    },
    bottomButtonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly'
    }


})
