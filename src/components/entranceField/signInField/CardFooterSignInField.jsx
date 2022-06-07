
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const CardFooterSignInField = ({t}) => {
    return (
    <Card.Footer>
        <div className='text-center'>
           <span>{t("signInForm.footer.labelSignUp")}</span>{' '}
           <Link to="/signup" className='link-success'>{t("signInForm.footer.hrefToSignUp")}</Link>
       </div>
   </Card.Footer>
    )
};

export default withTranslation()(CardFooterSignInField);