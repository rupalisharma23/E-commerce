import React, { useState } from 'react'
import Layout from './Layout';
import './Register.css';
import { toast } from "react-toastify";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    return axios.post(`http://localhost:8080/api/auth/login`, { email, password }).then((res) => {
      toast.success('registration successfull');
      localStorage.setItem('user', JSON.stringify(res.data.user) )
      localStorage.setItem('token', res.data.tocken)
      navigate(res.data.user.role == 0 ? '/' :'/Dashboard')
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
                  <h3 className="card-title text-center title">Login</h3>
                  <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control mt-1" id="email" required placeholder="Enter your email.." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control mt-1" id="password" required placeholder="Enter your password.." />
                    </div>
                    <div className='text-center'><button type="submit" className="btn text-light bg-dark">Login</button></div>
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
