
import React from 'react'
import Popup from 'reactjs-popup';
import { withTranslation } from 'react-i18next';
import { Button, Dropdown  } from 'react-bootstrap';
import ButtonGroup from "react-bootstrap/ButtonGroup";

const BtnsChgLng = ({t, i18n}) => {

  const changeLang = (lang) => () => {
    i18n.changeLanguage(lang);
  }

  return (
      <Dropdown as={ButtonGroup}>

        <Popup trigger={
                  <Button variant='outline-info'>{t("navBar.currentLang")}</Button>
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
        <Dropdown.Toggle split variant="outline-info" id="dropdown-split" />

        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={ changeLang('ru') }>Русский</Dropdown.Item>
          <Dropdown.Item as="button" onClick={ changeLang('en') }>English</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
  )
}

export default withTranslation()(BtnsChgLng)
