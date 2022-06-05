
import React from 'react';
import { withTranslation } from "react-i18next";
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import mappingTitle from '../modals/maps/mappingTitle.js'
import { mappingActionsUiModal } from './maps/mappingActionsUiModal.js'
import { useSocket } from "../../hooks/index.jsx";
import { actionsUiModal } from "../../slices/uiModalSlice.js";

export const RemoveModal = ({t, impact}) => {
    const { type, value: channel } = impact;
    const { socket } = useSocket();
    const dispatch = useDispatch()
    const stateModal = useSelector( (store) => store.uiModal )

    const handlerRemovingChannel = () => {
      mappingActionsUiModal({type, channel, dispatch, handleClose: actionsUiModal.removeModal, socket, t, value: null, filterBadWords: null});
    };

    return (
        <Modal centered show={stateModal[type]} onHide={() => dispatch(actionsUiModal.removeModal({typeModal:type}))}>

        <Modal.Header closeButton>
          <Modal.Title>{t(mappingTitle[type]())}</Modal.Title>
        </Modal.Header>
  
              <Modal.Body>
                {t("modal.removeBody")}
              </Modal.Body>
  
              <Modal.Footer className="p-0">
                <Button variant="secondary" onClick={() => dispatch(actionsUiModal.removeModal({typeModal:type}))}>
                  {t("modal.cancel")}
                </Button>
                <Button variant="danger" onClick={handlerRemovingChannel}>
                  {t("modal.remove")}
                </Button>
              </Modal.Footer>
  
         </Modal>
    )
}

export default withTranslation()(RemoveModal)