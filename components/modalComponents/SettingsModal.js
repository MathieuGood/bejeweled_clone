import React, { useContext } from 'react'
import TouchButton from '../TouchButton'
import Header from '../Header'
import CustomModal from './CustomModal'
import AppContext from '../../providers/AppContext'

export default function SettingsModal({
    changeModalVisible,
    visible,
    title,
    navigation,
    route
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
                    navigation.navigate('HomeScreen', { player_id: route.params.player_id, player_name: route.params.player_name })
                    setTheme('flatDesign')
                    console.log('Changed to flatDesign')
                }}
            />

            <TouchButton
                title='Upload custom images'
                press={() => { addImage() }}
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
