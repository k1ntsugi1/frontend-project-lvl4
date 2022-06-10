
import React from 'react'
import { withTranslation } from "react-i18next";
import { useAuth } from '../../hooks/index.jsx'
import { Navbar } from 'react-bootstrap';

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

export default withTranslation()(SignInAs)