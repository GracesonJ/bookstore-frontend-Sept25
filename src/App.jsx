import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./Common/Pages/Home"
import Auth from "./Common/Pages/Auth"
import Contact from "./Common/Pages/Contact"
import Careers from "./Common/Pages/Careers"
import Books from "./Users/Pages/Books"
import Profile from "./Users/Pages/Profile"
import ViewBook from "./Users/Pages/ViewBook"
import AdminDashboard from "./Admin/Pages/AdminDashboard"
import AdminBooks from "./Admin/Pages/AdminBooks"
import AdminCareers from "./Admin/Pages/AdminCareers"
import AdminSettings from "./Admin/Pages/AdminSettings"
import Pnf from "./Common/Pages/Pnf"
import { useContext, useEffect, useState } from "react"
import PreLoader from "./Common/Pages/PreLoader"
import { ToastContainer } from 'react-toastify'
import PaymentSuccess from './Common/Pages/PaymentSuccess'
import PaymentError from './Common/Pages/PaymentError'
import { userAuthContext } from './ContextAPI/AuthContext'

function App() {
  const [loading, setLoading] = useState(true)
  const { role } = useContext(userAuthContext)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }, [])

  return (
    <>
      <Routes>
        {/* common */}
        <Route path='/' element={loading ? <PreLoader /> : <Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/careers' element={<Careers />} />

        {/* user */}
        {role == "user" &&
          <>
            < Route path='/books' element={<Books />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/view/:id/book' element={<ViewBook />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/payment-error' element={<PaymentError />} />
          </>
        }

        {/* admin */}
        {role == "Admin" &&
          <>
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/admin-books' element={<AdminBooks />} />
            <Route path='/admin-careers' element={<AdminCareers />} />
            <Route path='/admin-settings' element={<AdminSettings />} />
          </>}

        <Route path='/*' element={<Pnf />} />

      </Routes>
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
    </>
  )
}

export default App
