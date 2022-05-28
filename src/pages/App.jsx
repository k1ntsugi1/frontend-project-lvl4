
import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";

import { ChatPage } from './ChatPage.jsx'
import SignIn  from './SignIn.jsx'
import { NotFoundPage } from './NotFoundPage.jsx'
export const App = () => {
    return (
        <Routes>
            <Route path='/' element={ <ChatPage/> }></Route>
            <Route path="logic" element={ <SignIn/> }></Route>
            <Route path="*" element={ <NotFoundPage/> }></Route>
        </Routes>
    )
}