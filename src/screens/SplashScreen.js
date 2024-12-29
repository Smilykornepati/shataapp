import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Multiple animation values for complex sequence
  const mainScale = useRef(new Animated.Value(0.8)).current;
  const mainOpacity = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;
  const slideValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Enhanced animation sequence
    const animate = () => {
      Animated.sequence([
        // Stage 1: Initial reveal with scale and fade
        Animated.parallel([
          Animated.timing(mainOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(mainScale, {
            toValue: 1.1,
            tension: 15,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(slideValue, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),

        // Stage 2: Subtle bounce effect
        Animated.spring(bounceValue, {
          toValue: 1,
          tension: 20,
          friction: 6,
          useNativeDriver: true,
        }),

        // Stage 3: Branding pause
        Animated.delay(800),

        // Stage 4: Elegant exit
        Animated.parallel([
          Animated.timing(mainOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(mainScale, {
            toValue: 1.2,
            tension: 15,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Changed from 'Home' to 'ServiceSelection'
        navigation.replace('ServiceSelection');
      });
    };

    // Start with a professional pause
    const timer = setTimeout(animate, 300);
    return () => clearTimeout(timer);
  }, [navigation, mainOpacity, mainScale, bounceValue, slideValue]);

  // Combined animation values for smooth transitions
  const combinedScale = Animated.multiply(
    mainScale,
    bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    })
  );

  const translateY = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: mainOpacity,
            transform: [
              { scale: combinedScale },
              { translateY },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: width * 0.38,
    height: width * 0.38,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;