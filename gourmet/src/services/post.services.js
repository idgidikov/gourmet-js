import { ref, push, get, set, update, remove, query, equalTo, orderByChild, orderByKey,limitToFirst,startAt } from 'firebase/database'
import { db, storage } from '../firebase/config'



export const createPost = async({title, post, url, username,tag}) => {
    const body = {
      title,
      post,
      url,
      author: username,
      addedOn: Date.now(),
      tag
    }

    const { key } = await push(ref(db, `posts`), body)
    
    return update(ref(db), {
      [`users/${username}/posts/${key}`] : true,
    })
}

export const updatePost = async({postId, title, post, url, username}) => {
  const body = {
    title,
    post,
    url,
    author: username,
    addedOn: Date.now(),
  }

  await update(ref(db, `posts/${postId}`), body)

}

export const getAllPosts = async () => {
    const snapshot = await get(ref(db, 'posts'))
    if (!snapshot.exists()) {
      return []
    }

    return Object
      .keys(snapshot.val())
      .map(key => ({...snapshot.val()[key], id: key}))
}
export const getPostsPage = async (pageSize=3,page=0) => {
  const posts = await get(ref(db, 'posts'))
  const postKeys = Object.keys(posts.val())
  //console.log(postKeys)
  const start = page*pageSize
  const end = start+pageSize
  const pageKeys = postKeys.slice(start,end)
  
  if (!posts.exists()) {
    return []
  }

  return pageKeys.map(key => ({...posts.val()[key], id: key}))
}

export const getPostById = async (id) => {
    const snapshot = await get(ref(db, `posts/${id}`))

    if (!snapshot.exists()) throw new Error('Post doesn\'t exist!')
    return {
      ...snapshot.val(),
      id,
    }
}



export const deletePost = async (id, username) => {
  const snapshot = await get(ref(db, `posts/${id}`))
  ///const userRef = await get(ref(db), `users/${username}/posts/${id}`)
  if (!snapshot.exists()) throw new Error('Post doesn\'t exist!')
  await remove(snapshot.ref)
  return update(ref(db), {
    [`users/${username}/posts/${id}`] : null,
    ///[`comments/${username}/posts/${id}`] : null,
  })
  
}


export const togglePostLikes = async (postId, author, like = true) => {
  return update(ref(db), {
    [`users/${author}/likedPosts/${postId}`]: like || null,
    [`posts/${postId}/likedBy/${author}`]: like || null,
  })
}


export const getPostsByName = async (title) => {
  const snapshot = await get(ref(db, 'posts'))
  if (!snapshot.exists()) throw new Error('Something went wrong.')
  
  return Object
    .keys(snapshot.val())
    .map(key => (({...snapshot.val()[key], id: key})))
    .filter(post => post?.title?.toLowerCase().includes(title?.toLowerCase()))
    
}

