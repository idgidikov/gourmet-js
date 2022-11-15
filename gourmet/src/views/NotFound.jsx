import { useState, useEffect } from 'react'
import { getImage } from '../services/home.services'

const NotFound = () => {

    const [image, setImage] = useState()

    useEffect(() => {
      getImage('static/notFound.jpeg').then((result) => setImage(result))
    }, [])

    return (
      <div className="min-h-screen bg-base-200 px-20">
          <p className="text-xl text-center">Page not found!</p>
          <img className="not-found" src={image} />
      </div>
    )
}

export default NotFound