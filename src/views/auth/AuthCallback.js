import {useEffect} from "react";
import {useHistory} from "react-router-dom";

const AuthCallback = () => {
    const history = useHistory();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        console.log("AuthCallback triggered");
        console.log("Token from URL:", token);

        if (token) {
            localStorage.setItem("token", token);
            console.log("Token saved to localStorage");
            history.push("/dashboard");
        } else {
            console.warn("No token found in URL");
            history.push("/auth/login");
        }
    }, [history]);

    return <p>Logging you in...</p>;
};

export default AuthCallback;
