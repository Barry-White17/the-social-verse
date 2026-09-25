import { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Edit from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import DeleteUser from './DeleteUser.js'
import { read } from './api-user.js'
import { Navigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useUser } from './../hooks/userHook.js'

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
//Unexpected value type of CallExpression.
const useStyles = makeStyles()((theme) => ({
    root: {
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
    },
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle,
    },
    avatar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
    },
}))

export default function Profile() {
    const { classes } = useStyles()
    const { userId } = useParams()
    const [userData, setUserData] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [user] = useUser()

    useEffect(() => {
        const abortController = new AbortController()

        read({
            userId: userId,
        }).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUserData(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    if (redirectToSignin) {
        return <Navigate to='/signin' />
    }
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant='h6' className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            {userData.name && userData.name[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={userData.name}
                        secondary={userData.email}
                    />{' '}
                    {user.user && user.user._id === userData._id && (
                        <ListItemSecondaryAction>
                            <Link to={'/user/edit/' + user.user._id}>
                                <IconButton
                                    aria-label='Edit'
                                    color='primary'
                                    size='large'
                                >
                                    <Edit />
                                </IconButton>
                            </Link>
                            <DeleteUser userId={userData._id} />
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary={
                            'Joined: ' +
                            new Date(userData.created).toDateString()
                        }
                    />
                </ListItem>
            </List>
        </Paper>
    )
}
