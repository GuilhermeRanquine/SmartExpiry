import api from './api';

export async function loginService(email, senha) {
    try {
        const response = await api.post('/auth/login', { 
            email: email, 
            password: senha,
         })
         const token = response.data.acess_token
         const usuario = await buscarUsuarioAtual(token)

         return { token, usuario }         
    } catch (error) {
        const mensagem = error.response?.data?.message || 'Erro ao fazer login';
        throw new Error(mensagem);
    }
}

export async function registerSevice(name, email, senha) {
    try {
        const response = await api.post('/auth/register', { 
            name: name, 
            email: email, 
            password: senha,
         })
         return response.data
    } catch (error) {
        const mensagem = error.response?.data?.message || 'Erro ao registrar usuário'
        throw new Error(mensagem)
    }
}
async function buscarUsuarioAtual(token) {
    try {
        const response = await api.get('/auth/me', {
            headers: {Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        return {name: 'Usuário', email: ''}
    }
}