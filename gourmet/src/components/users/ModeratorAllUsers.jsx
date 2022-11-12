import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../services/post.services'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'

function ModeratorAllUsers(post) {
    console.log(post.user)
    const timestamp = post?.registeredOn
    const date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
    const { addToast, userData } = useContext(AppContext)
    const navigate = useNavigate()
    // const showPostDetails = () => {
    //   navigate(`/blog-post/${post.post.id}`)
    // }

    // const showPostEdit = () => {
    //   navigate(`/blog-post/edit/${post.post.id}`)
    // }


    // const removePost = async () => {
    //   try {
    //       await deletePost(post.post.id, userData.username)
    //       addToast('success', "Post has been deleted successfully")
    //   } catch (error) {
    //       error => addToast('error', error.message)
    //   }

    // }
    return (
          <tr>
              <td>
              <div className="flex items-center space-x-3">
                  <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                      <img src={post?.user.profile} alt="Avatar Tailwind CSS Component" />
                  </div>
                  </div>
                  
              </div>
              </td>
              <td>
              {post?.user.firstName}
              <br/>
              <span className="badge badge-ghost badge-sm">register on:{date}</span>
              </td>

              <th>
              <button className="btn btn-warning btn-xs" >Block</button>
              </th>
              <th>
              <button className="btn btn-error btn-xs" >Remove</button>
              </th>
          </tr>
    )
}

export default ModeratorAllUsers