import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import axios from 'axios';
import moment from 'moment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

export default function Order() {

  const[allOrders,setAllOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(()=>{
    getAllOrders()
  },[])

  const getAllOrders = () =>{
    return axios.get(`http://localhost:8080/api/order/get-all-orders`,{
      headers:{
        Authorization: token
      }
    }).then((res)=>{
      setAllOrders(res.data.allOrders)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const statusChangeApi = (id, productId,status) =>{
    return axios.post(`http://localhost:8080/api/order/change-status/${id}`,{
      productId,status
    },{
      headers:{
        Authorization: token
      }
    }).then((res)=>{
      toast.success('status updated')
      
    }).catch((error)=>{
      console.log(error)
      toast.error('error')
    })
  }

  const changeStatus = (index,index1,value) =>{
    let temp = [...allOrders]
    allOrders[index].product[index1] = { ...allOrders[index].product[index1], status:value }
    setAllOrders(temp)
  }

  return (
    <Layout>
      <div className="container" style={{paddingBottom:'6rem'}}>
        <div className='dashboard_heading' style={{marginBottom:'1rem', justifyContent:'start'}}>Orders</div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Details</th>
              <th scope="col">Buyer</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((items, index)=>{
              return(
                items.product.map((details, index1)=>{
                  return(
                    <tr>
                      <th scope="row" style={{verticalAlign:'middle'}} >
                        <Link
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
                        <span>Date: {moment(details.createdAt).format('DD/MM/YYYY')}</span>
                        </div>
                        </td>
                      <td style={{ fontSize: '13px', fontWeight: '600' }}>
                        <div className='details_class'>
                          <span>{items.buyer.email }</span>
                          <span>Name: {items.buyer.name }</span>
                          <span>Phone: {items.buyer.phone }</span>
                        </div>
                      </td>
                      {/* <td style={{ fontSize: '13px', fontWeight: '600' }}>{details.status}</td> */}
                      <td style={{ fontSize: '13px', fontWeight: '600' }}>
                        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <Select
                          onChange={(e) => { changeStatus(index, index1, e.target.value) }}
                          value={details.status}
                          disableUnderline
                          displayEmpty
                          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                          variant="standard"
                          inputProps={{ 'aria-label': 'Without label' }}
                          style={{ outline: 'none', boxShadow: 'none', paddingBottom: '0', borderBottom: '1px solid black', fontSize: '13px', fontFamily: 'Lato', fonrWeight:'600', width:'70%' }}
                        >
                          <MenuItem style={{fontSize:'13px'}} value='Not processed'>Not processed</MenuItem>
                          <MenuItem style={{ fontSize: '13px' }} value='processed'>processed</MenuItem>
                          <MenuItem style={{ fontSize: '13px' }} value='delivered'>delivered</MenuItem>
                          <MenuItem style={{ fontSize: '13px' }} value='cancelled'>cancelled</MenuItem>
                            
                        </Select>
                          <button className="btn btn-dark text-light" onClick={() => { statusChangeApi(items._id, details._id ,details.status)}} style={{ padding: '0 1rem', width:'75px' }}>save</button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
