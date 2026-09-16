import { useUser } from './../hooks/userHook.js'

const PrivateRoute = ({ children }) => {
    const [user] = useUser()

    if (user) {
        return children
    }
    if (!user) {
        return
    }
}

export default PrivateRoute
