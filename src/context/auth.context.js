import { useEffect, createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { LoadingContext } from "./loading.context";
import { get } from '../services/authService'

const AuthContext = createContext();

function AuthProvider({ children }) {
    const { setIsLoading, setUser } = useContext(LoadingContext)
    const navigate = useNavigate()
    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
        
            get('/auth/verify')
                .then((response) => {
        
                    console.log("user", response.data)
        
                    const user = response.data;
        

                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setUser(null);
                    removeToken();
                });
        } else {
            setIsLoading(false);
            setUser(null);
        }
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();

        navigate('/')
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ storeToken, authenticateUser, logOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext };