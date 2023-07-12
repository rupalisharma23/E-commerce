import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useCart } from './CartContextPage';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Cart() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [allcartItems, setAllCartItems] = useState([]);
  const [intialQunatity, setIntialQunatity] = useState(0);
  const [intialQunatities, setIntialQunatities] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
   user && getCartItems();
  }, []);

  const getCartItems = () => {
    return axios(`http://localhost:8080/api/cart/get-cart/${user._id}`, {
      headers: {
        authorization: token
      }
    }).then((res) => {
      setAllCartItems(res.data.allCartItems);
      const initialQuantities = {};
      res.data.allCartItems.forEach((item) => {
        initialQuantities[item._id] = item.quantity;
      });
      setIntialQunatities(initialQuantities);
      
    });
  };

  const getCartCount = () => {
    return axios(`http://localhost:8080/api/cart/get-cart-count/${user._id}`, {
      headers: {
        authorization: token
      }
    }).then((res) => {
      setCart(res.data.length)
    });
  };

  const addToCart = (id,quantity,cartId,size) => {
    return axios.put(`http://localhost:8080/api/cart/update-cart/${cartId}`, {
      cart: id,
      quantity: quantity ,
      userInfo: user._id,
      size
    }, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      toast.success('cart item updated')
      getCartCount()

    }).catch((error)=>{
      toast.error('error in updating')
    })
  }

  const deleteCart = (id) => {
    return axios.delete(`http://localhost:8080/api/cart/delete-cart/${id}`,  {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      getCartItems();
      getCartCount();
      toast.success('cart item delted');
    }).catch((error)=>{
      toast.error('error in deleting')
    })
  }

  const increment = (quantity, index,id) =>{
    let temp = [...allcartItems];
    setIntialQunatity(intialQunatities[id])
    temp[index] = {...temp[index], quantity:temp[index].quantity+1}
    setAllCartItems(temp)
  }

  const decrement = (quantity, index, id) =>{
    let temp = [...allcartItems];
    setIntialQunatity(intialQunatities[id])
    temp[index] = {...temp[index], quantity:temp[index].quantity-1}
    setAllCartItems(temp)
  }

  const totalPrice = () =>{
    let totalPrice = 0;
    allcartItems.map((cart)=>{
      totalPrice = totalPrice + (parseFloat(cart.cart.price) * cart.quantity)
    })
    return totalPrice
  }

  const changeCartSize = (index, size) =>{
    let temp = [...allcartItems];
    temp[index] = { ...temp[index], size: size }
    setAllCartItems(temp)
  }

  return (
    <Layout>
      <h2 className="dashboard_heading">Cart Items</h2>
      <div className="container" style={{ paddingBottom: '6rem' }}>
        {allcartItems.map((cart, index) => {
          return (
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="row no-gutters" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <div
                        className="col-md-4"
                        style={{
                          width: '150px',
                          objectFit: 'contain',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                      <Link
                        key={cart.cart._id}
                        to={`/view-product/${cart.cart.categories._id}/${cart.cart._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <img
                          style={{ height: '100px', objectFit: 'contain' }}
                          src={`http://localhost:8080/api/product/get-photo/${cart.cart._id}?${Date.now()}`}
                          className="card-img"
                          alt="Product Image"
                        />
                      </Link>
                      </div>
                      <div className="col-md-8" style={{ display:'flex', alignItems:'end' }}>
                        <div className="card-body">
                          <h5 className="card-title mb-1">{cart.cart.name}</h5>
                          {/* <p className="card-text card-des">{cart.cart.description}</p> */}
                        <p className="card-text">Price: Rs{cart.cart.price} <p style={{marginBottom:'0rem'}}>Total price: Rs{parseFloat(cart.cart.price) * cart.quantity}</p> </p>
                        <p className="card-text">Category: {cart.cart.categories.name}</p>
                        <p className="card-text" style={{ marginBottom: '1rem' }}>Size: 
                        <Select
                        onChange={(e)=>{changeCartSize(index, e.target.value)}}
                        value={ cart.size }
                            disableUnderline
                            displayEmpty
                            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                            variant="standard"
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ outline: 'none', boxShadow: 'none', marginLeft:'10px', paddingBottom:'0', borderBottom:'1px solid black' }} 
                        >
                            {cart.cart.size && Object.keys(cart.cart.size).map((s)=>{
                              return(
                                <MenuItem value={s} key={s}>{s}</MenuItem>
                              )
                            })}
                        </Select>
                        </p>
                          <div className="input-group">
                            <div className="input-group-prepend">
                            <button className={`btn btn-outline-secondary bg-dark text-light ${cart.quantity === 1 ? 'disabled' : ''}`} style={{ padding: '0 1rem', marginRight: '1rem' }} type="button" onClick={() => { decrement(cart.quantity, index, cart._id) }} >
                                -
                              </button>
                            </div>
                            {cart.quantity}
                            <div className="input-group-append">
                            <button className="btn btn-dark text-light" style={{ padding: '0 1rem', marginLeft: '1rem' }} type="button" onClick={() => { increment(cart.quantity, index, cart._id) }}>
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="card-body" style={{textAlign:'end'}}>
                        <button className="btn btn-dark text-light" style={{ padding: '0 1rem' }} onClick={() => { addToCart(cart.cart._id, cart.quantity, cart._id, cart.size) }}>
                            Save
                          </button>
                        <i className="fas fa-trash" style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => { deleteCart(cart._id) }} ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          );
        })}
        {totalPrice()}
      </div>
    </Layout>
  );
}
