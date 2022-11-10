import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost } from '../../services/post.services'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { modules, formats } from '../../react-quill/react-quill.config'
import { postValidation } from '../../common/enums/post-validation.enum'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/config.js'
import { v4 } from 'uuid'

/// https://github.com/zenoamaro/react-quill
const CreatePost = () => {
    const [post, setPost] = useState('');
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [titleValidator, setTitleValidator] = useState(false);
    const [postValidator, setPostValidator] = useState(false);

    const { addToast } = useContext(AppContext)

    const handleFileUpload = (e) => {
      console.log(e.target.files[0])
      setThumbnail(e.target?.files[0]);
    }

    useEffect(() => {
      if(title.length > postValidation.MIN_LENGTH_TITLE &&
        title.length < postValidation.MAX_LENGTH_TITLE) {
          setTitleValidator(true)
        } else {
          setTitleValidator(false)
        }
      
        const cleanText = post.replace( /(<([^>]+)>)/ig, '')

      if (cleanText.length > postValidation.MIN_LENGTH_POST &&
        cleanText.length < postValidation.MAX_LENGTH_POST) {
          setPostValidator(true)
        } else {
          setPostValidator(false)
        }
    }, [post, title]);

    const navigate = useNavigate()

    const showAllPosts = () => {
      navigate(`/blog-posts/`)
    }


    const sendPost = async (e) => {
      e.preventDefault()
      const imageRef = ref(storage, `images/${v4()}`)
      const file = thumbnail
      if (!titleValidator) addToast('error', 'Title must between 16 - 64 characters')
      if (!postValidator) addToast('error', 'Post content must between 32 - 8192 characters')
      if (!file) return addToast('error', 'Choose thumbnail')
      if(titleValidator && postValidator) {
        try {
          const result = await uploadBytes(imageRef, file)
          const url = await getDownloadURL(result.ref)
          setThumbnail(url)

          await createPost({title, post, url})
          showAllPosts()
        } catch (error) {
          addToast('error', error.message)
        }
      }
    }

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

export default CreatePost