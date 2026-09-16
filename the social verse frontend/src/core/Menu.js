import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
// import FlagIcon from '@mui/icons-material/Flag'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import { Avatar, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { useUser } from './../hooks/userHook.js'
import { signout } from './../auth/api-auth.js'

const isActive = (history, path) => {
    if (history.pathname == path) {
        return 'header__option header__option--active'
    } else {
        return 'header__option'
    }
}

const Menu = () => {
    const history = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useUser()
    const logout = () => {
        setUser(null)
        signout()
    }
    let photoUrl =
        user &&
        `${process.env.BACKEND_URL}/api/users/photo/${user.user._id}/?${new Date().getTime()}`
    return (
        <HeaderWrapper>
            <HeaderLeft>
                <img src='logo192.png' alt='Popular' />
            </HeaderLeft>
            <HeaderInput>
                <SearchIcon />
                <input placeholder='Search or start new chat' type='text' />
            </HeaderInput>
            <HeaderCenter>
                <div className={isActive(history, '/')}>
                    <Link to='/'>
                        <IconButton>
                            <HomeIcon fontsize='large' />
                        </IconButton>
                    </Link>
                </div>
                <div className='header__option'>
                    <SubscriptionsOutlinedIcon fontsize='large' />
                </div>
                <div className='header__option'>
                    <SupervisedUserCircleIcon fontsize='large' />
                </div>
                {user ? (
                    <>
                        <div className={isActive(history, '/signout')}>
                            <IconButton onClick={logout}>
                                <Typography
                                    type='title'
                                    className='header__text'
                                >
                                    SignOut
                                </Typography>
                            </IconButton>
                        </div>
                        <HeaderRight>
                            <div className='header__info'>
                                <IconButton
                                    onClick={() =>
                                        navigate(`/user/${user.user._id}`)
                                    }
                                >
                                    <Avatar src={photoUrl} />
                                    <h4>{user.user.name}</h4>
                                </IconButton>
                            </div>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                            <IconButton>
                                <NotificationsActiveIcon />
                            </IconButton>
                            <IconButton>
                                <ExpandMoreIcon />
                            </IconButton>
                        </HeaderRight>
                    </>
                ) : (
                    <>
                        <div className={isActive(history, '/signup')}>
                            <Link
                                to='/signup'
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography
                                    type='title'
                                    className='header__text'
                                >
                                    Signup
                                </Typography>
                            </Link>
                        </div>
                        <div className={isActive(history, '/signin')}>
                            <Link
                                to='/signin'
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography
                                    type='title'
                                    className='header__text'
                                >
                                    Signin
                                </Typography>
                            </Link>
                        </div>
                    </>
                )}
            </HeaderCenter>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    box-shadow: 0px 5px 8px -9px rgba(0, 0, 0, 0.75);
`

const HeaderLeft = styled.div`
    display: flex;
    justify-content: space-evenly;
    img {
        height: 40px;
    }
`

const HeaderInput = styled.div`
    display: flex;
    align-items: center;
    background-color: #eff2f5;
    padding: 10px;
    margin-left: 10px;
    border-radius: 33px;
    input {
        background-color: transparent;
        outline-width: 0;
        border: none;
    }
`

const HeaderCenter = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    .header__option {
        display: flex;
        align-items: center;
        padding: 10px 30px;
        cursor: pointer;
        .MuiSvgIcon-root {
            color: gray;
        }
        &:hover {
            background-color: #eff2f5;
            border-radius: 10px;
            align-items: center;
            padding: 0 30px;
            border-bottom: none;
            .MuiSvgIcon-root {
                color: #2e81f4;
            }
        }
    }
    .header__option--active {
        border-bottom: 4px solid #2e81f4;
        .MuiSvgIcon-root {
            color: #2e81f4;
        }
    }
    .header__text {
        padding: 10px 30px;
        color: gray;
        text-decoration: none;
    }
`

const HeaderRight = styled.div`
    display: flex;

    .header__info {
        display: flex;
        align-items: center;
        h4 {
            margin-left: 10px;
        }
    }
`

export default Menu
