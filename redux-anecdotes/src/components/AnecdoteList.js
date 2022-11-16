import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        props.voteAnecdote(anecdote)
        props.setNotification(`you voted "${anecdote.content}"`, 3)
    }

    return (
        <div>
            {[...props.anecdotes]
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter((a) =>
            a.content.toLowerCase().includes(state.filter.toLowerCase())
        ),
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
