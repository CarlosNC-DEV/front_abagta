import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './screens/LoginFormScreen'
import Dashboard from './screens/DashboardScreen'
import MessageScreen from './screens/MessageScreen'
import UserScreen from './screens/UserScreen'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<MessageScreen />} />
        <Route path="/users" element={<UserScreen />} />
      </Routes>
    </Router>
  )
}

