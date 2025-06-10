import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import CreateSOP from './pages/CreateSOP'
import EmployeeSOP from './pages/EmployeeSOP'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateSOP />} />
        <Route path="/sop/:id" element={<EmployeeSOP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
