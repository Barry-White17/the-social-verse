import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import './SidebarChat.css'
import { list } from './../user/api-user.js'
import { useUser } from './../hooks/userHook.js'
import PropTypes from 'prop-types'

// setting tabIndex in div Makes content focusable in tab order

// import IconButton from '@mui/material/IconButton'

const SidebarChat = (props) => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const [userData] = useUser()

    useEffect(() => {
        const abortController = new AbortController()
        list().then((data) => {
            if (data && data.error) {
                setError(data.error)
            } else {
                setUsers(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])
    if (error) {
        console.log(`Error: ${error}`)
    }
    return (
        <ul>
            {users.map((user) => {
                return (
                    <>
                        {userData.user.name !== user.name && (
                            <div className='sidebarChat'>
                                <Avatar
                                    src={`${process.env.BACKEND_URL}/api/users/photo/${user._id}/?${new Date().getTime()}`}
                                />
                                <div className='sidebarChat__info'>
                                    {userData.user.name !== user.name && (
                                        <div
                                            onClick={() =>
                                                props.updateUserObject(
                                                    user.name,
                                                    user._id,
                                                )
                                            }
                                            role='button'
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' ||
                                                    e.key === ''
                                                ) {
                                                    e.preventDefault()
                                                    props.updateUserObject(
                                                        user.name,
                                                        user._id,
                                                    )
                                                }
                                            }}
                                        >
                                            <h2>{user.name}</h2>
                                            <p>Last Message...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )
            })}
        </ul>
    )
}
export default SidebarChat
SidebarChat.propTypes = {
    updateUserObject: PropTypes.func.isRequired,
}
