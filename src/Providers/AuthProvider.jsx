
import React , { useState} from 'react';
import { AuthContext } from '../contexts/index.jsx';

export const AuthProvider = ({children}) => {
    const userId = JSON.parse(localStorage.getItem('userId')) ?? false;
    const startState = (userId && userId.token) ? true : false; 
    const [loggedIn, setLoggetIn] = useState(startState);
  
    const logIn = () => setLoggetIn(true);
    const logOut = () => {
        localStorage.removeItem('userId');
        setLoggetIn(false);
    }
  
    return (
        <AuthContext.Provider value={ {loggedIn, logIn, logOut} }>
            { children }
        </AuthContext.Provider>
    )
  };