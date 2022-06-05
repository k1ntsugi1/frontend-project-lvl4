
import React from 'react'
import Popup from 'reactjs-popup';
import { withTranslation } from 'react-i18next';
import { NavDropdown , Dropdown, Nav  } from 'react-bootstrap';
import ButtonGroup from "react-bootstrap/ButtonGroup";

const BtnsChgLng = ({t, i18n}) => {

  const changeLang = (lang) => () => {
    i18n.changeLanguage(lang);
  }

  return (
        <Popup trigger={
            <NavDropdown  id="dropdownLangButtons" title={t("navBar.currentLang")} className="ms-2">
              <Dropdown.Item as="button" onClick={ changeLang('ru') }>Русский</Dropdown.Item>
              <Dropdown.Item as="button" onClick={ changeLang('en') }>English</Dropdown.Item>
            </NavDropdown >
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
          <span>{t("navBar.changeLang")}</span> 
        </Popup>
  )
}

export default withTranslation()(BtnsChgLng)