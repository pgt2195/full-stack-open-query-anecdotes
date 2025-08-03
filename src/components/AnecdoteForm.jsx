import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch, showNotification } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      console.log('createAnecdote onSuccess')
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      showNotification(`Your anecdote has been successfully added: ${data.content}`, notificationDispatch)
    },
    onError: (error) => {
      showNotification(error.response.data.error, notificationDispatch)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
    }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
