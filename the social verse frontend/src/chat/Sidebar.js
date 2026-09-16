import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar, IconButton } from '@mui/material'
import SidebarChat from './SidebarChat.js'
import { useUser } from './../hooks/userHook.js'
import PropTypes from 'prop-types'

// Flexboxes help distribution of space in a container with dynamically sized items

const Sidebar = (props) => {
    const [user] = useUser()
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar
                    src={`${process.env.BACKEND_URL}/api/users/photo/${user.user._id}/?${new Date().getTime()}`}
                />
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat updateUserObject={props.updateUserObject} />
            </div>
        </div>
    )
}
export default Sidebar
Sidebar.propTypes = {
    updateUserObject: PropTypes.func.isRequired,
}
