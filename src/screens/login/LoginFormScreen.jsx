import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import LogoApp from "../../assets/logo.png";
import { login } from "./domain/service";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      if (response.status) {
        const { user, token } = response.data;
        toast.success(`Bienvenido ${user.name}`);
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Error al intentar iniciar sesión");
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-secondary p-4 overflow-hidden">
      <div className="w-full max-w-md flex flex-col justify-between h-full animate-fade-in">
        <div className="flex-grow flex flex-col items-center justify-center space-y-8">
          <header className="text-center space-y-4">
            <div className="inline-block p-2 bg-white rounded-full shadow-xl">
              <img
                src={LogoApp}
                alt="ABAGTA GPS Logo"
                className="w-24 h-24 object-contain"
                loading="eager"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mt-4 drop-shadow-lg">
              ABAGTA GPS
            </h1>
            <p className="text-xl text-white drop-shadow">Sistema de Gestión</p>
          </header>

          <div className="w-full bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8 animate-slide-up">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative group">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-25 border-2 border-transparent rounded-xl text-white placeholder-white/80 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-300 shadow-sm font-semibold"
                    placeholder="Correo electrónico"
                    value={credentials.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                </div>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                    size={20}
                  />
                  <input
                    type="text"
                    name="password"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-25 border-2 border-transparent rounded-xl text-white placeholder-white/80 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-300 shadow-sm font-semibold"
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={handleInputChange}
                    style={{
                      WebkitTextSecurity: showPassword ? "none" : "disc",
                    }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white focus:outline-none transition-colors duration-300"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
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
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
