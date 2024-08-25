import Login from "@/screeens/Login";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SplashScreen from "@/screeens/SplashScreen";
import Shipment from "@/screeens/TabScreens/Shipment";
import { Profiler } from "react";
import Profile from "@/screeens/TabScreens/Profile";
import Scan from "@/screeens/TabScreens/Scan";
import Wallet from "@/screeens/TabScreens/Wallet";
import AppContextProvider from "@/context/AppContext";
import { ShowResponse } from "@/utils/ToastifyResponse";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Homepage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        let iconName;

        if (route.name === "Shipment") {
          iconName = require("../../assets/images/Tab1.png");
        } else if (route.name === "Scan") {
          iconName = require("../../assets/images/Tab2.png");
        } else if (route.name === "Wallet") {
          iconName = require("../../assets/images/Tab3.png");
        } else if (route.name === "Profile") {
          iconName = require("../../assets/images/Tab4.png");
        }

        return (
          <View style={{ alignItems: "center" }}>
            <Image
              source={iconName}
              style={{
                width: 28,
                height: 27,
                margin: 2,
                tintColor: focused ? "#2F50C1" : "#8e8e8e",
              }}
            />
            <Text style={{ color: focused ? "#2F50C1" : "#8e8e8e" }}>
              {route.name}
            </Text>
          </View>
        );
      },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name="Shipment" component={Shipment} />
    <Tab.Screen name="Scan" component={Scan} />
    <Tab.Screen name="Wallet" component={Wallet} />

    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default function HomeScreen() {
  return (
    <AppContextProvider>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Homepage" component={Shipment} /> */}

        <Stack.Screen name="Homepage" component={TabNavigator} />
      </Stack.Navigator>
      <ShowResponse/>
    </AppContextProvider>
   
  );
}

const styles = StyleSheet.create({});
