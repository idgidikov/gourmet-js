import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database'
import { db } from '../firebase/config'


export const allUsers = async () => {
    const snapshot = await get(ref(db, `users`))
    if(!snapshot.exists()){
        return []
    }
    return Object
    .keys(snapshot.val())
    .map(key => ({...snapshot.val()[key], id: key}))
}

export const deactivateUserById = async (uid) => {
    const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'),equalTo(uid)))
    const value = snapshot.val()
    if(value!==null){
      const key = Object.keys(value)[0]
      let newStatus = value[key].isActive
      if(value[key].isActive == true){
        newStatus = false
      } else if(value[key].isActive == false) {
        newStatus = true
      }
      console.log(value[key])
      return (
        update(ref(db), {
        [`users/${value[key].username}/isActive`] : newStatus,
      }), value[key])
    }
}

