import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";   
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    // hooks?

    useEffect(() => {
       SecureStore.getItemAsync("access_token")
       .then(access_token => {
           console.log({access_token}, "<<< access_token");
           if(access_token) {
               setIsSignedIn(true);
           }
       }) 
    }, [])

    return <AuthContext.Provider value={{isSignedIn, setIsSignedIn}}>
        {children}
    </AuthContext.Provider>

}
