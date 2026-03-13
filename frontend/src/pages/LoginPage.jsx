import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    function handleSubmit(e) {
        e.preventDefault()

        if (!email || !senha) {
            setErro("Preencha todos os campos");
            return;
        }

        console.log('Tentando login com:', email, senha);
        setErro('');
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        Seja bem-vindo de volta!
                    </h1>
                    <p className="text-zinc-400 mt-2 text-sm">
                        Acesse sua conta para continuar
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-300">
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seuemail@email.com"
                            className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-300">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="••••••••"
                            className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                    </div>
                    {erro && (
                        <p className="text-red-400 text-sm">{erro}</p>
                    )}
                    <div className="text-right">
                        <Link
                        to="/forgot-password"
                        className="text-sm text-violet-400 hover:text-violet-300"
                        >
                            Esqueceu sua senha?
                        </Link>
                    </div>
                    <button
                    type="submit"
                    className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                    >
                        Entrar
                    </button>
                </form>
                <p className="text-center text-zinc-400 text-sm mt-6">
                    Não tem uma conta?{' '}
                    <Link
                    to="/register"
                    className="text-violet-400 hover:text-violet-300 font-medium"
                    >
                        Criar conta
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage