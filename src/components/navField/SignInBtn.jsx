
import React from 'react'
import { withTranslation } from "react-i18next";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const SignInBtn = ({t}) => {
    return (
        <Nav.Item className='ms-4 btn btn-outline-success'>
          <Link to="login" className=' text-decoration-none text-reset'>{t("navBar.signInBtn")}</Link>
        </Nav.Item>
    )
};

export default withTranslation()(SignInBtn);