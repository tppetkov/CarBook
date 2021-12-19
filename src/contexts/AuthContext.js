import { createContext, useContext, useEffect } from "react";
import { auth } from "../firebase-config";
import useLocalStorage from "../hooks/useLocalStorage";
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
    const [user, setUser] = useLocalStorage("user", initialAuthState);

    useEffect(() => {
        return onAuthStateChanged(auth, (currentUser) => {
            currentUser ? setUser(currentUser) : setUser(initialAuthState);
        });
    }, [setUser]);

    const register = async (username, password) => await createUserWithEmailAndPassword(auth, username, password);

    const login = async (username, password) => await signInWithEmailAndPassword(auth, username, password);

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
