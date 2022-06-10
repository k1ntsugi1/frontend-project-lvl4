
import React from 'react';
import { Card } from 'react-bootstrap';
import SignUpImg from '../../myAssets/img/satelline.png'
import SignInImg from '../../myAssets/img/rocket.png'; 

const CardBodyField = ({children, typeOfImg}) => {
    const currentImg = typeOfImg === 'signUp' ? SignUpImg : SignInImg;
    return (
        <Card.Body className='row p-5'>
            <div className='col d-flex align-items-center justify-content-center'>
				<img src={currentImg} className='img-fluid rounded-circle' alt="LogoOfEntiring"/>
			</div>
            {children}
        </Card.Body>
    )
}

export default CardBodyField;