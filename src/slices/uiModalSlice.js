
import {createSlice } from "@reduxjs/toolkit";


const uiModalSlice = createSlice({
    name: 'currentModal',
    initialState: ({addChannelModal: false, renameChannelModal: false, removeChannelModal: false}),
    reducers: {
        setModal: (state, {payload: {typeModal}}) => {
            const mappingShowing = {
                'addChannelModal': () => {
                    state.addChannelModal = true;
                },
                'renameChannelModal': () => {
                    state.renameChannelModal = true; 
                },
                'removeChannelModal': () => {
                    state.removeChannelModal = true; 
                }
            }
            mappingShowing[typeModal]();
        },
        removeModal: (state, {payload: {typeModal}}) => {
            const mappingClosing ={
                'addChannelModal': () => {
                    state.addChannelModal = false;
                },
                'renameChannelModal': () => {
                    state.renameChannelModal = false;
                },
                'removeChannelModal': () => {
                    state.removeChannelModal = false;
                }
            }
            mappingClosing[typeModal]();
        }
    }
    
})

export const actionsUiModal = uiModalSlice.actions;

export default uiModalSlice.reducer;