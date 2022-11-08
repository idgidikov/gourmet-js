import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database'
import { db } from '../firebase/config'
import { API } from '../common/constants'

export const createPost = async(data) => {
  const post = {
    data,
    addedOn: Date.now(),
  }

  const { key } = await set(ref(db, `posts/`), post)

  return update(ref(db), {
    [`posts/${key}`] : true,
  })
}

export const getAllPosts = async () => {
  const snapshot = await get(ref(db, 'posts'))

  if (!snapshot.exists()) {
    return []
  }

  return Object
    .keys(snapshot.val())
    .map(key => ({...snapshot.val()[key], id: key}))

  // const response = await fetch(`${API}/movies`)

  // if (!response.ok) throw new Error('Something went wrong!')

  // return response.json()
}

// export const getMovieById = async (id) => {
//   const response = await fetch(`${API}/movies/${id}`)

//   if (!response.ok) throw new Error('Something went wrong!')

//   return response.json()
// }

// export const getMoviesByName = async (name) => {
//   const response = await fetch(`${API}/movies?name=${name}`)

//   if (!response.ok) throw new Error('Something went wrong!')

//   return response.json()
// }

// export const addMovieComment = async (movieId, content) => {
//   const response = await fetch(`${API}/movies/${movieId}/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ content }),
//   })

//   if (!response.ok) throw new Error('Something went wrong!')

//   return response.json()
// }