import React from "react";

type contextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void; 
}

export const AppContext = React.createContext<contextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

const AppContextProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const contextValue = {
        isLoggedIn,
        setIsLoggedIn,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
