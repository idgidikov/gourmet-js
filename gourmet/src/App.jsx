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
// import { getUserById } from './services/users.services'
import Login from './views/users/Login'
import Signup from './views/users/Signup'



function App() {
  const [user, loading, error] = useAuthState(auth)

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
  }, [user])

  useEffect(() => {
    if (appState.user !== null) {
      console.log('fetching user from App.jsx')
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
          <Route path="/create-blog-posts/" element={<CreatePost />} />
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
