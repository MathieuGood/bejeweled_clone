import React, { useContext } from 'react'
import SubHead from '../SubHead'
import CustomModal from './CustomModal'
import AppContext from '../../providers/AppContext'
import IconButton from '../IconButton'

import {Text, View, StyleSheet} from 'react-native';
import { appThemes } from '../../themes/appThemes'
import ThemeCard from '../ThemeCard'



export default function SettingsModal({
    changeModalVisible,
    visible,
    title,
    navigation,
    route
}) {

    const { theme, setTheme } = useContext(AppContext)
    const Image1 = appThemes.backgrounds.detailed.HomeScreen
    const Image2 = appThemes.backgrounds.flatDesign.HomeScreen


    return (
        <CustomModal
            visible={visible}
            title={title}
            changeModalVisible={changeModalVisible}
        >

            <SubHead title='Theme'/>

            <Text style={styles.chooseThemeMessage}>
               Please select a theme to customize your experience.
            </Text>

            <View >
                <ThemeCard
                    iconName="image-plus"
                    title='Jewels'               
                    onPress={() => {
                        setTheme('detailed')}}
                    isSelected={theme === 'detailed'}
                    imageSource={Image1}
                />

            
                <ThemeCard
                    iconName="image-plus"
                    title="Pyramid of Giza"              
                    onPress={() => {
                        navigation.navigate('HomeScreen', { player_id: route.params.player_id, player_name: route.params.player_name })
                        setTheme('flatDesign')
                    }}
                    isSelected={theme === 'flatDesign'}
                    imageSource={Image2}
                />

                    <ThemeCard
                    iconName="image-plus"
                    title="Upload Image"
                    onPress={() => {
                        addImage()}}
                    isSelected={theme === 'customImage'}
                    />
    
              </View>

              <View style={{position:'absolute', top:-26, right:-37}}>
                        <IconButton 
                            iconName="close"
                            iconSize={39}
                            press={() => {
                                changeModalVisible(false);
                            }}
                        />

            </View>
        </CustomModal>
    )

}
const styles = StyleSheet.create({
      chooseThemeMessage: {
        textAlign: 'center',
        fontSize: 20, 
        color: '#757575', 
        paddingHorizontal: 5, 
        fontFamily:'Assassin'
      }
  })
  