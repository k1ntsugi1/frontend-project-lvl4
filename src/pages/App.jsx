
import React, { useEffect, useState } from 'react'

import {
    Routes,
    Route,
    Link,
    useLocation,
    Navigate
  } from "react-router-dom";

import { withTranslation } from 'react-i18next';

import { Button, Container, NavbarBrand, Navbar } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

import { ChatPage } from './ChatPage.jsx'
import SignIn  from './SignIn.jsx'
import { NotFoundPage } from './NotFoundPage.jsx'

import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({children}) => {

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
}

const PrivatRout = ({children}) => {
    const auth = useAuth();
    const location = useLocation()
    return (
             auth.loggedIn 
             ? children 
             : <Navigate to='/login' state={{ from: location }} /> 
    )
}

const ButtonLogOut = (props) => {
    const { t } = props;
    const auth = useAuth();
    return (
        auth.loggedIn 
        ? <Button variant="primary" onClick={auth.logOut}>{t("logOutBtn")}</Button> 
        : null
    )
}

const App = ({t, i18n}) => {
    const changeLang = (lang) => () => {
        i18n.changeLanguage(lang);
      }
    return (
        <AuthProvider>
            <Navbar bg="light">
                <Container>
                    <NavbarBrand as={Link} to="/">Chat</NavbarBrand>
                    <NavbarCollapse id="changeLang" className='justify-content-end'>
                        <Button variant="outline-info" onClick={ changeLang('ru') }>Ru</Button>
                        <Button variant="outline-info" onClick={ changeLang('en') } >En</Button>
                        { <ButtonLogOut t={ t }/> }
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <div className='h-100'>
                <Routes>
                    <Route path='/' element={(
                        <PrivatRout>
                            <ChatPage/>
                        </PrivatRout> 
                    )}/>
                    <Route path="/login" element={ <SignIn/> }/>
                    <Route path="*" element={ <NotFoundPage/> }/>
                </Routes>
            </div >
        </AuthProvider>
    )
}

export default withTranslation()(App)