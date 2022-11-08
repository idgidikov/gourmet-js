import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost } from '../../services/post.services'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'


/// https://github.com/zenoamaro/react-quill
const CreatePost = () => {
    const [post, setPost] = useState('');
    const { addToast } = useContext(AppContext)

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
      }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]


    const sendPost = async () => {
      try {
        await createPost(post)
      } catch (error) {
        addToast('error', error.message)
      }
    }



    return (
        <div className="create-post">
            {/* <label className="label">Thumbnail: </label>
            <input value={post} onChange={e => setPost(e.target.value)} type="text" className="input" /> */}
            <ReactQuill 
            theme="snow"
            modules = {modules}
            formats = {formats}
            value = {post}
            onChange={setPost} 
            />
            <a className="btn btn-primary mt-14" onClick={sendPost}>Publish</a>
        </div>
    )
}

export default CreatePost