import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { create } from './api-user.js'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import './Signup.css'
import Button from '@mui/material/Button'

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handlePassword = () => {
        setShowPassword(!showPassword)
    }
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        }
        create(user).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
                navigate('/signin')
            }
        })
    }
    const createUserMutation = useMutation({
        mutationFn: () => clickSubmit(),
    })
    const createUser = (e) => {
        e.preventDefault()
        createUserMutation.mutate()
    }
    return (
        <div className='root'>
            <Card className='card' elevation={4}>
                <CardContent className='cardContent'>
                    <Typography className='title'>SignUp</Typography>
                    <TextField
                        label='Name'
                        type='text'
                        value={values.name}
                        onChange={handleChange('name')}
                        className='textField'
                    />
                    <TextField
                        label='Email'
                        type='email'
                        value={values.email}
                        onChange={handleChange('email')}
                        className='textField'
                    />
                    <TextField
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        className='textField'
                        onChange={handleChange('password')}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handlePassword}>
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </CardContent>
                <CardActions className='cardActions'>
                    <Button
                        type='submit'
                        onClick={(e) => createUser(e)}
                        className='submit__button'
                        variant='contained'
                    >
                        Submit
                    </Button>
                    <div className='bottom__text'>
                        <p>Already have an account?</p>
                        <Link to='/signin' style={{ textDecoration: 'none' }}>
                            LogIn
                        </Link>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}
