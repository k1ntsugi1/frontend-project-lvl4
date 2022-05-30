
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import store from '../slices/index.js';
import {
    Routes,
    Route,
    Link,
    useLocation,
    Navigate
} from "react-router-dom";

import { withTranslation } from 'react-i18next';
import { BtnsChgLng } from '../i18n/BtnsChgLng.jsx';
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
        ? <Button className="ms-4" variant="outline-success" onClick={auth.logOut}>{t("logOutBtn")}</Button> 
        : null
    )
}

const App = ({t, i18n}) => {

    return (
      <Provider store={store}>
        <AuthProvider>
        <div className='d-flex flex-column h-100'>
          <Navbar bg="light" className='shadow-sm'>
            <Container>
                <NavbarBrand as={Link} to="/">Chat</NavbarBrand>
                <NavbarCollapse id="changeLang" className='justify-content-end'>
                  <BtnsChgLng i18n={i18n}/>
                </NavbarCollapse>
                { <ButtonLogOut t={ t }/> }
            </Container>
          </Navbar>
          <div className='container-fluid h-100'>
            <Routes>
              <Route path='/' element={(
                <PrivatRout>
                  <ChatPage/>
                </PrivatRout> 
              )}/>
              <Route path="/login" element={ <SignIn/> }/>
              <Route path="*" element={ <NotFoundPage t={t}/> }/>
            </Routes>
          </div >
        </div>  
        </AuthProvider>
      </Provider>
    )
}

export default withTranslation()(App)