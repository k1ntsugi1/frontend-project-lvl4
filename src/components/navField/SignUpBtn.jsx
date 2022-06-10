
import React from 'react'
import { withTranslation } from "react-i18next";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const SignUpBtn = ({t}) => {
    return (
        <Nav.Item className='btn btn-outline-success ms-4'>
          <Link to="signup" className='text-decoration-none text-reset'>{t("navBar.signUpBtn")}</Link>
        </Nav.Item>
    )
};

export default withTranslation()(SignUpBtn);