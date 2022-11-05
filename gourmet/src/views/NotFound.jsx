import notFound from '../assets/notFound.jpeg'


const NotFound = () => {

    return (<div className="min-h-screen bg-base-200 px-20">
      <p className="text-xl text-center">Page not found!</p>
      <img className="not-found" src={notFound}/>
    </div>)
  }

export default NotFound