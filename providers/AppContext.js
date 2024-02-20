import React, { createContext, useState } from 'react'
import { appThemes } from '../themes/appThemes'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [theme, setTheme = useState(initialState)] = useState('detailed')

    return (
        <AppContext.Provider value={{ theme, setTheme }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
