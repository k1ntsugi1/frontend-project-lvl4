
import React from 'react';
import { Card } from 'react-bootstrap';
import rocketImg from '../../img/rocket.jpg'

const CardBodyField = ({children, imagePath}) => {
    return (
        <Card.Body className='row p-5'>
            <div className='col d-flex align-items-center justify-content-center'>
				<img src={rocketImg} className='img-fluid rounded-circle' alt="Enter"/>
			</div>
            {children}
        </Card.Body>
    )
}

export default CardBodyField;