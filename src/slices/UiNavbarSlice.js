
import { createSlice } from "@reduxjs/toolkit";

const UiNavBarSlice = createSlice({
    name: 'UiNavBar',
    initialState: ({ currentActivePage: 'signin' }),
    reducers: {
        setNewActivePage(state, { payload: { newActivePage } }) {
            state.currentActivePage = newActivePage;
        },
    },
})


export const actionsUiNavBar = UiNavBarSlice.actions;

export default UiNavBarSlice.reducer;