import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            console.log(action)
            const notification = action.payload
            return notification
        },
        hideNotification(state, action) {
            return ''
        },
    },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
