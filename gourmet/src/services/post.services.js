import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database'
import { db, storage } from '../firebase/config'
import { uploadBytesResumable } from 'firebase/storage'

import { API } from '../common/constants'

export const createPost = async({title, post, url}) => {
  const body = {
    title,
    post,
    url,
    addedOn: Date.now(),
  }

  const result = await push(ref(db, `posts`), body)
  
  return result 

  // return update(ref(db), {
  //   [`posts/${key}`] : true,
  // })
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

export const getPostById = async (id) => {
  const snapshot = await get(ref(db, `posts/${id}`))

  if (!snapshot.exists()) throw new Error('Post doesn\'t exist!')
  return {
    ...snapshot.val(),
    id,
  }
}

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

export const uploadPostThumbnail = async () => {
  const storageRef = ref(storage, `files/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file);
  console.log(uploadTask)
}