import { useState } from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Menu from "../dashboard/menu/Menu";

const Guard = () => {
    const token = localStorage.getItem('token');
    const [authenticated, setAuthenticated] = useState('');
    const urlLocation = useLocation();

    useEffect(() => {
        const reqToken = async () => {
            try {
                const sendToken = await axios.get('https://remove-net.onrender.com/verifyToken', { headers: { 'Authorization': token } });
                setAuthenticated(sendToken.data);
            }
            catch (err) {
                setAuthenticated(false);
            };
        };
        if (token) {
            reqToken();
        }
    }, []);

    if (!token) {
        return <Navigate to="/" replace state={{ path: urlLocation.pathname }} />;
    }

    if (authenticated === false) {
        return <Navigate to="/" replace state={{ path: urlLocation.pathname }} />;
    }
    
    return (
        <>
            {authenticated ? <Menu /> : null}
        </>
    )
};

export default Guard;