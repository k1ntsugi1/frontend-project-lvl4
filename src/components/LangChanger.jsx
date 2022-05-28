
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Container, NavbarBrand, Navbar } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

export const LangChanger = ({t, i18n}) => {
  const changeLang = (lang) => () => {
    i18n.changeLanguage(lang);
  }
  return(
    <Navbar bg="light">
      <Container>
        <NavbarBrand>Chat</NavbarBrand>
        <NavbarCollapse id="changeLang">
          <Button variant="outline-info" onClick={ changeLang('ru') }>Ru</Button>{' '}
          <Button variant="outline-info" onClick={ changeLang('en') } >En</Button>{' '}
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}

export default withTranslation()(LangChanger)