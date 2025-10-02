import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async ()=>{
        if (location.pathname === '/user/login' || location.pathname === '/user/register') {
                setLoading(false);
                return;
        }
            try{
                const res = await axios.get('http://localhost:3000/api/user/me',{
                    withCredentials: true
                });
                setUser(res.data.user)
            }catch(err){
                setUser(null)
            } finally{
                setLoading(false)
            }
        }
        fetchUser()
    }, [location.pathname])

    const login = (userData) =>{
        setUser(userData)
    }

    const logout = async () => {
        try {
        await axios.get("http://localhost:3000/api/auth/user/logout", {
            withCredentials: true,
        });
        localStorage.removeItem("user");
        navigate("/user/login");
        } catch (err) {
        console.error("Logout failed:", err.response?.data || err.message);
        }
    };
    
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)