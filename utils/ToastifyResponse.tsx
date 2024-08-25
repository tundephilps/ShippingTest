import React from 'react';
import Toast from 'react-native-toast-message';

const sendResponse = (response: any) => {
    const { status, message } = response;
    Toast.show({
        type : status,
        text1 : status,
        text2 : message
    });
};


const ShowResponse = () => {

    return (
        <>
            <Toast/>
        </>
    );
};

export {
    sendResponse,
    ShowResponse
}