import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost } from '../../services/post.services'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { modules, formats } from '../../react-quill/react-quill.config'
import { postValidation } from '../../common/enums/post-validation.enum'


/// https://github.com/zenoamaro/react-quill
const CreatePost = () => {
    const [post, setPost] = useState('');
    const [title, setTitle] = useState('');
    const [contentValidator, setContentValidator] = useState(false);
    const [postValidator, setPostValidator] = useState(false);

    const { addToast } = useContext(AppContext)

    useEffect(() => {
      if(title.length > postValidation.MIN_TITLE_LENGTH ||
        title.length < postValidation.MAX_TITLE_LENGTH ||
        title.length > postValidation.MIX_POST_LENGTH ||
        title.length < postValidation.MAX_POST_LENGTH) {
          console.log(contentValidator)
          setContentValidator(true)
        } else {
          console.log(contentValidator)
          setContentValidator(false)
        }
    }, [post, title]);

    // const updateTitle = (title = '') => {
    //   if(title.length > postValidation.MIN_TITLE_LENGTH || title.length < postValidation.MAX_TITLE_LENGTH) {
    //     setTitleValidator(true); 
    //     setTitle(title);
    //   } else {
    //     setTitleValidator(false);
    //     setTitle(title);
    //   }
    
    // }
    const updatePost = (post = '') => {
      if(title.length > postValidation.MAX_TITLE_LENGTH || title.length < postValidation.MAX_TITLE_LENGTH) {
        return false;
      } else {
        return true;
      }
    }


    const sendPost = async () => {
      try {
        await createPost({title, post})
      } catch (error) {
        addToast('error', error.message)
      }
    }

    return (
        <div className="create-post">
            <label className="label">Thumbnail: </label>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="input" />
            <ReactQuill 
            theme="snow"
            modules = {modules}
            formats = {formats}
            value = {post}
            onChange={setPost} 
            />
            <button className="btn btn-primary mt-14" disabled={contentValidator} onClick={sendPost}>Publish</button>
        </div>
    )
}

export default CreatePost