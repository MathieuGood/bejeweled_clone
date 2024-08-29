import React, { createContext, useState } from "react"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const [theme, setTheme] = useState("detailed")

	return <AppContext.Provider value={{ theme, setTheme }}>{children}</AppContext.Provider>
}

export default AppContext
