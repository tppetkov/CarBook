import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(navigate("/"));
    }, [logout, navigate]);

    return null;
};

export default Logout;
