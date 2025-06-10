import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import CreateSOP from './pages/CreateSOP'
import EmployeeSOP from './pages/EmployeeSOP'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateSOP />} />
        <Route path="/sop/:id" element={<EmployeeSOP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
