import { useState } from 'react'

import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import {getPostsByName} from '../../services/post.services'
import { getUser } from '../../services/users.services'


// /movies/search?name=alien
export default function SearchModerator() {
  const [search, setSearch] = useSearchParams()
  const { addToast } = useContext(AppContext)

 const [author, setAuthor] = useState([])
 const [posts, setPosts] = useState([])
  

   const [keyword, setKeyword] = useState(search.get('name') || '')

  useEffect(() => {
    if (keyword === '') return setAuthor([]) && setPosts([])



    getPostsByName(keyword).then(setPosts).catch(e => addToast('error', e.message))
     
      getUser(keyword).then(setAuthor).catch(e => addToast('error', e.message))
     

    

      
    

    
  }, [keyword])

  const setSearchParams = (value) => {
    setKeyword(value)
    setSearch({ name: value })
  }

  return (
    
    <>
   <input
            type="text"
             value={keyword}
             onChange={e => setSearchParams(e.target.value)}
            placeholder="Enter search terms..."
            className="input input-bordered m-auto"
          />
       
</>
      
        
       
 
   
  )
}