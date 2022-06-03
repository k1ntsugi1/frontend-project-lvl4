
import React from 'react'
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

const ButtonLogOut = (props) => {
  const { t } = props;
  const auth = useAuth();
  return (
    auth.loggedIn 
    ? <Button className="ms-4" variant="outline-success" onClick={auth.logOut}>{t("logOutBtn")}</Button> 
    : null
  )
}

const App = ({t}) => {
  const userId = JSON.parse(localStorage.getItem('userId')) ?? false;
  const username = (userId && userId.username) ? userId.username : null; 
    return (
      <div className='d-flex flex-column h-100'>
        <Navbar bg="light" className='shadow-sm'>
          <Container>
            <NavbarBrand as={Link} to="/">Hexlet Chat</NavbarBrand>
            <Nav className='justify-content-start me-3'>
              <Nav.Link href="/about">{t("navBar.aboutUs")}</Nav.Link>
            </Nav>

            { username &&
              <Navbar.Collapse id="signInAs" className="justify-content-start">
                <Navbar.Text>
                  {t('navBar.signedInAs')} {username}
                </Navbar.Text>
              </Navbar.Collapse>
            }

            <NavbarCollapse id="changeLang" className='justify-content-end'>
              <BtnsChgLng/>
            </NavbarCollapse>
            { <ButtonLogOut t={ t }/> }
          </Container>
        </Navbar>
          
        <Routes>
          <Route path='/' element={(
            <PrivatRout>
              <ChatPage/>
            </PrivatRout> 
          )}/>
          <Route path="/login" element={ <SignInPage/> }/>
          <Route path="/signup" element={ <SignUpPage /> }/>
          <Route path="*" element={ <NotFoundPage /> }/>
        </Routes>
      </div >
    )
}

export default withTranslation()(App)