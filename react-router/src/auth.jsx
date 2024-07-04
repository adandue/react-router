import React from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { blogdata } from "./blogdata";


const adminList = ['adan_due', 'vero', 'aurora', 'yuki']
const authorList = ['adan_due', 'yuki', 'luna']

const AuthContext = React.createContext()

function AuthProvider({ children }){
    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)
    const [data, setData] = React.useState(blogdata)
    const location = useLocation()
    const from = location.state?.from || '/'

    const login = ({ username }) => {
        const isAdmin = adminList.find(admin => admin === username)
        const isAuthor = authorList.find(author => author === username)
        setUser({ username, isAdmin, isAuthor })
        navigate(from, { replace: true})
    }

    const logout = () => {
        setUser(null)
        navigate('/')
    }

    const deletePost = (dataSlug) => {
        const filterData = data.filter(post => post.slug !== dataSlug)
        setData(filterData)
        console.log(data)
        return data
    }

    const auth = { user, login, logout, data, deletePost }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const auth = React.useContext(AuthContext)
    return auth
}

function AuthRoute(props) {
    const auth = useAuth()

    if(!auth.user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
    return props.children
}

export {
    AuthProvider,
    AuthRoute,
    useAuth
}