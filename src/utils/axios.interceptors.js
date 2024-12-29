import axios from 'axios'

// Creamos un objeto para almacenar la función navigate
const navigationHelper = {
    navigate: null,
    setNavigate: (navigate) => {
        navigationHelper.navigate = navigate
    }
}

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Usamos la función navigate almacenada
            if (navigationHelper.navigate) {
                navigationHelper.navigate('/')
            }
        }
        return Promise.reject(error)
    }
)

export { navigationHelper }
export default axios