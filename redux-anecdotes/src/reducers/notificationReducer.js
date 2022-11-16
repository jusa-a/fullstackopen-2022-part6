import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            const notification = action.payload
            return notification
        },
        hideNotification(state, action) {
            return ''
        },
    },
})

export const { showNotification, hideNotification } = notificationSlice.actions

let timeoutID

export const setNotification = (content, time) => {
    clearTimeout(timeoutID)

    return async (dispatch) => {
        dispatch(showNotification(content))
        timeoutID = setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer
