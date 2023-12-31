import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database'
import { db } from '../firebase/config'
import { userRole } from '../common/enums/user-role.enum'


export const getUser = async (username) => {
  const snapshot = await get(ref(db, `users/${username}`))
  //console.log(snapshot.val())

  return snapshot.val()
}

export const getUserById = async (uid) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'),equalTo(uid)))
  const value = snapshot.val()
  if(value!==null){
    const key = Object.keys(value)[0]
    const userData =  value[key]
    userData.likedPostsIds = Object.keys(userData.likedPosts || {})
    return userData
   
  }
  return value
}



export const createUser = async (uid, username,email,firstName,lastName, role = userRole.BASIC, isActive=true, favorites) => {
  const user = await getUser(username)

  if (user !== null) throw new Error(`User with username ${username} already exists!`)

  const userData = { uid, username, role, email, firstName,lastName, registeredOn: Date.now(), isActive, favorites }

  await set(ref(db, `users/${username}`), userData)

  return {...userData, commentIds: [], postIds: [], likedPostIds: [] }
}

export const getUserPosts = async (username) => {
    const userPosts = await get(ref(db, `users/${username}/posts`))
    const userPostIds = Object.keys(userPosts.val())
    const snapshot = await get(ref(db, 'posts'))
    
    if (!snapshot.exists()) {
      return []
    }
    return userPostIds
      .map(key => ({...snapshot.val()[key], id: key}))

}