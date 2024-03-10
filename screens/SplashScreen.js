import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen({navigation}) {

  const handleAnimationFinish = () => {

    navigation.navigate('HomeScreen');
  };

  return (

    <View style={styles.container}>
      <LottieView
        style={{ flex: 1, width: '100%' }}
        source={require('../assets/Animations/lottie.json')} 
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
