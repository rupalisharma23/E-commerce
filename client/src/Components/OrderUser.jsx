import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

export default function OrderUser() {
    const [allOrders, setAllOrders] = useState([]);
    const [loader, setLoader] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    useEffect(() => {
        getAllOrders()
    }, [])

    const getAllOrders = () => {
        setLoader(true)
        return axios.get(`http://localhost:8080/api/order/get-orders/${user._id}`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setLoader(false)
            setAllOrders(res.data.allOrders)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Layout>
            <div className="container" style={{ paddingBottom: '6rem' }}>
                <div className='dashboard_heading' style={{ marginBottom: '1rem', justifyContent: 'start' }}>{allOrders.length>0 && "Orders"}</div>
                {loader ? <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}><CircularProgress style={{ color: 'black' }} /></div> : allOrders.length == 0 ? <div className="emptyCart">
                    <h2 >you have no orders</h2>
                    <button className='btn btn-dark text-light shippingSubClass' style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase', marginBottom: '1rem', width: '280px' }} onClick={() => { navigate('/') }} >Continue shopping</button>
                </div> : <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Details</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((items, index) => {
                            return (
                                items.product.map((details, index1) => {
                                    return (
                                        <tr>
                                            <th scope="row" style={{ verticalAlign: 'middle' }} ><Link
                                                key={details._id}
                                                to={`/view-product/${details.cart.categories._id}/${details.cart._id}`}
                                                style={{ textDecoration: 'none' }}
                                            > <img src={`http://localhost:8080/api/product/get-photo/${details.cart._id}?${Date.now()}`} class="card-img-top" style={{ height: '70px', width: '50px', objectFit: 'contain' }} alt="Product 1" /></Link></th>
                                            <td>
                                                <div className='details_class'>
                                                    <span>{details.cart.name}</span>
                                                    <span>{details.cart.categories.name}</span>
                                                    {details.size && <span>Size: {details.size}</span>}
                                                    <span>Quantity: {details.quantity}</span>
                                                    <span>Price: Rs{details.cart.price * details.quantity}</span>
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '13px', fontWeight: '600' }}>{moment(details.createdAt).format('DD/MM/YYYY')}</td>
                                            <td style={{ fontSize: '13px', fontWeight: '600', color: details.status == 'Not processed' ? 'orange' : details.status == 'processed' ? 'yellow' : details.status == 'cancelled' ? 'red' : 'green' }}>{details.status}</td>
                                        </tr>
                                    )
                                })
                            )
                        })}
                    </tbody>
                </table>}
            </div>
        </Layout>
    )
}
