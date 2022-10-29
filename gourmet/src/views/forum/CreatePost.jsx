import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


/// https://github.com/zenoamaro/react-quill
const CreatePost = () => {
    const [value, setValue] = useState('');
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
    return (
        <div className="create-post">
            <ReactQuill 
            theme="snow"
            modules = {modules}
            formats = {formats}
            value={value} 
            onChange={setValue} 
            />
            <a className="btn btn-primary mt-5">Publish</a>
        </div>
    )
}

export default CreatePost