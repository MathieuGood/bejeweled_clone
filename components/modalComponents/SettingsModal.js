import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import TouchButton from '../TouchButton'
import TextField from '../TextField'
import Header from '../Header'
import CustomModal from './CustomModal'
import AppContext from '../../providers/AppContext'

export default function SettingsModal({
    changeModalVisible,
    visible,
    title,
    navigation
}) {

    const { theme, setTheme } = useContext(AppContext)


    return (
        <CustomModal
            visible={visible}
            title={title}
            changeModalVisible={changeModalVisible}
        >
            {/* <View style={styles.mainContainer}> */}
                <View style={styles.form}>

                    <Header style={styles.header} title='Theme' />

                    <TouchButton
                        title='Detailed'
                        press={() => {
                            setTheme('detailed')

                        }}
                    />

                    <TouchButton
                        title="Flat Design"
                        press={() => {
                            setTheme('flatDesign')
                            navigation.navigate('HomeScreen')
                            console.log('Changed to flatDesign')
                            console.log(theme)

                        }}
                    />




                </View>
            {/* </View> */}

            <TouchButton
                title="Close"
                press={() => {
                    changeModalVisible(false)
                }}
            />

        </CustomModal>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',},
    form: {
        // Center the form relativaly to the screen
    
        justifyContent: 'center',

        alignItems: 'center',
        backgroundColor: 'rgba(244, 232, 193, 0.8)',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#d4af37', // Doré
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    }
})
