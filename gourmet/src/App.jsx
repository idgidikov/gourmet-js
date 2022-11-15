import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './views/Home'
import AllCocktails from "./views/recipes/AllCocktails"
import {Routes, Route} from "react-router-dom"
import { AppContext } from './context/app.context'
import NotFound from './views/NotFound'
import AllPosts from "./views/forum/AllPost"
import CreatePost from './views/forum/CreatePost'
import CocktailDetails from "./components/recipes/CocktailDetails"
import MealDetails from "./components/recipes/MealDetails"
import AllMeals from "./views/recipes/AllMeals"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/config'
import { getUserById } from './services/users.services'
import Login from './views/users/Login'
import Signup from './views/users/Signup'
import DetailsPost from './views/forum/DetailsPost'
import Logout from './views/users/Logout'
import ProfileEdit from './views/users/ProfileEdit'
import Authenticated from './hoc/Authenticated'
import EditPost from './views/forum/EditPost'
import RemovePost from './views/forum/RemovePost'
import { useLocation,useNavigate } from 'react-router-dom'
import SearchPosts from './views/forum/SearchPosts'
import Moderator from './views/users/Moderator'
import UserRoleRender from './hoc/UserRole'
import ByDatePosts from './views/forum/ByDatePosts'
import MostLikes from './views/forum/MostLikes'
import MostCommets from './views/forum/MostCommets'
import FavoritesCocktails from './views/users/FavoritesCocktails'
import FavoritesMeals from './views/users/FavoritesMeals'



function App() {
  const [user, loading, error] = useAuthState(auth)
  const location = useLocation()
  const navigate = useNavigate()
  const [appState, setAppState] = useState({
    user: user ? { email: user.email, uid: user.uid } : null,
    userData: null,
    
  })
  /**
   * @type {[Array<{ class: string, message: string }>, Function]}
   */
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    setAppState({
      ...appState,
      user: user ? { email: user.email, uid: user.uid } : null,
    })
    if (location.state?.from?.pathname) {
      navigate(location.state.from.pathname)
    }
  }, [user])

  useEffect(() => {
    if (appState.user !== null) {
      getUserById(appState.user.uid)
        .then(userData => setAppState({...appState, userData }) || console.log(userData))
        .catch(e => addToast('error', e.message))
    }
  }, [appState.user])

  /**
   * 
   * @param {'success' | 'error'} type 
   * @param {string} message 
   */
  const addToast = (type, message) => {
    const toast = {
      class: type === 'error' ? 'alert-error' : 'alert-success',
      message,
    }

    setToasts(toasts => [...toasts, toast])

    setTimeout(() => setToasts(toasts => toasts.filter(t => t !== toast)), 7000)
  }


  return (
    <AppContext.Provider value={{...appState, setAppState, addToast}}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= "/login" element={<Login />} />
          <Route path= "/sign-up" element={<Signup />} />
          <Route path="/cocktails" element={<AllCocktails />} />
          <Route path="/cocktails/:id" element={ <CocktailDetails />} />
          <Route path="/meals" element={<AllMeals />} />
          <Route path="/meals/:id" element={ <MealDetails />} />
          <Route path="/blog-posts/" element={<AllPosts />} />
          <Route path='/blog-posts/last-added' element={<ByDatePosts />} />
          <Route path='/blog-posts/most-liked' element={<MostLikes />} />
          <Route path='/blog-posts/most-commented' element={<MostCommets />} />

          <Route path="/my-favorites-cocktails" element={<Authenticated user={appState.user}><FavoritesCocktails /></Authenticated>}/>
          <Route path="/my-favorites-meals" element={<Authenticated user={appState.user}><FavoritesMeals /></Authenticated>}/>
          <Route path="/create-blog-posts/" element={<Authenticated user={appState.user}><CreatePost /></Authenticated>}/>
          
          <Route path="/blog-post/:postId" element={<Authenticated user={appState.user}><DetailsPost /></Authenticated>} />
          <Route path="/blog-post/removed" element={<Authenticated user={appState.user}><RemovePost /></Authenticated>} />
          <Route path="/blog-post/edit/:postId" element={<Authenticated user={appState.user}><EditPost /></Authenticated>} />
          <Route path="/logout" element={<Authenticated user={appState.user}><Logout /></Authenticated>} />
          <Route path="/profile/" element={<Authenticated user={appState.user}><UserRoleRender /></Authenticated>} />
          {/* <Route path="/profile" element={<Authenticated user={appState.user}><Profile /></Authenticated>} />
          <Route path="/moderator" element={<Authenticated user={appState.user}><Moderator /></Authenticated>} /> */}
          <Route path="/edit-profile" element={<Authenticated user={appState.user}><ProfileEdit /></Authenticated>} />
          <Route path="/search-posts" element={<Authenticated user={appState.user}><SearchPosts /></Authenticated>} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <div className="toast">
          {toasts.map((t, i) => <div key={i} className={`alert ${t.class}`}>
            <div>
              <span>{t.message}</span>
            </div>
          </div>)}
        </div>
      </div>
    </AppContext.Provider>     
  )
}

export default App
