
import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl  } from 'react-bootstrap';
import { withTranslation } from "react-i18next";
import { useModal } from "../hooks/index.jsx";

const DefaultModal = ({t, title}) => {
  const [inputValue, setInputValue] = useState('');
  const modal = useModal()
  
  const mappingTitle = {
    'addingChannel': () => "modal.headerAdding",
    'changeNameOfChanel': () => "modal.headerChangeName"
  };
  
  return (
    <Modal centered show={modal.show} onHide={modal.handleClose}>

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

            <Modal.Footer className="p-0">
              <Button variant="secondary" onClick={modal.handleClose}>
                {t("modal.cancel")}
              </Button>
              <Button variant="primary" onClick={modal.handleClose}>
                {t("modal.send")}
              </Button>
            </Modal.Footer>

       </Modal>
        )
}

export default withTranslation()(DefaultModal);