import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand" href="#">Ecommerece</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    {!user || user?.role == 0 ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/Cart' className="nav-link" href="#">Cart</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to='/CategoriesUser' className="nav-link" href="#">Categories</NavLink>
                        </li> */}
                        {!user ? <> <li className="nav-item">
                            <NavLink to='/Login' className="nav-link" href="#">Login</NavLink>
                        </li>
                            <li className="nav-item">
                                <NavLink to='/Register' className="nav-link" href="#">Register</NavLink>
                            </li></> : <li className="nav-item">
                            <NavLink to='/Login' className="nav-link" href="#" onClick={() => { navigate('/Login'); localStorage.clear(); window.location.reload(); }}>Logout</NavLink>
                        </li>}

                    </ul> :
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/Dashboard' className="nav-link" aria-current="page" href="#">Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/Product' className="nav-link" href="#">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/Order' className="nav-link" href="#">Orders</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/Register' className="nav-link" href="#">Create</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/Login' className="nav-link" href="#" onClick={() => { navigate('/Login'); localStorage.clear(); window.location.reload(); }}>Logout</NavLink>
                            </li>

                        </ul>
                    }
                </div>
            </div>
        </nav>

    )
}
