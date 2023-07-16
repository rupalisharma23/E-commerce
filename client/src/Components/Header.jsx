import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContextPage';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function Header() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    useEffect(() => {
        (user && user.role == 0) && getCartCount();
    }, []);

    const getCartCount = () => {
        return axios(`http://localhost:8080/api/cart/get-cart-count/${user._id}`, {
            headers: {
                authorization: token
            }
        }).then((res) => {
            setCart(res.data.length)
        });
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand" href="#">Ecommerece</Link>
                <i className="fas fa-bars sidebarActive" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" />
                <div className="offcanvas offcanvas-end bg-dark sidebarActive " data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div class="offcanvas-header" style={{ paddingBottom: '0', display: 'flex', justifyContent: 'end' }}>
                        <i className="fas fa-times text-light" data-bs-dismiss="offcanvas" aria-label="Close"></i>
                    </div>
                    <div className="offcanvas-body" style={{ paddingTop: '0', width: '50%' }}>
                        {!user || user?.role == 0 ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink style={{ width: 'max-content' }} to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ width: 'max-content' }} to='/Search' className="nav-link" href="#" >
                                    Search
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ width: 'max-content' }} to='/Product' className="nav-link" href="#">Products</NavLink>
                            </li>
                            {user && <li className="nav-item">
                                <NavLink style={{ width: 'max-content' }} to='/OrderUser' className="nav-link" href="#">Orders</NavLink>
                            </li>}
                            {user && <li className="nav-item" style={{ position: 'relative' }}>
                                <NavLink style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: 'max-content' }} to='/Cart' className="nav-link" href="#">Cart {cart > 0 && <div className='batch' style={{ position: 'unset' }}>{cart}</div>} </NavLink>
                            </li>}
                            {!user ? <> <li className="nav-item">
                                <NavLink style={{ width: 'max-content' }} to='/Login' className="nav-link" href="#">Login</NavLink>
                            </li>
                                <li className="nav-item">
                                    <NavLink style={{ width: 'max-content' }} to='/Register' className="nav-link" href="#">Register</NavLink>
                                </li></> : <li className="nav-item">
                                <NavLink style={{ width: 'max-content' }} to='/update' className="nav-link" href="#" onClick={() => { navigate('/update'); }}>Profile</NavLink>
                            </li>}
                        </ul> :
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink style={{ width: 'max-content' }} to='/Dashboard' className="nav-link" aria-current="page" href="#">Dashboard</NavLink>
                                </li>
                                <li className="nav-item ">
                                    <NavLink style={{ width: 'max-content' }} to='/Search' className="nav-link" href="#">
                                        Search
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={{ width: 'max-content' }} to='/Product' className="nav-link" href="#">Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={{ width: 'max-content' }} to='/Order' className="nav-link" href="#">Orders</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/Register' className="nav-link" href="#">Create</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={{ width: 'max-content' }} to='/update' className="nav-link" href="#" onClick={() => { navigate('/update'); }}>Profile</NavLink>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    {!user || user?.role == 0 ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/Search' className="nav-link" href="#" >
                                <i className="fas fa-search" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/Product' className="nav-link" href="#">Products</NavLink>
                        </li>
                        {user && <li className="nav-item">
                            <NavLink to='/OrderUser' className="nav-link" href="#">Orders</NavLink>
                        </li>}
                        {user && <li className="nav-item" style={{ position: 'relative' }}>
                            <NavLink to='/Cart' className="nav-link" href="#"><i class="fas fa-shopping-cart"></i> {cart > 0 && <div className='batch'>{cart}</div>} </NavLink>
                        </li>}
                        {!user ? <> <li className="nav-item">
                            <NavLink to='/Login' className="nav-link" href="#">Login</NavLink>
                        </li>
                            <li className="nav-item">
                                <NavLink to='/Register' className="nav-link" href="#">Register</NavLink>
                            </li></> : <li className="nav-item">
                            <NavLink to='/update' className="nav-link" href="#" onClick={() => { navigate('/update'); }}><i class="fas fa-user"></i></NavLink>
                        </li>}
                    </ul> :
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                                <NavLink to='/Search' className="nav-link" href="#">
                                    <i className="fas fa-search" />
                                </NavLink>
                            </li>
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
                                <NavLink to='/update' className="nav-link" href="#" onClick={() => { navigate('/update'); }}><i class="fas fa-user"></i></NavLink>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}
