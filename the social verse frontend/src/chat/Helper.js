import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import './SidebarChat.css'
import { list } from './../user/api-user.js'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import { useUser } from './../hooks/userHook.js'

const SidebarChat = () => {
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
    return (
        <div className='sidebarChat'>
            {users.map((user) => (
                <>
                    <Avatar
                        src={`${process.env.BACKEND_URL}/api/users/photo/${user._id}/?${new Date().getTime()}`}
                    />
                    <div className='sidebarChat__info'>
                        {userData.user.name !== user.name && (
                            <>
                                <h2>{user.name}</h2>
                                <p>Last Message...</p>
                            </>
                        )}
                    </div>
                </>
            ))}
            {error && (
                <Typography type='error'>
                    <Icon color='error'>Error:</Icon>
                    {error}
                </Typography>
            )}
        </div>
    )
}
export default SidebarChat
