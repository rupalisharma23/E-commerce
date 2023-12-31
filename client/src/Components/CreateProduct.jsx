import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { toast } from "react-toastify";
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import backendURL from './config';

export default function CreateProduct() {
    const [categoriesArray, setCategoriesArray] = useState([]);
    const[name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [photo, setPhoto] = useState('');
    const [categories, setCategories] = useState('');
    const [shipping, setShipping] = useState('');
    const [sizes, setSizes] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate()


    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        return axios.get(`${backendURL}/api/category/categories`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setCategoriesArray(res.data.categories)
        })
    }

    const FunctionToCreateProduct = (e) => {
        e.preventDefault();
        let size = {};
        let temp =  sizes.split(',').filter((i) => { return i !== '' });
        temp.forEach((s,index)=>{
            size[s] = s
        })
        const productData = new FormData();
        productData.append('name',name)
        productData.append('description', description)
        productData.append('price', price)
        productData.append('quantity', quantity)
        productData.append('photo', photo)
        productData.append('categories', categories._id)
        productData.append('shipping', shipping)
        productData.append('size', JSON.stringify(size))
        return axios.post(`${backendURL}/api/product/create-product`, productData, {
            headers: {
                Authorization: token,
                "Content-Type":'multipart/form-data'
            }
        }).then((res) => {
            toast.success(res.data.message);
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setPhoto('');
            setShipping('');
            setCategories('');
            navigate('/Product')
        }).catch((error)=>{
            toast.error(error.response.data.error)
        })
    }

    return (
        <Layout>
            <div className="container-fluid" style={{paddingBottom:'6rem'}}>
                <div className="dashboard_heading">Create product</div>
                <div className="table-responsive-sm container1_createProduct mt-4">
                    <Select bodered="false" placeholder='select a category'
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            PaperProps: {
                                style: {
                                    borderRadius: '9px',
                                },
                            },
                        }}
                        disableUnderline
                        displayEmpty
                        value={categories}
                        renderValue={(selected) => {
                            if (!selected) {
                                return 'Select a category'; 
                            }
                            return selected.name;
                        }}
                        onChange={(event) => {
                            setCategories(event.target.value);
                        }} 
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{ backgroundColor: 'white', width: '55%', fontFamily: 'Lato', height: '2.3rem', borderRadius: '9px', border: '1px solid #4FC3F7', outline: 'none', boxShadow: 'none' }} >
                        <MenuItem disabled selected value='' style={{ display: 'none' }}>Select a category</MenuItem>
                        {categoriesArray?.map((items)=>{
                        return(
                            <MenuItem key={items._id} value={items} >
                                {items.name}
                            </MenuItem>
                        )
                    })}
                    </Select>
                    <div style={{ backgroundColor: 'white', width: '55%', fontFamily: 'Lato', height: '2.3rem', borderRadius: '9px', outline: 'none', boxShadow: 'none' }}>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control mt-1" id="name" required placeholder="Enter product name..." style={{ border: ' 1px solid #4FC3F7', borderRadius: '7px' }} />
                    </div>
                    <div style={{ backgroundColor: 'white', width: '55%', fontFamily: 'Lato', height: '2.3rem', borderRadius: '9px', outline: 'none', boxShadow: 'none' }}>
                        <input type="text" value={sizes} onChange={(e) => { setSizes(e.target.value) }} className="form-control mt-1" id="name" required placeholder="Enter size..." style={{ border: ' 1px solid #4FC3F7', borderRadius: '7px' }} />
                    </div>
                    <div style={{ backgroundColor: 'white', width: '55%', fontFamily: 'Lato', borderRadius: '9px', outline: 'none', boxShadow: 'none' }}>
                        <textarea type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control mt-1" id="name" required placeholder="description..." style={{ border: ' 1px solid #4FC3F7', borderRadius:'7px' }} />
                    </div>
                    <Select bodered="false" placeholder='select a category'
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            PaperProps: {
                                style: {
                                    borderRadius: '9px',
                                },
                            },
                        }}
                        disableUnderline
                        displayEmpty
                        value={shipping}
                        renderValue={(selected) => {
                            if (!selected) {
                                return 'shipping status';
                            }
                            return selected;
                        }}
                        onChange={(event) => {
                            setShipping(event.target.value);
                        }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{ backgroundColor: 'white', width: '55%', fontFamily: 'Lato', height: '2.3rem', borderRadius: '9px', border: '1px solid #4FC3F7', outline: 'none', boxShadow: 'none' }} >
                        <MenuItem disabled selected value='' style={{ display: 'none' }}>shipping status</MenuItem>
                        <MenuItem  value='yes' >yes</MenuItem>
                        <MenuItem  value='no' >no</MenuItem>
                        
                    </Select>
                    <div style={{ backgroundColor: 'white', width: '55%', fontFamily: 'Lato', }}>
                        <input type="number" name="" id="" placeholder="enter price" value={price} onChange={(e) => { setPrice(e.target.value) }} className="form-control mt-1" style={{ border: ' 1px solid #4FC3F7', borderRadius: '7px',  height: '2.3rem', marginBottom: '1.5rem' }} />
                        <input type="number" name="" id="" placeholder="enter quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} className="form-control mt-1" style={{ border: ' 1px solid #4FC3F7', borderRadius: '7px',  height: '2.3rem' }} />
                    </div>
                    <div style={{ width: '54%', marginBottom: photo? '0rem':'1.5rem' }} >
                        <label className='btn btn-outline-secondary bg-dark text-light'>
                            {photo ? photo.name : "Upload image"}
                            <input type="file" name="" id="" accept='image/*'
                                onChange={(e) => { setPhoto(e.target.files[0]) }} hidden />
                        </label>
                    </div>
                    {photo && (<div style={{ width: '54%'}}>
                        <div>
                            <img src={URL.createObjectURL(photo)} alt="" height='200px' className='img img-responsive' />
                        </div>
                    </div>)}
                    <div className=' text-center' style={{ width: '54%', marginBottom: photo ? '0rem' : '1.5rem', marginBottom: '1.5rem' }} >
                        <button className='btn btn-outline-secondary bg-dark text-light' onClick={FunctionToCreateProduct} > Create </button>
                </div>
                </div>
            </div>
        </Layout>
    )
}
