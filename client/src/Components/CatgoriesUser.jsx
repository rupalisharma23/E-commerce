import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { toast } from "react-toastify";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkbox, Radio, RadioGroup } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { price } from './Prices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function CatgoriesUser() {
    const [allProduct, setAllProducts] = useState([]);
    const [sizeFilter, setSizeFilter] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState();
    const [totalProductLength, setTotalProductLength] = useState('');
    const [productPerPage, setProductPerPage] = useState();
    const [page, setPage] = useState(1);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const params = useParams()

    useEffect(() => {
        filterProducts()
    }, [])

    const filterProducts = () => {
        return axios.post(`http://localhost:8080/api/product/get-product-filter/${page}`, { checked: [params.id], radio: selectedPrice ? selectedPrice.array : [], sizeFilter }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setAllProducts(res.data.allProduct)
            setTotalProductLength(res.data.totalProduct)
            setProductPerPage(res.data.productPerPage)
        })
    }

  return (
      <Layout>
          <div className="container-fluid" style={{ paddingBottom: '3rem' }}>
              <div style={{ display: 'flex', marginTop: '1rem', paddingBottom: '6rem' }}>
                  <div style={{ width: '100%' }}>
                      <div class="container">
                          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                              {allProduct.map((product) => {
                                  return (
                                      <Link className='responsiveCard' key={product._id} to={user?.role == 1 ? `/update-product/${product._id}` : `/view-product/${product.categories._id}/${product._id}`} style={{ textDecoration: 'none' }} >
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
                      {(Math.ceil(parseInt(totalProductLength) / productPerPage) > 1) && <div className=' text-center' style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }} >
                          <button className={`btn btn-outline-secondary bg-dark text-light ${page === 1 ? 'disabled' : ''}`} disabled={page === 1} onClick={() => { setPage(page - 1) }} >Previous</button>
                          <div className='card-text' >{page}/{Math.ceil(parseInt(totalProductLength) / productPerPage)}</div>
                          <button className={`btn btn-outline-secondary bg-dark text-light ${page === Math.ceil(parseInt(totalProductLength) / productPerPage) ? 'disabled' : ''}`} disabled={page === Math.ceil(parseInt(totalProductLength) / productPerPage)} onClick={() => { setPage(page + 1) }}  >Next</button>
                      </div>}
                  </div>
              </div>
          </div>
      </Layout>
  )
}