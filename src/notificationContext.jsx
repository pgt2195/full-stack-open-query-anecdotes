import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload
    case "HIDE":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = (useContext(NotificationContext))
    return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
    const notificationAndDispatch = (useContext(NotificationContext))
    return notificationAndDispatch[1]
}

export const showNotification = (message, dispatch) => {
    dispatch({ type: "SHOW", payload: message })
    setTimeout(() => {
        dispatch({ type: "HIDE" })
    }, 5000)
}

export default NotificationContext