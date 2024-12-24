import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Token kontrolü
    return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;
