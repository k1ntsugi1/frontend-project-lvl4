
import React from 'react';
import { BadWordsContext } from '../contexts/index.jsx';

export const BadWordsProvider = ({filterBadWords, children}) => {
    return (
        <BadWordsContext.Provider value={{ filterBadWords }}>
            {children}
        </BadWordsContext.Provider>
    )
  }