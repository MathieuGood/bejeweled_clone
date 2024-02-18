import React from 'react'
import { Modal, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import TouchButton from './TouchButton'
import { BlurView } from 'expo-blur'


const windowWidth = Dimensions.get('window').width

const ModalScore = ({
    visible,
    changeModalVisible,
    navigation,
    routeParams,
    resetGame,
    title,
    score,
    highScores
}) => {
    const { player_id, player_name } = routeParams.params

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
                <View style={styles.modal}>
                    <Text style={styles.modalText}>{title}</Text>

                    <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 17 }}>
                        You scored <Text style={styles.scoreStyle}>{score}</Text> points.
                    </Text>

                    {/* TO DO : write function to render item correctly in Flatlist */}
                    <FlatList
                        data={highScores}
                        keyExtractor={(item, index) => `${item.rank}-${item.score}-${item.player_name}-${index}`}
                        renderItem={({ item }) => <Text>{item.rank} {item.score} {item.player_name}</Text>}
                        onEndReachedThreshold={0.5}
                    />

                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>

                        <TouchButton title="Restart game" press={() => {
                            changeModalVisible(false)
                            resetGame()
                        }} />

                        <TouchButton title="Back to menu" press={() => {
                            changeModalVisible(false)
                            navigation.navigate('PlayerScreen', { player_id: player_id, player_name: player_name })
                        }} />

                    </View>

                </View>

            </BlurView>
        </Modal>
    )
}


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
    }

})

export default ModalScore