import React from "react"
import { useAuth } from "./auth"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

const LoginPage = () => {
    const auth = useAuth()
    const [username, setUsername] = React.useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/'

    const login = e => {
        e.preventDefault()
        auth.login({ username })
    }

    if(auth.user) {
        navigate(from, { replace: true})
    }
    
    return (
        <>
            <h1>Login</h1>

            <form onSubmit={login}>
                <label>Escribe tu nombre de usuario:</label>
                <input 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <button type="submit">Entrar</button>
            </form>
        </>
    )
}

export { LoginPage }