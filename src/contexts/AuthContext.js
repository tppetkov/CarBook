import { createContext, useContext, useState } from "react";
import { auth } from "../firebase-config";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "@firebase/auth";

const initialAuthState = {
    email: "",
    accessToken: "",
    isAnonymous: true,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(initialAuthState);

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        }
    });

    const register = async (username, password) => {
        try {
            await createUserWithEmailAndPassword(auth, username, password);
        } catch (e) {
            console.log(e);
        }
    };

    const login = async (username, password) => {
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (e) {
            console.log(e);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.log(e);
        }
    };

    return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};
