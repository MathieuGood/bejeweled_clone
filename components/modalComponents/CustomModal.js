import React from 'react'
import { Modal, StyleSheet, Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import HighScoresModal from './ScoresModal'


export default function CustomModal({
    visible,
    changeModalVisible,
    type,
    navigation,
    route,
    resetGame,
    score,
    highScores
}) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => changeModalVisible(false)}
        >

            <BlurView
                style={styles.blur}
                tint='dark'
                intensity={20}
            >
                {/* Set content of modal regarding the type parameter : endGame, highScores, register or login */}
                {type === 'endGame'
                    // Modal for end game, display score and high scores
                    ? <HighScoresModal
                        changeModalVisible={changeModalVisible}
                        navigation={navigation}
                        route={route}
                        resetGame={resetGame}
                        score={score}
                        highScores={highScores}
                        endGame={true}
                    />
                    // Modal for high scores, display high scores only
                    : type === 'highScores'
                        ? <HighScoresModal
                            changeModalVisible={changeModalVisible}
                            highScores={highScores}
                            endGame={false}
                        />
                        : null
                }

            </BlurView>
        </Modal >
    )
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    blur: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    },
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
})