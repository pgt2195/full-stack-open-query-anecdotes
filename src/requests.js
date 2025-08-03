import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const voteForAnecdote = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  await axios.patch(`${baseUrl}/${id}`, { votes: response.data.votes + 1 })
    .then(res => res.data)
}