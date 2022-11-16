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

export const setNotification = (content, time) => {
    return async (dispatch) => {
        dispatch(showNotification(`you voted "${content}"`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer
