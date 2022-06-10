
import React from 'react'
import { withTranslation } from "react-i18next";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const SignInBtn = ({t}) => {
    return (
        <Nav.Item className='btn btn-outline-success ms-4'>
          <Link to="login" className=' text-decoration-none text-reset'>{t("navBar.signInBtn")}</Link>
        </Nav.Item>
    )
};

export default withTranslation()(SignInBtn);