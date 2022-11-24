import { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
// import Orders from '../pages/Orders'
// import OrdersAdmin from '../pages/admin/Orders'
 import Parents from '../pages/parents/Parents';
import Darzelis from '../pages/admin/school/Darzelis'
import NewDarzelis from '../pages/admin/school/NewDarzelis'
import EditDarzelis from '../pages/admin/school/DarzelisEdit'

const Router = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if(token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    const logoutUser = () => {
        setUser({
            loggedIn: false
        })
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                
                {!user.loggedIn && <Route path="/login" element={<Login setUser={setUser} />} /> }
                {!user.loggedIn && <Route path="/register" element={<Register />} /> }
                 {user.loggedIn && user.role === '0' && (
                    <>
                        {/* <Route path="/admin/orders" element={<OrdersAdmin />} />  */}
                       
                        <Route path="/admin/darzelis" element={<Darzelis />} /> 
                        <Route path="/admin/darzelis/new" element={<NewDarzelis />} /> 
                        <Route path="/admin/darzelis/edit/:id" element={<EditDarzelis />} /> 
                    </>
                )}
                {user.loggedIn && (
                    <>
                        <Route path="/parents/parents" element={<Parents/>} /> 
                        {/* <Route path="/parents/parents/new" element={<NewParents />} /> 
                        <Route path="/parents/parentsedit/:id" element={<EditParents />} />  */}
                    </>
                )} 
                <Route path="/logout" element={<Logout logoutUser={logoutUser} />} /> 
            </Routes>
        </BrowserRouter>
    )
}

export default Router