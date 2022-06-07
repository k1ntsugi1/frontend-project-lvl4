
import React from 'react'
import Popup from 'reactjs-popup';
import { withTranslation } from 'react-i18next';
import { NavDropdown , Dropdown, Nav  } from 'react-bootstrap';

const BtnsChgLng = ({t, i18n}) => {

  const changeLang = (lang) => () => {
    i18n.changeLanguage(lang);
  }

  return (
        <Popup trigger={
            <NavDropdown  id="dropdownLangButtons" title={t("navBar.currentLang")} className="ms-2">
              <Dropdown.Item as="button"  onClick={ changeLang('ru') } className="text-start">
                <img src="https://cdn.icon-icons.com/icons2/45/PNG/64/russiaflag_flags_rusi_9144.png" width="20px" alt="fl-ru"/>
                {' '}Русский
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={ changeLang('en') } className="text-start">
              <img src="https://cdn.icon-icons.com/icons2/2087/PNG/512/united_kingdom_icon_127821.png" width="20px" alt="fl-en"/>
                {' '}English
              </Dropdown.Item>
            </NavDropdown >
            }  
                position='bottom left'
                on={['hover', 'focus']}
                contentStyle={
                  { 
                    margin: '0 0 0 9px',
                    padding: "2px 5px 2px 5px",
                    color: '#FFFFFF',
                    fontWeight: 400,
                    textAlign: 'center',
                    backgroundColor: '#4fb190',
                    borderRadius: '10px',
                  }
                            }
        >
          <span>{t("navBar.changeLang")}</span> 
        </Popup>
  )
}

export default withTranslation()(BtnsChgLng)