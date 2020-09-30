import React, { createContext, useReducer } from 'react'

type AlertType = {
  id: number
  msg: string
  alertType: string
}

type InitialStateType = {
  alerts: AlertType[]
}

const initialState = {
  alerts: []
}

const AlertContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const alertReducer = (state: any, action: any) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_ALERT':
      return [...state, payload]
    case 'REMOVE_ALERT':
      return state.filter((alert: AlertType) => alert.id !== payload)
    default:
      return state
  }
}

const AlertContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState)

  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  )
}

export { AlertContext, AlertContextProvider }
