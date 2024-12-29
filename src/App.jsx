import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LoginForm from './screens/login/LoginFormScreen'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import MessageScreen from './screens/MessageScreen'
import UserScreen from './screens/UserScreen'
import { navigationHelper } from './utils/axios.interceptors'

function AppRoutes() {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigationHelper.setNavigate(navigate)
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/messages" element={<MessageScreen />} />
      <Route path="/users" element={<UserScreen />} />
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

