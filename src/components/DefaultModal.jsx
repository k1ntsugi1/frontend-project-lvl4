
import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl  } from 'react-bootstrap';
import { withTranslation } from "react-i18next";

const DefaultModal = ({t, title}) => {
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(true);
  console.log('start modal')
  const handleClose = () => setShow(false);
  
  
  const mappingTitle = {
    'addingChannel': () => "modal.headerAdding",
    'changeNameOfChanel': () => "modal.headerChangeName"
  };
  
  return (
    <Modal centered show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>{t(mappingTitle[title]())}</Modal.Title>
      </Modal.Header>

            <Modal.Body>
              <InputGroup >
              <FormControl
                    id={title}
                    name={title}
                    placeholder=""
                    aria-label={title}
                    value={inputValue}
                    onChange={({target}) => setInputValue(target.value) }
              />
              </InputGroup >
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t("modal.cancel")}
              </Button>
              <Button variant="primary" onClick={handleClose}>
                {t("modal.send")}
              </Button>
            </Modal.Footer>

       </Modal>
        )
}

export default withTranslation()(DefaultModal);