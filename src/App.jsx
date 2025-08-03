import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteForAnecdote } from './requests'
import { useNotificationDispatch, showNotification } from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  // Handling vote functionnality 
  const voteForAnecdoteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: () => {
      console.log('voteForAnecdote onSuccess')
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteForAnecdoteMutation.mutate(anecdote.id)
    showNotification(`You have voted for "${anecdote.content}"`, notificationDispatch)
  }


  // Getting the anecdotes from the server
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (!result.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} style={{marginTop: 10}}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)} style={{marginLeft: 5}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
