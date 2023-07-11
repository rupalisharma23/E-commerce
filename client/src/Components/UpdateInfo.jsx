import React, { useState } from 'react'
import Layout from './Layout';
import './Register.css';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        return axios.put(`http://localhost:8080/api/user/edit-user/${user._id}`, { name, email, address, phone }, {
            headers: {
                Authorization: token
            }}).then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data.user) )
                toast.success(res.data.message)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }

  return (
      <Layout>
          <div className="register">
              <div className="container container2">
                  <div className="row justify-content-center">
                      <div className="col-md-6">
                          <div className="card shadow-lg">
                              <div className="card-body">
                                  <h3 className="card-title text-center title">{user ? "Add admin" : "Registration Form"}</h3>
                                  <form onSubmit={(e) => { handleSubmit(e) }}>
                                      <div className="form-group">
                                          <label htmlFor="name">Name</label>
                                          <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control mt-1" id="name" required placeholder="Enter your name..." />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="email">Email address</label>
                                          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control mt-1" id="email" required placeholder="Enter your email.." />
                                      </div>
                                      {/* <div className="form-group">
                                          <label htmlFor="password">Password</label>
                                          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control mt-1" id="password" required placeholder="Enter your password.." />
                                      </div> */}
                                      <div className="form-group">
                                          <label htmlFor="phone">Phone Number</label>
                                          <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control mt-1" id="phone" required placeholder="Enter your phone number.." />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="address">Address</label>
                                          <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control mt-1" id="address" required placeholder="Enter your address.." />
                                      </div>
                                      <div className='text-center'><button type="submit" className="btn text-light bg-dark">update</button><button type="submit" className="btn text-light bg-dark" style={{ marginLeft: '10px' }} onClick={() => { navigate('/Login') ;localStorage.clear(); window.location.reload(); }} >Logout</button></div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>
  )
}
