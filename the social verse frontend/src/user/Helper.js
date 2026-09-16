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
                        InputProps={{
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
                        }}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={(e) => createUser(e)}>Submit</Button>
                    <div className='flex mx-auto gap-3'>
                        <p className='text-sm text-muted-foreground border-transparent font-'>
                            Already have an account?
                        </p>
                        <Link
                            to='/signin'
                            className='font-semibold hover:underline'
                        >
                            LogIn
                        </Link>
                    </div>
                </CardActions>
            </Card>
        </div>
    )