import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) { // Recebe os filhos (componentes protegidos) como props
    const { estaLogado } = useAuth()

    if (!estaLogado) {
        return <Navigate to = "/login" replace />
    }
    return children
}

export default PrivateRoute;