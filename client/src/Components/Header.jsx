import React,{useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContextPage';
import axios from 'axios';

export default function Header() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cart, setCart] = useCart();

    useEffect(() => {
     ( user && user.role ==0) &&  getCartCount();
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

    const handleSearchOpen = () => {
        setSearchOpen(true);
    };

    const handleSearchClose = () => {
        setSearchOpen(false);
        setSearchValue('');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search submit logic here
        console.log('Search submitted:', searchValue);
        setSearchValue('');
    };
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
                        <li className="nav-item">
                            <NavLink to='/OrderUser' className="nav-link" href="#">Orders</NavLink>
                        </li>
                        <li className="nav-item" style={{position:'relative'}}>
                            <NavLink to='/Cart' className="nav-link" href="#"><i class="fas fa-shopping-cart"></i> {cart>0 && <div className='batch'>{cart}</div>} </NavLink>
                        </li>
                        {!user ? <> <li className="nav-item">
                            <NavLink to='/Login' className="nav-link" href="#">Login</NavLink>
                        </li>
                            <li className="nav-item">
                                <NavLink to='/Register' className="nav-link" href="#">Register</NavLink>
                            </li></> : <li className="nav-item">
                                <NavLink to='/update' className="nav-link" href="#" onClick={() => { navigate('/update');  }}><i class="fas fa-user"></i></NavLink>
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
