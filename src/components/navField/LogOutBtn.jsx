
import React from 'react'
import { withTranslation } from "react-i18next";
import { useAuth } from '../../hooks/index.jsx'
import { Nav, Button } from 'react-bootstrap';

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

export default withTranslation()(LogOutBtn);