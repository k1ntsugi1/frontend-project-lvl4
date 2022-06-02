
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';


const CardBodySignInfield = ({children}) => {
    return (
        <Card.Body className='row p-5'>
            <div className='col d-flex align-items-center justify-content-center'>
				<img src="https://raw.githubusercontent.com/k1ntsugi1/layout-designer-project-lvl1/main/src/assets/images/2.png" className='img-fluid rounded-circle' alt="Enter"/>
			</div>
            {children}
        </Card.Body>
    )
}

export default CardBodySignInfield;