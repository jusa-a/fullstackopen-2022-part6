import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
    hideNotification,
    showNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) =>
        state.anecdotes.filter((a) =>
            a.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    )

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))

        dispatch(showNotification(`you voted "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => vote(anecdote)}
                    />
                ))}
        </div>
    )
}

export default AnecdoteList
