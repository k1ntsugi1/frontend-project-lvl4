
import React from 'react'
import {
    Routes,
    Route,
    Link,
    useLocation,
    Navigate
} from "react-router-dom";
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import BtnsChgLng from '../components/BtnsChgLng.jsx';

import SignInPage  from './SignInPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import ChatPage from './ChatPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import AboutAuthorPage from './AboutAuthorPage.jsx';

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
      <Navbar.Text>
        {t('navBar.signedInAs')} {username}
      </Navbar.Text>
  )
}

const LogOutBtn = ({t}) => {
  const auth = useAuth();
  return (
    auth.loggedIn 
    ? (
        <Nav.Item className='ms-4'>
          <Button variant="outline-success" onClick={auth.logOut}>{t("navBar.logOutBtn")}</Button>
        </Nav.Item>
      ) 
    : null
  )
};

const SignInBtn = ({t}) => {
  return (
      <Nav.Item className='btn btn-outline-success ms-4'>
        <Link to="login" className=' text-decoration-none text-reset'>{t("navBar.signInBtn")}</Link>
      </Nav.Item>
  )
}

const SignUpBtn = ({t}) => {
  return (
      <Nav.Item className='btn btn-outline-success ms-4'>
        <Link to="signup" className='text-decoration-none text-reset'>{t("navBar.signUpBtn")}</Link>
      </Nav.Item>
  )
}

const App = ({t}) => {
  const currentActivePage = useSelector( (store) => store.uiNavBar.currentActivePage );

  return (
    <div className='d-flex flex-column h-100'>
      <Navbar bg="light" className='shadow-sm rounded-3'>
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>

          <Nav className="me-auto">
            <Link to="about" className='d-flex align-self-center text-decoration-none text-reset'>{t("navBar.aboutAuthor")}</Link>
            <BtnsChgLng/>
          </Nav>

          { <SignInAs t={t}/> }

          <Nav>
            {(currentActivePage === 'signin' ) && <SignUpBtn t={t}/>}
            {(currentActivePage === 'signup') && <SignInBtn t={t}/>}
            {(currentActivePage === 'chat' ) && <LogOutBtn t={t}/>}
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
        <Route path="about" element={ <AboutAuthorPage /> }/>
        <Route path="*" element={ <NotFoundPage /> }/>
      </Routes>
    </div >
    )
}

export default withTranslation()(App)