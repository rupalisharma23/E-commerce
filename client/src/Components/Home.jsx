import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [allProduct, setAllProducts] = useState([]);
  const [loader,setLoader] = useState(false)
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    getCategories();
    getProducts();
  }, [])

  const getCategories = () => {
    return axios.get('http://localhost:8080/api/filter/getFilters').then((res) => {
      setCategoriesArray(res.data.categories)
    })
  }

  const getProducts = () => {
    setLoader(true)
    return axios.get(`http://localhost:8080/api/product/get-product/1`, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setLoader(false)
      setAllProducts(res.data.allProduct)
    })
  }
 
  return (
    <Layout>
      <div className="image-container">
        <img src='banner4.jpg' alt="image" className="responsive-image sidebarActive" />
        <img src='banner5.png' alt="image" className="responsive-image desktopBanner" />
       </div>
       <div className='container' style={{paddingBottom:'6rem'}} >
        <h3 className='dashboard_heading' style={{marginBottom:'1rem'}}>
          Categories
        </h3>
        <div className='categoriesDesign'>
          {categoriesArray?.map((items) => {
            return (
              <div style={{textAlign:'center', cursor:'pointer'}}>
                <Link to={`/categories/${items._id}`}><img className='category-responisve-image' src={items.name + '.png'} alt="" /></Link> 
                <div style={{fontFamily:'Lato', fontWeight:'600'}}>{items.name.split(' ')[0]}</div>
              </div>
             
            )
          })}
        </div>
        <h3 className='dashboard_heading' style={{ marginBottom: '1rem' }}>
          new arrival
        </h3>
        {loader ? <div style={{height:'50vh', display:'flex', alignItems:'center', justifyContent:'center'}}><CircularProgress style={{color:'black'}} /></div> :<div style={{ width: '100%' }}>
          <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {allProduct.map((product) => {
                return (
                  <Link className='responsiveCard' key={product._id} to={`/view-product/${product.categories._id}/${product._id}`} style={{ textDecoration: 'none' }} >
                    <div class="col">
                      <div class="card">
                        <img src={`http://localhost:8080/api/product/get-photo/${product._id}?${Date.now()}`} class="card-img-top responsiveImage" alt="Product 1" />
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
          <div style={{textAlign:'center', margin:'2rem 0rem'}}>
            <button className="btn btn-outline-secondary bg-dark text-light" onClick={() => { navigate('/Product') }}>see more</button>
          </div>
        </div>}
       </div>
      </Layout>
  )
}
