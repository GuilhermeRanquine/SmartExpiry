import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        () => localStorage.getItem('token') || null
    )
    const [usuario, setUsuario] = useState(
        () => {
            const salvo = localStorage.getItem('usuario')
            return salvo ? JSON.parse(salvo) : null
        }
    )
    function login(novoToken, dadosUsuario) {
        setToken(novoToken)
        setUsuario(dadosUsuario)
        localStorage.setItem('token', novoToken)
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario))
    }
    function logout() {
        setToken(null)
        setUsuario(null)
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
    }
    const valor = {
        token,
        usuario,
        login,
        logout,
        estaLogado: !!token
    }
    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
