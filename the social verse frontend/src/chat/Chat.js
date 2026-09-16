import { Avatar, IconButton } from '@mui/material'
import {
    AttachFile,
    MoreVert,
    SearchOutlined,
    InsertEmoticon,
} from '@mui/icons-material'
import MicIcon from '@mui/icons-material/Mic'
import './Chat.css'
import PropTypes from 'prop-types'
import { useUser } from './../hooks/userHook.js'
import { useState } from 'react'

// using flex: 1 on a certain component pushes it's surrounding components to the far right

const DisplayUserMessage = (props) => {
    return (
        <p className='chat__message chat__receiver'>
            <span className='chat__name'>{props.userName}</span>
            {props.message}
            <span className='chat__timestamp'>{new Date().toUTCString()}</span>
        </p>
    )
}

DisplayUserMessage.propTypes = {
    userName: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}
export default function Chat(props) {
    const [user] = useUser()
    const [display, setDisplay] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setDisplay(true)
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar
                    src={`${process.env.BACKEND_URL}/api/users/photo/${props.userObject.userId}`}
                />
                <div className='chat__headerInfo'>
                    <h3>{props.userObject.roomName}</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                <p className='chat__message'>
                    <span className='chat__name'>
                        {props.userObject.roomName}
                    </span>
                    This is a message
                    <span className='chat__timestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
                {display && (
                    <DisplayUserMessage
                        userName={user.user.name}
                        message={props.userMessage}
                    />
                )}
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form onSubmit={(e) => handleChange(e)}>
                    <input
                        placeholder='Type a Message'
                        type='text'
                        onChange={(e) => props.handleMessage(e.target.value)}
                        value={props.userMessage}
                    />
                    <button type='submit'>Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
Chat.propTypes = {
    userObject: PropTypes.object.isRequired,
    handleMessage: PropTypes.func.isRequired,
    userMessage: PropTypes.string.isRequired,
}
