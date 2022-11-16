import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        updateAnecdotes(state, action) {
            const updatedAnecdote = action.payload
            return state.map((a) =>
                a.id !== updatedAnecdote.id ? a : updatedAnecdote
            )
        },
    },
})

export const { appendAnecdote, setAnecdotes, updateAnecdotes } =
    anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdoteService.update({
            ...anecdote,
            votes: anecdote.votes + 1,
        })
        dispatch(updateAnecdotes(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer
