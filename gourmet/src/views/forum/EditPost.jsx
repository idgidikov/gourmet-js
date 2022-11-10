import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditPost() {
    const { postId } = useParams()
    const { addToast, setAppState } = useContext(AppContext)
    const [state, setState] = useState({
        post: '',
        title: '',
        url: '',
    })
    useEffect(() => {
        getPostById(postId)
            .then(p => {
                setState(state => ({
                    ...state,
                    post: p.post,
                    title: p.title,
                    url: p.url,

                }))
            })
            .catch(e => addToast('error', e.message))
    }, [postId]);

  return (
    <div className="create-post">
            <label className="label">Title of you publication: </label>
            <input 
            className="input input-bordered border-white w-full max-w-full mb-6"
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text" />
            <label className="label">Choose Thumbnail for your publication</label>
            <input type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-input file-input-bordered file-input-info w-full max-w-full mb-6" />
            <ReactQuill 
            theme="snow"
            modules = {modules}
            formats = {formats}
            value = {post}
            onChange={setPost} 
            />
            <button className="btn btn-primary mt-14" onClick={sendPost}>Publish</button>
        </div>
  )
}

export default EditPost