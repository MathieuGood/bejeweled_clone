import React from "react"
import { Button } from "react-native-elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { View, Text } from "react-native"

const IconButton = ({
	press,
	iconName,
	iconSize = 40,
	iconColor = "#2b50c8",
	title,
	titleColor = "#2b50c8"
}) => {
	return (
		<Button
			onPress={press}
			buttonStyle={{ marginHorizontal: 10, paddingHorizontal: 10 }}
			title={
				<View style={{ alignItems: "center" }}>
					<Icon
						name={iconName}
						size={iconSize}
						color={iconColor}
						justifyContent="center"
					/>
					<Text style={{ color: titleColor, fontWeight: "bold", marginTop: 5 }}>
						{title}
					</Text>
				</View>
			}
			type="clear"
		/>
	)
}

export default IconButton
