
import React from 'react'
import { Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';

export const BtnsChgLng = ({i18n}) => {

  const changeLang = (lang) => () => {
    i18n.changeLanguage(lang);
  }

  return (
    <div className="btn-group mr-2" role="group" aria-label="Buttons language changing">
      <Popup trigger={
         <Button variant="outline-info" onClick={ changeLang('ru') }>Ru</Button>
      }
             position='bottom right'
             on={['hover', 'focus']}
             contentStyle={{ marginTop: '2px',
                             padding: "2px",
                             color: '#00022f',
                             textAlign: 'center',
                             backgroundColor: '#e8e8e8',
                             borderRadius: '10px',
                             opacity: '90%' }}>
        <span>Сменить язык на Русский</span>              
      </Popup>
      <Popup trigger={
         <Button variant="outline-info" onClick={ changeLang('en') } >En</Button>
      }
             position='bottom right'
             on={['hover', 'focus']}
             contentStyle={{ marginTop: '2px',
                             padding: "2px",
                             color: '#00022f',
                             textAlign: 'center',
                             backgroundColor: '#e8e8e8',
                             borderRadius: '10px',
                             opacity: '90%' }}>
        <span>Change Language on English</span>             
      </Popup>
    </div>
  )
}