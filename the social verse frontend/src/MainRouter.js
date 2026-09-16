import { Routes, Route } from 'react-router-dom'
import Signin from './auth/Signin.js'
import Signup from './user/Signup.js'
import Menu from './core/Menu.js'
import Home from './core/Home.js'
import Profile from './user/Profile.js'
import EditProfile from './user/EditProfile.js'
import PrivateRoute from './auth/PrivateRoute.js'
// import Chat from './chat/Chat.js'

const MainRouter = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/' element={<Home />} />
                <Route path='/user/:userId' element={<Profile />} />
                <Route
                    path='/user/edit/:userId'
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    )
}
export default MainRouter
