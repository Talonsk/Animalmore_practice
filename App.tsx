/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, Text, useAnimatedValue, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function App(): React.JSX.Element {

  const leftAnim = useAnimatedValue(200);
  const rightAnim = useAnimatedValue(200);
  const textAnim = useAnimatedValue(400);
  const gradientAnim = useAnimatedValue(0);

  const logoEntrance = useCallback(() => {

    Animated.parallel([
      Animated.timing(leftAnim, {
        toValue: -5,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(rightAnim, {
        toValue: -60,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(textAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [leftAnim, rightAnim, textAnim]);

  const gradientScroll = useCallback(() => {
    Animated.loop(
        Animated.timing(gradientAnim, {
          toValue: 1125,
          duration: 25000,
          easing: Easing.linear,
          useNativeDriver: true,
        }), {iterations: 5000}
    ).start();
  }, [gradientAnim]);


  useEffect(() => {
    logoEntrance();
    gradientScroll();
  }, [logoEntrance, gradientScroll]);

  console.log(textAnim);

  return(
    <SafeAreaView style={styles.main_container}>
      <Animated.View
        style={[
          styles.gradient,
          {transform: [{translateY: gradientAnim}]},
        ]}
      >
        <LinearGradient
          colors={['#E73D59', '#FFA033', '#FFDB0C', '#BAD015', '#17C3B8']}
          style={
            [styles.gradient, {transform: [{translateY: 0}]}]
          }
        />
        <LinearGradient
          colors={['#E73D59', '#FFA033', '#FFDB0C', '#BAD015', '#17C3B8', '#E73D59']}
          style={[styles.gradient, {top: -225, transform: [{translateY: -910}]}]}
        />
      </Animated.View>

      <View style={styles.container}>
        <View style={styles.logo}>
          <Animated.Image
            source={require('./images/symb-dog.png')}
            style={[styles.logo_image, {right: rightAnim}]}
          />
          <Animated.Image
            source={require('./images/symb-cat.png')}
            style={[styles.logo_image, {left: leftAnim}]}
          />
        </View>
        <Animated.View
          style={{
            transform: [{translateY: textAnim}],
        }}
        >
          <Text style={styles.header}>
            animalmore
          </Text>
          <Text style={styles.description}>сервисы для ваших питомцев</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container:{
    flex: 1,
  },
  gradient:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    marginTop: 40,
  },
  header:{
    fontSize: 50,
    fontFamily: 'Nunito-ExtraBold',
    color: '#343434',
  },
  description:{
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
    color: '#343434',
  },
  logo:{
    position: 'relative',
    flexDirection: 'row',
    height: 250,
  },
  logo_image:{
    position: 'absolute',
  },
});

export default App;
