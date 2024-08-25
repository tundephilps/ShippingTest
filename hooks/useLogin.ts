import React from "react";
import { useNavigation } from "@react-navigation/native";
import APIRequest from "@/utils/APIRequest";
import { sendResponse } from "@/utils/ToastifyResponse";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppContext } from "@/context/AppContext";

type RootStackParamList = {
    Login: undefined;
    Homepage: undefined;
}


type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Homepage"
>

const useLogin = () => {
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ inputs, setInputs ] = React.useState({
        usr : "",
        pwd : ""
    })

    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { setIsLoggedIn } = React.useContext(AppContext);

    const handleLogin = async () => {
        setIsLoading(true);

        if(!inputs.usr) {
            sendResponse({
                status : "error",
                message : "Enter your email adderess"
            })
        } else if(!inputs.pwd) {
            sendResponse({
                status : "error",
                message : "Enter your password"
            })
        } else {
            const response = await APIRequest({
                url : "https://shippex-demo.bc.brandimic.com/api/method/login",
                data : inputs,
                isJSON : false
            })
    
            if(response.statusCode === 200){
                setIsLoggedIn(true);
                navigation.replace("Homepage");
            } else {
                sendResponse({
                    status : "error",
                    message : "Incorrect login details"
                })
            }
        }

        setIsLoading(false);
    }

    const handleInput = (field : string, value : string) => {
        setInputs(prev => ({
            ...prev,
            [field] : value
        }))
    }

    return {
        isLoading,
        inputs,
        handleInput,
        handleLogin
    }
}

export default useLogin;