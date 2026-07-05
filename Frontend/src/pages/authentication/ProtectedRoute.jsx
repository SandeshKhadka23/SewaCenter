import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isLoggedIn = false; // Replace later

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;