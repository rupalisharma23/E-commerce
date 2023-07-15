import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useCart } from './CartContextPage';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function Cart() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [allcartItems, setAllCartItems] = useState([]);
  const [intialQunatity, setIntialQunatity] = useState(0);
  const [intialQunatities, setIntialQunatities] = useState({});
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState('')
  const [cart, setCart] = useCart();
  const [showDropIn, setShowDropIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutDailog, setCheckoutDailog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    user && getCartItems();
  }, []);

  useEffect(() => {
    toGetTokenBrainTree();
  }, [token]);

  const getCartItems = () => {
    return axios.get(`http://localhost:8080/api/cart/get-cart/${user._id}`, {
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
    return axios.get(`http://localhost:8080/api/cart/get-cart-count/${user._id}`, {
      headers: {
        authorization: token
      }
    }).then((res) => {
      setCart(res.data.length)
    });
  };

  const addToCart = (id, quantity, cartId, size) => {
    return axios.put(`http://localhost:8080/api/cart/update-cart/${cartId}`, {
      cart: id,
      quantity: quantity,
      userInfo: user._id,
      size
    }, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      toast.success('cart item updated')
      getCartCount()

    }).catch((error) => {
      toast.error('error in updating')
    })
  }

  const deleteCart = (id) => {
    return axios.delete(`http://localhost:8080/api/cart/delete-cart/${id}`, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      getCartItems();
      getCartCount();
      toast.success('cart item delted');
    }).catch((error) => {
      toast.error('error in deleting')
    })
  }

  const toGetTokenBrainTree = () => {
    return axios.get(`http://localhost:8080/api/product/braintree/token`, {
      headers: {
        authorization: token
      }
    }).then((res) => {
      setClientToken(res.data.clientToken)
    });
  }

  const increment = (quantity, index, id) => {
    let temp = [...allcartItems];
    setIntialQunatity(intialQunatities[id])
    temp[index] = { ...temp[index], quantity: temp[index].quantity + 1 }
    setAllCartItems(temp)
  }

  const decrement = (quantity, index, id) => {
    let temp = [...allcartItems];
    setIntialQunatity(intialQunatities[id])
    temp[index] = { ...temp[index], quantity: temp[index].quantity - 1 }
    setAllCartItems(temp)
  }

  const totalPrice = () => {
    let totalPrice = 0;
    allcartItems.map((cart) => {
      totalPrice = totalPrice + (parseFloat(cart.cart.price) * cart.quantity)
    })
    return totalPrice
  }

  const changeCartSize = (index, size) => {
    let temp = [...allcartItems];
    temp[index] = { ...temp[index], size: size }
    setAllCartItems(temp)
  }

  const handleBuyClick = () => {
    setCheckoutDailog(true)
    setShowDropIn(true);
  };

  const handelPayment = async () => {
    try {
      setLoading(true)
      let total = totalPrice()

      const { nonce } = instance.requestPaymentMethod();

      const { data } = await axios.post('http://localhost:8080/api/product/braintree/payment', {
        cart: allcartItems, nonce, total, user
      }, {
        headers: {
          Authorization: token
        }
      })
      setLoading(false)
      setAllCartItems([]);
      toast.success('success');
      navigate('/OrderUser')
    }
    catch (error) {
      setLoading(false)
      console.log(error);
      toast.success('error')
    }

  }

  return (
    <Layout>
      <h2 className="dashboard_heading">{allcartItems.length > 0 && "Cart Items"}</h2>
      <div className="container" style={{ paddingBottom: '6rem' }}>
        {allcartItems.length == 0 ? <div className="emptyCart">
          <h2 >Your cart is empty</h2>
          <button className='btn btn-dark text-light shippingSubClass' style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase', marginBottom: '1rem', width:'280px' }} onClick={()=>{navigate('/')}} >Continue shopping</button>
        </div>:
        <>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Details</th>
              <th scope="col" className='toggleMobileDesktop'>Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allcartItems.map((cart, index) => {
              return (
                <tr>
                  <th scope="row" style={{ verticalAlign: 'middle' }} >
                    <Link
                      key={cart.cart._id}
                      to={`/view-product/${cart.cart.categories._id}/${cart.cart._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        style={{ height: '70px', width: '50px', objectFit: 'contain' }}
                        src={`http://localhost:8080/api/product/get-photo/${cart.cart._id}?${Date.now()}`}
                        className="card-img"
                        alt="Product Image"
                      />
                    </Link>
                  </th>
                  <td>
                    <div className='details_class'>
                      <span>{cart.cart.name}</span>
                      <span>{cart.cart.categories.name}</span>
                      <span>Price: Rs{cart.cart.price}</span>
                      {cart.size && <span>Size:
                        <Select
                          onChange={(e) => { changeCartSize(index, e.target.value) }}
                          value={cart.size}
                          disableUnderline
                          displayEmpty
                          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                          variant="standard"
                          inputProps={{ 'aria-label': 'Without label' }}
                          style={{ outline: 'none', boxShadow: 'none', marginLeft: '10px', paddingBottom: '0', borderBottom: '1px solid black', marginBottom: '0.5rem', fontSize:'13px' }}
                        >
                          {cart.cart.size && Object.keys(cart.cart.size).map((s) => {
                            return (
                              <MenuItem style={{ fontSize: '13px', paddingBottom:'0' }} value={s} key={s}>{s}</MenuItem>
                            )
                          })}
                        </Select>
                      </span>}
                      <div className="input-group displayActive">
                        <div className="input-group-prepend">
                          <button className={`btn btn-outline-secondary bg-light text-dark ${cart.quantity === 1 ? 'disabled' : ''}`} style={{ padding: '0 1rem', marginRight: '0.3rem' }} type="button" onClick={() => { decrement(cart.quantity, index, cart._id) }} >
                            -
                          </button>
                        </div>
                        {cart.quantity}
                        <div className="input-group-append">
                          <button className="btn btn-outline-secondary bg-light text-dark" style={{ padding: '0 1rem', marginLeft: '0.3rem' }} type="button" onClick={() => { increment(cart.quantity, index, cart._id) }}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: '13px', fontWeight: '600' }} className='toggleMobileDesktop'>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button className={`btn btn-outline-secondary bg-light text-dark ${cart.quantity === 1 ? 'disabled' : ''}`} style={{ padding: '0 1rem', marginRight: '1rem' }} type="button" onClick={() => { decrement(cart.quantity, index, cart._id) }} >
                          -
                        </button>
                      </div>
                      {cart.quantity}
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary bg-light text-dark" style={{ padding: '0 1rem', marginLeft: '1rem' }} type="button" onClick={() => { increment(cart.quantity, index, cart._id) }}>
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: '13px', fontWeight: '600' }}>
                    <button className="btn btn-dark text-light" style={{ padding: '0 1rem' }} onClick={() => { addToCart(cart.cart._id, cart.quantity, cart._id, cart.size) }}>
                      Save
                    </button>
                    <i className="fas fa-trash" style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => { deleteCart(cart._id) }} ></i>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
          <div className='shippingClass'>
            <span className='shippingSubClass'>Product details ({allcartItems.length} items) </span>
            <span className='shippingSubClass'>Subtotal: <span>&#8377;{totalPrice()}</span> </span>
            <span className='shippingSubClass'>Shipping: <span>+ &#8377;50</span> </span>
            <span className='shippingSubClass' style={{ borderBottom: '1px dashed black', paddingBottom: '0.5rem' }}>Discount: <span style={{color:'green'}}>- &#8377;50</span> </span>
            <span className='shippingSubClass' style={{fontSize:'23px', fontWeight:'900'}}>Total: <span>&#8377;{totalPrice()}</span> </span>
            <button className='btn btn-dark text-light shippingSubClass' style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase', marginBottom:'1rem' }} onClick={handleBuyClick} >proceed to pay</button>
          </div>
        </div>
          </>
        }
      </div>
      <Dialog open={checkoutDailog} PaperProps={{
        style: {
          width: '25rem',
          height: 'auto'
        },
      }} onClose={()=>{setCheckoutDailog(false)}} maxWidth="md">
        <DialogTitle style={{ textAlign: 'center', padding: '1rem', position: 'relative', fontFamily: 'Lato', paddingBottom:'0', fontWeight:'600' }}>PLACE ORDER
          <i
            className="fas fa-times"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
            onClick={() => { setCheckoutDailog(false) }}
          ></i>
        </DialogTitle>
        <DialogContent>
          <div id={"braintree-drop-in-div"}>
            {showDropIn && clientToken && (
              <div>
                <DropIn
                  options={{
                    authorization: clientToken,
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <div style={{display:'flex', justifyContent:'center'}}><button className='btn btn-dark text-light' disabled={!instance || !user?.address} onClick={() => { handelPayment() }} >{loading ? 'processing...' : 'buy'}</button></div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

