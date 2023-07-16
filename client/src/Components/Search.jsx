import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backendURL from './config';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [seachedLength, setSeachedLength] = useState('');
    const [flag, setFlag] = useState(false);
    const [allProduct, setAllProducts] = useState([]);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        getProducts();
    };

    useEffect(()=>{
       if(!searchQuery){
        setAllProducts([]);
        setFlag(false)
       }
    }, [searchQuery])

    const getProducts = () => {
        return axios.get(`${backendURL}/api/product/search/${searchQuery}`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setFlag(true)
            setAllProducts(res.data.allProduct)
            setSeachedLength(res.data.length)
        })
    }

    return (
        <Layout>
            <div className="d-flex" style={{paddingBottom:'6rem'}} >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h2 className="dashboard_heading">Search</h2>
                            <form onSubmit={handleSearchSubmit}>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        style={{ border: '1px solid #4FC3F7' }}
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    />
                                    <button className="btn text-light bg-dark" type="submit">Search</button>
                                </div>
                            </form>
                        </div>
                        <div class="container" style={{marginBottom:'2rem', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                            {flag && (allProduct.length > 0 ? <div style={{ fontSize: '15px', marginBottom: '1rem' }} className='dashboard_heading'>found {seachedLength}</div> : <div style={{ fontSize: '15px', marginBottom: '1rem' }} className='dashboard_heading'>no result found</div>) }
                            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 box-of-search">
                                {allProduct.map((product) => {
                                    return (
                                        <Link key={product._id} to={user?.role == 1 ? `/update-product/${product._id}` : `/view-product/${product._id}`} style={{ textDecoration: 'none' }} >
                                            <div class="col">
                                                <div class="card">
                                                    <img src={`${backendURL}/api/product/get-photo/${product._id}?${Date.now()}`} class="card-img-top" style={{ height: '300px', objectFit: 'contain' }} alt="Product 1" />
                                                    <div class="card-body">
                                                        <div class="card-title">{product.name}</div>
                                                        <p class="card-text">Price: {product.price}</p>
                                                        <p class="card-des">{product.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
