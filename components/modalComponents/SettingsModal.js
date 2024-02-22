import React, { useContext } from 'react'
import TouchButton from '../TouchButton'
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

                    <Header title='Theme' />

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

            <TouchButton
                title="Close"
                press={() => {
                    changeModalVisible(false)
                }}
            />

        </CustomModal>
    )

}
