import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if (token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    return (
        <header className="navbar-dark bg-dark">
            <div className="container d-flex justify-content-between">
                <div className=" "></div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                         {!user.loggedIn && (
                            <>
                                <li><Link to="/login"><i className="bi bi-box-arrow-in-right me-2"></i>Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                        {user.loggedIn && (
                            <>
                                <li><Link to="/orders">Your Request  </Link></li> 

                                <li><Link to="/parents/parents">Parents  </Link></li>
                                <li><Link to="/logout"><i className="bi bi-box-arrow-in-left me-2"></i>
                                    Logout</Link></li>
                            </>
                        )}
                        {user.loggedIn && user.role === '0' && (
                            <>
                                <li>
                                    <Link to="/admin/darzelis">Admin</Link>
                                    <ul>
                                        <li><Link to="/admin/orders">Request</Link></li>
                                        <li><Link to="/admin/darzelis">School</Link></li>
                                        {/* <li><Link to="/admin/countries">Countries</Link></li> */}
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header