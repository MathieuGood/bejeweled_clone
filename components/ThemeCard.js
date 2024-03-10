// ThemeCard.js
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeCard = ({ iconName, title, onPress, isSelected, imageSource }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, isSelected && styles.cardSelected]}>
      {imageSource ? (
        <Image source={imageSource} style={styles.cardImage}/>
      ) : (
        <Icon name={iconName} size={48} color={'#757575'} />      )}
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '40%',
    aspectRatio: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'blue',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardSelected: {
    borderColor: 'red',
    borderWidth: 2, 
    padding: 5
   
  },
  cardText: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Assassin',
    fontSize: 20,
    color: '#e8b923',
  },
  cardImage: {
    width: '80%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default ThemeCard;
