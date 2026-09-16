import Sidebar from './../chat/Sidebar.js'
import './Home.css'
import Chat from './../chat/Chat.js'
import { useUser } from './../hooks/userHook.js'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Home() {
    const [user] = useUser()
    const [userObject, setUserObject] = useState({})
    const [message, setMessage] = useState('')

    const updateUserObject = (roomName, userId) => {
        let user = {
            roomName: roomName,
            userId: userId,
        }
        setUserObject(user)
    }
    const handleMessage = (message) => {
        setMessage(message)
    }
    if (user) {
        return (
            <div className='home'>
                <div className='home__body'>
                    <Sidebar updateUserObject={updateUserObject} />
                    <Chat
                        userObject={userObject}
                        handleMessage={handleMessage}
                        userMessage={message}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className='textRoot'>
                <Link to='/signin' style={{ textDecoration: 'none' }}>
                    <Typography
                        type='title'
                        className='text'
                        sx={{
                            fontWeight: 800,
                            color: 'black',
                            fontSize: '30px',
                        }}
                    >
                        Signin to get started
                    </Typography>
                </Link>
            </div>
        )
    }
}
