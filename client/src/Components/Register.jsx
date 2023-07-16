import React,{useState} from 'react'
import Layout from './Layout';
import './Register.css';
import { toast } from "react-toastify";
import axios from 'axios';
import backendURL from './config';
import { useNavigate} from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) =>{
    e.preventDefault();
    return axios.post(`${backendURL}/api/auth/register`,{name,email,address,phone,password,role:user?1:0}).then((res)=>{
      user ? toast.success('Admin added'): toast.success('registration successfull');
      !user && navigate('/Login')
    }).catch((error)=>{
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
                  <h3 className="card-title text-center title">{ user? "Add admin" : "Registration Form"}</h3>
                  <form onSubmit={(e) => { handleSubmit(e) } }>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control mt-1" id="name" required placeholder="Enter your name..."  />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control mt-1" id="email" required placeholder="Enter your email.." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control mt-1" id="password" required placeholder="Enter your password.." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control mt-1" id="phone" required placeholder="Enter your phone number.." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control mt-1" id="address" required placeholder="Enter your address.." />
                    </div>
                    <div className='text-center'><button type="submit" className="btn text-light bg-dark">{ user? "Create": "Register"}</button></div> 
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
