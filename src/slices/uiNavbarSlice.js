
import { createSlice } from "@reduxjs/toolkit";

const uiNavbarSlice = createSlice({
    name: 'uiNavbar',
    initialState: ({ currentActivePage: 'signin' }),
    reducers: {
        setNewActivePage(state, { payload: { newActivePage } }) {
            state.currentActivePage = newActivePage;
        },
    },
})


export const actionsUiNavBar = uiNavbarSlice.actions;

export default uiNavbarSlice.reducer;
