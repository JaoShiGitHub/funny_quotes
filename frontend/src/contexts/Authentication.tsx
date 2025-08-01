import React, { useEffect, useState, ReactNode, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the shape of the context value
interface AuthContextType {
    isAuthenticated: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
}

interface LoginData {
    username: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}


function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const checkAuth = async () => {
        try {
            const data = await axios.get("http://localhost:4000/user/info", {
                withCredentials: true,
            });
            console.log(data);
            setIsAuthenticated(true);
        } catch {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (data: LoginData) => {
        try {
            setIsAuthenticated(false);
            const response = await axios.post(
                "http://localhost:4000/auth/login",
                data,
                { withCredentials: true }
            );
            setIsAuthenticated(true);
            console.log("Login successful: ", response);
            navigate("/home");
        } catch (error: any) {
            console.log("Login error: ", error.message);
        }
    };


    const logout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/user/logout",
                {},
                { withCredentials: true }
            );
            setIsAuthenticated(false);
            console.log("Logout successful: ", response.data);
            navigate("/login");
        } catch (error) {
            console.log("Logout error: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };