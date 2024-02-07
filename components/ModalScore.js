import React from 'react'
import { Modal, StyleSheet, Text, View, Dimensions } from 'react-native'
import TouchButton from './TouchButton'
import { BlurView } from 'expo-blur'



const Width = Dimensions.get('window').width
const ModalScore = ({ visible, changeModalVisible, navigation, resetGame, score }) => {


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => changeModalVisible(false)}
        >
            <BlurView
                style={Styles.blur}
                tint='dark'
                intensity={20}
            >
                <View style={Styles.modal}>
                    <Text style={Styles.modalText}>Leaderboard</Text>

                    <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 17 }}>
                        Your score is <Text style={Styles.scoreStyle}>{score}</Text> points.
                    </Text>

                    {/* logique  pour afficher la Flatlist des meilleurs scores */}

                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>

                        <TouchButton title="Restart" press={() => {
                            changeModalVisible(false);
                            resetGame();
                        }} />

                        <TouchButton title="Quit" press={() => {
                            changeModalVisible(false);
                            navigation.navigate('PlayerScreen') //provisoirement retour à cette page
                        }} />

                    </View>



                </View>

            </BlurView>
        </Modal>
    )


}

const Styles = StyleSheet.create({
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
        width: Width - 50,
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
    }

})

export default ModalScore;