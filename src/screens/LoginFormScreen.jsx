import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import LogoApp from '../assets/logo.png'

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Add your authentication logic here
        navigate('/dashboard')
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-secondary p-4 overflow-hidden">
            <div className="w-full max-w-md flex flex-col justify-between h-full animate-fade-in">
                <div className="flex-grow flex flex-col items-center justify-center space-y-8">
                    <div className="text-center space-y-4">
                        <div className="inline-block p-2 bg-white rounded-full shadow-xl">
                            <img src={LogoApp} alt="ABAGTA GPS Logo" className="w-24 h-24 object-contain" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mt-4 drop-shadow-lg">ABAGTA GPS</h1>
                        <p className="text-xl text-white drop-shadow">Sistema de Gestión</p>
                    </div>
                    <div className="w-full bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8 animate-slide-up">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-25 border-2 border-transparent rounded-xl text-white placeholder-white/80 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-300 shadow-sm font-semibold"
                                        placeholder="Usuario"
                                        value={credentials.username}
                                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-25 border-2 border-transparent rounded-xl text-white placeholder-white/80 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-300 shadow-sm font-semibold"
                                        placeholder="Contraseña"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white focus:outline-none transition-colors duration-300"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 text-white bg-secondary rounded-xl hover:bg-secondary-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary group shadow-lg transform hover:scale-105"
                                >
                                    <span className="flex items-center justify-center font-bold text-lg">
                                        Ingresar
                                        <ArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" size={24} />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

