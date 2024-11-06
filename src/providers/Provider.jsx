import { createContext, useReducer } from "react";
import reducer, { initialState } from '../reducer'

export const AppContext = createContext()

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider