import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import routes from "../config/routes";

const RequireAuth = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={routes.login} replace />;
    }
    return children;
};

export default RequireAuth;
