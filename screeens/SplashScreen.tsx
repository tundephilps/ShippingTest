import React, { useEffect, useRef } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
  Splash: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Navigate to Login screen after animation completes
      navigation.replace("Login");
    });
  }, []);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#2F50C1"],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.Image
        source={require("../assets/images/icon.png")} // Replace with your logo path
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
