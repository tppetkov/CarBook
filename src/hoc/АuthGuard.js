import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const AuthGuard = ({ children }) => {
    const { user } = useAuthContext();
    return !user.isAnonymous ? children : <Navigate to='/login' />;
};

export default AuthGuard;
