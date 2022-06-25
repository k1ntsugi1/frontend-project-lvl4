
import React from 'react'
import {
    Routes,
    Route,
    Link,
    useLocation,
    Navigate
} from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import BtnsChgLng from '../components/navField/BtnsChgLng.jsx';

import SignInPage  from './SignInPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import ChatPage from './ChatPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import AboutProjectPage from './AboutProjectPage.jsx';

import SignUpBtn from '../components/navField/SignUpBtn.jsx';
import SignInBtn from '../components/navField/SignInBtn.jsx';
import SignInAs from '../components/navField/SignInAs.jsx';
import LogOutBtn from '../components/navField/LogOutBtn.jsx';

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


const App = ({t}) => {
  const currentActivePage = useSelector( (store) => store.uiNavBar.currentActivePage );
  const auth = useAuth();
  return (
    <div className='d-flex flex-column h-100'>
      <Navbar bg="light" className='shadow-sm rounded-3'>
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>

          <Nav className="me-auto">
            <Link to="about" className='d-flex align-self-center text-decoration-none text-reset'>{t("navBar.aboutProject")}</Link>
            <BtnsChgLng/>
          </Nav>

          { <SignInAs t={t}/> }

          <Nav>
            {(currentActivePage === 'signin' ) && <SignUpBtn t={t}/>}
            {(currentActivePage === 'signup') && <SignInBtn t={t}/>}
            {(currentActivePage === 'chat' ) && <LogOutBtn t={t}/>}
            {
              (currentActivePage === 'about') 
              ? auth.loggedIn 
                ? <LogOutBtn t={t}/> 
                :(
                  <>
                    <SignInBtn t={t}/>
                    <SignUpBtn t={t}/>
                  </>
                )
              : null
            }
          </Nav>
          
        </Container>
      </Navbar>
          
      <Routes>
        <Route path='/' element={(
          <PrivatRout>
            <ChatPage />
          </PrivatRout> 
        )}/>
        <Route path="login" element={ <SignInPage /> }/>
        <Route path="signup" element={ <SignUpPage /> }/>
        <Route path="about" element={ <AboutProjectPage /> }/>
        <Route path="*" element={ <NotFoundPage /> }/>
      </Routes>
    </div >
    )
}

export default withTranslation()(App)