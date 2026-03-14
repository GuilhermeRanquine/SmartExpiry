import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './routes/PrivateRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<h1>Cadastro</h1>} />
        <Route path="/forgot-password" element={<h1>Recuperar Senha</h1>} />

        <Route path='/dashboard' element={
          <PrivateRoute>
            <h1>Dashboard</h1>
          </PrivateRoute>
        } />
        <Route path="/dashboard/products" element={
          <PrivateRoute>
            <h1>Produtos</h1>
          </PrivateRoute>
        } />
        <Route path='/dashboard/batches' element={
          <PrivateRoute>
            <h1>Lotes</h1>
          </PrivateRoute>
        } />
        <Route path='/dashboard/alerts' element={
          <PrivateRoute>
            <h1>Alertas</h1>
          </PrivateRoute>
        } />
        <Route path='/dashboard/settings' element={
          <PrivateRoute>
            <h1>Configurações</h1>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App