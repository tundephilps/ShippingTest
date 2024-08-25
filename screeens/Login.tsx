import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";

import RBSheet, { RBSheetRef } from "react-native-raw-bottom-sheet";
import Entypo from "@expo/vector-icons/Entypo";

import { ShowResponse } from "@/utils/ToastifyResponse";
import useLogin from "@/hooks/useLogin"; 


const Login = () => {
  const { isLoading, inputs, handleInput, handleLogin } = useLogin();

  const bottomSheetRef = useRef<RBSheetRef>(null);


  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };


  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={{
          height: 36,
          width: 207,
          borderRadius: 99,
          alignSelf: "center",
        }}
        source={require("../assets/images/Logo.png")}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={{ width: "100%", top: "40%" }}
        onPress={handleOpenBottomSheet}
      >
        <View
          style={{
            backgroundColor: "#ffffff", // Background color
            marginTop: 6, // Margin top
            height: 56,

            paddingHorizontal: 18,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16, // Font size
              color: "#007AFF", // Text color
              fontWeight: "800",
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={bottomSheetRef}
        height={650} // Height of the BottomSheet
        // closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          draggableIcon: {
            backgroundColor: "#000", // Color of the draggable icon
          },
        }}
      >
        <View style={styles.sheetContent}>
          <TouchableOpacity
            style={styles.sheetHeader}
            onPress={handleCloseBottomSheet}
          >
            <View>
              <Entypo name="chevron-thin-left" size={24} color="#007BFF" />
            </View>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Login</Text>
          <Text style={{ fontSize: 17, color: "#757281", paddingBottom: 24 }}>
            Please enter your First, Last name and your phone number in order to
            register
          </Text>
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused, // Apply focused styles
            ]}
            placeholderTextColor="#757281" // Optional: Change placeholder color if needed
            secureTextEntry
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)} // Set focus state to false
            placeholder="URL"
            keyboardType="url"
          />
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused, // Apply focused styles
            ]}
            placeholderTextColor="#757281" // Optional: Change placeholder color if needed
            secureTextEntry
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)} // Set focus state to false
            placeholder="Username / Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={ inputs.usr }
            onChangeText={ (value) => handleInput("usr", value) }

          />
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused, // Apply focused styles
            ]}
            placeholder="Password"
            placeholderTextColor="#757281" // Optional: Change placeholder color if needed
            secureTextEntry
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)} // Set focus state to false
            onChangeText={ (value) => handleInput("pwd", value) }
            value={ inputs.pwd }
          />
          <TouchableOpacity
            style={[styles.loginButton, !inputs.usr || !inputs.pwd ? styles.loginButtonDisabled : {}]}
            onPress={ handleLogin }
            // onPressIn={handleCloseBottomSheet}
          >
            {isLoading ? <ActivityIndicator color="#fff"/> : <Text style={ styles.loginButtonText }>Login</Text>}
          </TouchableOpacity>
        </View>
        <ShowResponse/>

      </RBSheet>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    flex: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  sheetContent: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cancel: {
    color: "#4561db",
    fontSize: 22,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    height: 56,
    backgroundColor: "#f4f2f8",

    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: "#2f50c1", // Blue border color when
    borderWidth: 1,
    color: "#2f50c1", // Blue text color when focused
  },
  loginButton: {
    backgroundColor: "#2f50c1",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    top: "25%",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  loginButtonDisabled : {
    opacity : 0.6
  }
});
