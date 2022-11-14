import React from 'react'
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'
import { deactivateUserById } from '../../services/admin.services'
import { useState, useEffect } from 'react'
import { defaultPicture } from '../../common/constants';


function ModeratorAllUsers(post) {
    const { addToast } = useContext(AppContext)
    const timestamp = post?.registeredOn
    const date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
    const [buttonActiveText, setButtonActiveText] = useState('')
    
    const blockUserById = async () => {
        deactivateUserById(post?.user.username)
            .then((result) => {
                console.log(result.isActive)
                if(result?.isActive == true) {
                    setButtonActiveText('Block')
                    addToast('success', 'Successfully Blocked')
                }
                if(result?.isActive == false) {
                    setButtonActiveText('Unblock')
                    addToast('success', 'Successfully Unblocked')
                }
                
            })
            .catch((error) => addToast('error', error.message))
    }
    
    useEffect(() => {
        if(post?.user.isActive == true) {
            setButtonActiveText('Block')
        }
        if(post?.user.isActive == false) {
            setButtonActiveText('Unblock')
        }
    }, [])

    return (
          <tr>
              <td>
              <div className="flex items-center space-x-3">
                  <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                      <img src={post?.user.profile ? post.user.profile : defaultPicture} alt="Avatar Tailwind CSS Component" />
                  </div>
                  </div>
                  
              </div>
              </td>
              <td>
                {post?.user.firstName} {post?.user.lastName}
              <br/>
              <span className="badge badge-ghost badge-sm">register on:{date}</span>
              </td>
              <td>
                {post?.user.username}
              </td>
              <td>
                {post?.user.email}
              </td>

              <th>
              <button className="btn btn-warning btn-xs" onClick={blockUserById}>
                {/* {post?.user.isActive ? 'Block' : 'Unblock'} */}
                {buttonActiveText}
              </button>
              </th>

          </tr>
    )
}

export default ModeratorAllUsers