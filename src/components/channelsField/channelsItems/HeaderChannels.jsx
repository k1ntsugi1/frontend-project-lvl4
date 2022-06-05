
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import DefaultModal from '../../modals/DefaultModal.jsx';
import { actionsUiModal } from '../../../slices/uiModalSlice.js';


const HeaderChannels = ({t}) => {
    const stateModal = useSelector( (store) => store.uiModal)
    const dispatch = useDispatch()
    
    return (
      <>
        <div className='d-flex justify-content-between mb-3 ps-4 pe-2'>
          <span>{ t("chatPage.channelsField.channelsHeader") }</span>
          <Popup trigger={
                  <Button variant="" 
                          className="btn-group-vertical p-0 border-0 text-success" 
                          onClick={() => dispatch(actionsUiModal.setModal({typeModal:'addChannelModal'}))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                    </svg>
                    <span className="visually-hidden">add channel</span>
                  </Button>
                      }
               position='top right'
               on={['hover', 'focus']}
               contentStyle={ 
                 {
                  padding: "2px 5px 2px 5px",
                  color: '#FFFFFF',
                  fontWeight: 400,
                  textAlign: 'center',
                  backgroundColor: '#198754',
                  borderRadius: '10px',
                }
               }
          >
           <span>{t("chatPage.channelsField.addChannel")}</span>             
        </Popup>
          

        </div>
         { stateModal.addChannelModal 
           ? <DefaultModal impact={{ type: 'addChannelModal', value: null }} /> 
           : null }
       </>
    )
}

export default withTranslation()(HeaderChannels)