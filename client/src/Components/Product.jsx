import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { toast } from "react-toastify";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkbox, Radio, RadioGroup } from '@mui/material';
import { price } from './Prices';

export default function Product() {
  const [allProduct, setAllProducts] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    (categoriesFilter.length == 0 && !selectedPrice) ? getProducts() : filterProducts()
  }, [categoriesFilter,selectedPrice])

  useEffect(()=>{
    getCategories();
  },[])

  const getProducts = () => {
    return axios.get('http://localhost:8080/api/product/get-product', {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setAllProducts(res.data.allProduct)
    })
  }

  const filterProducts = () => {
    return axios.post('http://localhost:8080/api/product/get-product-filter', { checked: categoriesFilter, radio: selectedPrice ? selectedPrice.array: []},{
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setAllProducts(res.data.allProduct)
    })
  }

  const getCategories = () => {
    return axios.get('http://localhost:8080/api/category/categories', {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setCategoriesArray(res.data.categories)
    })
  }

  const filtrHande = (value,item) =>{
    console.log(value)
    let temp = [...categoriesFilter]
    if(value){
      temp.push(item._id)
    }
    else{
     temp = temp.filter((id)=> {return id !== item._id})
    }
    setCategoriesFilter(temp)
  }

  // Function to handle the radio button selection
  const handleRadioChange = (priceRange) => {
    setSelectedPrice(priceRange); 
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="dashboard_heading">All products</div>
        <div style={{display:'flex', marginTop:'1rem', paddingBottom:'6rem'}}>
          <div style={{width:'30%'}}>
            <div className="container">
              <div className="card-title">filter by category</div>
              <div style={{display:'flex', flexDirection:'column'}} >
              {categoriesArray?.map((items) => {
                return (
                
                  <label> <Checkbox checked={categoriesFilter.includes(items._id)} style={{ paddingLeft: '0', fontFamily: 'Lato', fontSize:'15px'}} onChange={(e)=>{filtrHande(e.target.checked,items)}} />{items.name}</label> 
                )
              })}
              </div>
              <div className="card-title">filter by Price</div>
              <div style={{display:'flex', flexDirection:'column'}} >
                {price?.map((priceRange) => (
                  <div key={priceRange.id}>
                    <label>
                      <Radio
                        type="radio"
                        style={{ paddingLeft: '0', fontFamily: 'Lato', fontSize: '15px' }}
                        checked={selectedPrice === priceRange}
                        onChange={() => handleRadioChange(priceRange)}
                      />
                      {priceRange.priceTag}
                    </label>
                  </div>
                ))}
              </div>
              <div className="btn btn-outline-secondary bg-dark text-light" style={{padding:'0.3rem 3rem'}} onClick={()=>{setCategoriesFilter([]);setSelectedPrice(null)}}>Reset</div>
            </div>
          </div>
          <div style={{width:'70%'}}>
            <div class="container">
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                {allProduct.map((product)=>{
                  return(
                    <Link key={product._id} to={`/update-product/${product._id}`} style={{ textDecoration: 'none' }} >
                    <div class="col">
                      <div class="card">
                          <img src={`http://localhost:8080/api/product/get-photo/${product._id}?${Date.now()}`} class="card-img-top" alt="Product 1" />
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
  )
}
