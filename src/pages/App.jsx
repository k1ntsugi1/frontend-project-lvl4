
import React, { useEffect, useState } from 'react'
import {
    Routes,
    Route,
    Link,
    useLocation,
    Navigate
} from "react-router-dom";
import { Button, Container, NavbarBrand, Navbar, Nav } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { withTranslation } from 'react-i18next';

import BtnsChgLng from '../components/BtnsChgLng.jsx';

import SignInPage  from './SignInPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import ChatPage from './ChatPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import { useAuth } from '../hooks/index.jsx';

const PrivatRout = ({children}) => {
  const auth = useAuth();
  const location = useLocation()
  return (
    auth.loggedIn 
    ? children 
    : <Navigate to='/login' state={{ from: location }} /> 
  )
}

const SignInAs = ({t}) => {
  const auth = useAuth();
  if (!auth.loggedIn) return null;
  const userId = JSON.parse(localStorage.getItem('userId'));
  const username = userId.username; 
  return (
      <Navbar.Collapse id="signInAs" className="justify-content-start">
        <Navbar.Text>
          {t('navBar.signedInAs')} {username}
        </Navbar.Text>
      </Navbar.Collapse>
  )
}

const LogOutBtn = ({t}) => {
  const auth = useAuth();
  return (
    auth.loggedIn 
    ? (
      <Nav className='justify-content-end ms-4 '>
        <Nav.Item>
          <Button  variant="outline-success" onClick={auth.logOut}>{t("navBar.logOutBtn")}</Button>
        </Nav.Item>
      </Nav>
      ) 
    : null
  )
};

const SignInBtn = ({t}) => {
  return (
    <Nav className='justify-content-end ms-3'>
      <Nav.Item className='btn btn-outline-success'>
        <Link to="login" className=' text-decoration-none text-reset'>{t("navBar.signInBtn")}</Link>
      </Nav.Item>
    </Nav>
  )
}

const SignUpBtn = ({t}) => {
  return (
    <Nav className='justify-content-end ms-3'>
      <Nav.Item className='btn btn-outline-success'>
        <Link to="signup" className='text-decoration-none text-reset'>{t("navBar.signUpBtn")}</Link>
      </Nav.Item>
    </Nav>
  )
}

const App = ({t}) => {

  const [currentLocation, setNewAdditionalNavBtn] = useState('signin');

  return (
    <div className='d-flex flex-column h-100'>
      <Navbar bg="light" className='shadow-sm'>
        <Container>
          
          <NavbarBrand as={Link} to="/">Hexlet Chat</NavbarBrand>
          <Nav className='justify-content-start me-3'>
            <Nav.Item className='btn btn-outline-success'>
              <Link to="about" className='text-decoration-none text-reset'>{t("navBar.aboutUs")}</Link>
            </Nav.Item>  
          </Nav>

          { <SignInAs t={t}/>}

          <NavbarCollapse id="changeLang" className='justify-content-end'>
            <BtnsChgLng/>
          </NavbarCollapse>

          {(currentLocation === 'signin') && <SignUpBtn t={t}/>}
          {(currentLocation === 'signUp') && <SignInBtn t={t}/>}
          {(currentLocation === 'chat') && <LogOutBtn t={t}/>}

        </Container>
      </Navbar>
          
      <Routes>
        <Route path='/' element={(
          <PrivatRout>
            <ChatPage setNewAdditionalNavBtn={setNewAdditionalNavBtn}/>
          </PrivatRout> 
        )}/>
        <Route path="login" element={ <SignInPage setNewAdditionalNavBtn={setNewAdditionalNavBtn}/> }/>
        <Route path="signup" element={ <SignUpPage setNewAdditionalNavBtn={setNewAdditionalNavBtn}/> }/>
        <Route path="*" element={ <NotFoundPage setNewAdditionalNavBtn={setNewAdditionalNavBtn}/> }/>
      </Routes>
    </div >
    )
}

export default withTranslation()(App)