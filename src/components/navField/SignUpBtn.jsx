
import React from 'react'
import { withTranslation } from "react-i18next";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const SignUpBtn = ({t}) => {
    return (
        <Nav.Item className='ms-4 btn btn-outline-success'>
          <Link to="signup" className='text-decoration-none text-reset'>{t("navBar.signUpBtn")}</Link>
        </Nav.Item>
    )
};

export default withTranslation()(SignUpBtn);