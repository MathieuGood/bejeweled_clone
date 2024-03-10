import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TouchButton from '../TouchButton'
import IconButton from '../IconButton'; 
import HighScores from '../HighScores'
import CustomModal from './CustomModal'



export default function ScoresModal({
    changeModalVisible,
    visible,
    navigation,
    route,
    title,
    resetGame,
    score,
    endGame
}) {

    return (

        <CustomModal
            visible={visible}
            title={title}
            changeModalVisible={changeModalVisible}
        >

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

                    <IconButton
                        title="Back to menu"
                        iconName="home-outline"
                        press={() => {
                            changeModalVisible(false);
                            route.params
                                ? navigation.navigate('HomeScreen', { player_id: route.params.player_id, player_name: route.params.player_name })
                                : navigation.navigate('HomeScreen');
                        }}
                    />

                    <IconButton 
                        title="Restart game"
                        iconName="restart"
                        press={() => {
                            changeModalVisible(false);
                            resetGame();
                        }}
                    />

                </View>
                // If the modal is a highScores modal, display the button to close modal
                : <View style={{position:'absolute', top:-26, right:-37}}>
                    <IconButton 
                        iconName="close"
                        iconSize={39}
                        press={() => {
                            changeModalVisible(false);
                        }}
                    />

                </View>

            }
        </CustomModal>

    )
}



const styles = StyleSheet.create({
    scoreText: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 17
    },
    score: {
        color: '#E53935', 
        fontWeight: 'bold',
    },
    bottomButtonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    }
})
