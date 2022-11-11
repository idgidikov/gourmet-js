import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database'
import { db } from '../firebase/config'

export const addComment = async(author, postId, content, profilePicture) => {
  const comment = { author, postId, content, profilePicture, createdOn: Date.now() }
  const result = await push(ref(db, 'comments'), comment)

  await update(ref(db), {
    [`users/${author}/comments/${result.key}`]: true,
    [`posts/${postId}/comments/${result.key}`]: true,
  })

  return { ...comment, id: result.key }
}

export const getCommentById = async(id) => {
  const snapshot = await get(ref(db, `comments/${id}`))

  if (!snapshot.exists()) throw new Error(`Comment with id ${id} does not exist!`)

  return {
    ...snapshot.val(),
    id,
  }
}
