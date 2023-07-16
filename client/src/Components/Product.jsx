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
import CircularProgress from '@mui/material/CircularProgress';
import backendURL from './config';

export default function Product() {
  const [allProduct, setAllProducts] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [totalProductLength, setTotalProductLength] = useState('');
  const [productPerPage, setProductPerPage] = useState();
  const [filterDailog, setFilterDailog] = useState(false)
  const [loader, setLoader] = useState(false)
  const [size, setSize] = useState([]);
  const [page, setPage] = useState(1);
  const [filterTitle, setFilterTitle] = useState('filter by category')
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    setPage(1)
  }, [categoriesFilter, selectedPrice])

  useEffect(() => {
    (categoriesFilter.length == 0 && !selectedPrice && sizeFilter.length == 0) ? getProducts() : filterProducts()
  }, [categoriesFilter, selectedPrice, page, sizeFilter])

  useEffect(() => {
    getCategories();
  }, [])

  const getProducts = () => {
    setLoader(true)
    return axios.get(`${backendURL}/api/product/get-product/${page}`, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setLoader(false)
      setAllProducts(res.data.allProduct)
      setTotalProductLength(res.data.totalProduct)
      setProductPerPage(res.data.productPerPage)
    })
  }

  const filterProducts = () => {
    setLoader(true)
    return axios.post(`${backendURL}/api/product/get-product-filter/${page}`, { checked: categoriesFilter, radio: selectedPrice ? selectedPrice.array : [], sizeFilter }, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setLoader(false)
      setAllProducts(res.data.allProduct)
      setTotalProductLength(res.data.totalProduct)
      setProductPerPage(res.data.productPerPage)
    })
  }

  const getCategories = () => {
    return axios.get(`${backendURL}/api/filter/getFilters`, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setCategoriesArray(res.data.categories)
      setSize(res.data.size)
    })
  }

  const filtrHande = (value, item) => {
    let temp = [...categoriesFilter]
    if (value) {
      temp.push(item._id)
    }
    else {
      temp = temp.filter((id) => { return id !== item._id })
    }
    setCategoriesFilter(temp)
  }

  const filtrSize = (value, item) => {
    let temp = [...sizeFilter]
    if (value) {
      temp.push(item)
    }
    else {
      temp = temp.filter((id) => { return id !== item })
    }
    setSizeFilter(temp)
  }

  // Function to handle the radio button selection
  const handleRadioChange = (priceRange) => {
    setSelectedPrice(priceRange);
  };


  return (
    <Layout>
      <div className="container-fluid" style={{ paddingBottom: '3rem' }}>
        <div className="dashboard_heading ProductActive" onClick={() => { setFilterDailog(true) }} style={{ justifyContent: 'end', fontSize: '15px', textTransform: 'capitalize', paddingRight: 'calc(var(--bs-gutter-x) * .5)', cursor: 'pointer' }}>filter</div>
        <div style={{ display: 'flex', marginTop: '1rem', paddingBottom: '6rem' }}>
          <div className='productDisActive' style={{ width: '30%' }}>
            <div className="container">
              {/* <div className="card-title" style={{ textDecoration: 'underline' }}>Filter by category</div> */}
              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <Accordion defaultExpanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{color:'black'}} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="card-title" >Filter by category</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ borderTop: '1.5px dashed' }} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {categoriesArray?.map((items) => {
                        return (
                          <label style={{ display: 'flex', alignItems:'center' }}> <Checkbox checked={categoriesFilter.includes(items._id)} style={{
                            paddingLeft: '0',
                            fontFamily: 'Lato',
                            fontSize: '15px',
                            color: 'black',
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                          }} onChange={(e) => { filtrHande(e.target.checked, items) }} />{items.name}</label>
                        )
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              {/* <div className="card-title" style={{ textDecoration: 'underline' }}>Filter by sizes</div> */}
              <div style={{ display: 'flex', flexDirection: 'column', marginTop:'1rem' }} >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="card-title" >Filter by sizes</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ borderTop: '1.5px dashed' }} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {size?.map((items) => {
                        return (
                          <label style={{ display: 'flex', alignItems: 'center' }}> <Checkbox checked={sizeFilter.includes(items)} style={{
                            paddingLeft: '0',
                            fontFamily: 'Lato',
                            fontSize: '15px',
                            color: 'black',
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                          }} onChange={(e) => { filtrSize(e.target.checked, items) }} />{items}</label>
                        )
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              {/* <div className="card-title" style={{marginTop:'1rem', textDecoration:'underline'}} >Filter by Price</div> */}
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }} >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="card-title" >Filter by Price</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ borderTop: '1.5px dashed' }} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {price?.map((priceRange) => (
                        <div key={priceRange.id}>
                          <label style={{ display: 'flex', alignItems: 'center' }}>
                            <Radio
                              type="radio"
                              style={{
                                paddingLeft: '0',
                                fontFamily: 'Lato',
                                fontSize: '15px',
                                color: 'black',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                              }}
                              checked={selectedPrice === priceRange}
                              onChange={() => handleRadioChange(priceRange)}
                            />
                            {priceRange.priceTag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="btn btn-outline-secondary bg-dark text-light" style={{ marginTop: '1rem' }} onClick={() => { setCategoriesFilter([]); setSelectedPrice(null); setSizeFilter([]) }}>Reset</div>
            </div>
          </div>
          {loader ? <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%' }}><CircularProgress style={{ color: 'black' }} /></div> : <div style={{width:'100%'}}>
            <div class="container">
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                {allProduct.map((product) => {
                  return (
                    <Link className='responsiveCard' key={product._id} to={user?.role == 1 ? `/update-product/${product._id}` : `/view-product/${product.categories._id}/${product._id}`} style={{ textDecoration: 'none' }} >
                      <div class="col">
                        <div class="card">
                          <img src={`${backendURL}/api/product/get-photo/${product._id}?${Date.now()}`} class="card-img-top responsiveImage"  alt="Product 1" />
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
          </div>}
        </div>
      </div>
      <Dialog open={filterDailog} PaperProps={{
        style: {
          width: '100%',
          height: '30rem',
          position: 'fixed',
          bottom: 0,
          margin: 0,
          maxWidth: '100%'
        },
      }}  maxWidth="md">
        <DialogTitle style={{ textAlign: 'center', padding: '1rem', position: 'relative', fontFamily: 'Lato', fontWeight:'600' }}>Filter
          <i
            className="fas fa-times"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
            onClick={() => { setFilterDailog(false) }}
          ></i>
        </DialogTitle>
        <DialogContent style={{
          padding: '0', overflow: 'hidden'
        }}>
          <div style={{width:'100%', display:'flex'}}>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', fontFamily: "Lato", fontWeight: '600', fontSize: '15px', gap: '1rem', height: '25rem', background:'#F5F5F5'}}>
              <span style={{ padding: '20px 10px', background: filterTitle == 'filter by category' ? 'white' : '', borderLeft: filterTitle == 'filter by category' ? '5px solid' : '', cursor:'pointer' }} onClick={() => { setFilterTitle('filter by category')}}>filter by category</span>
              <span style={{ padding: '20px 10px', background: filterTitle == 'filter by size' ? 'white' : '', borderLeft: filterTitle == 'filter by size' ? '5px solid' : '', cursor: 'pointer' }} onClick={() => { setFilterTitle('filter by size') }}>filter by size</span>
              <span style={{ padding: '20px 10px', background: filterTitle == 'filter by price' ? 'white' : '', borderLeft: filterTitle == 'filter by price' ? '5px solid' : '', cursor: 'pointer' }} onClick={() => { setFilterTitle('filter by price') }}>filter by price</span>

            </div>
            <div style={{ width: '50%' }}>
              {filterTitle =='filter by category' &&  <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'20px', height:'25rem', overflowY:'scroll' }}>
                {categoriesArray?.map((items) => {
                  return (
                    <label style={{display:'flex', fontWeight:'600'}}> <Checkbox checked={categoriesFilter.includes(items._id)} style={{
                      paddingLeft: '0',
                      fontFamily: 'Lato',
                      fontSize: '15px',
                      color: 'black',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                    }} onChange={(e) => { filtrHande(e.target.checked, items) }} />{items.name}</label>
                  )
                })}
              </div>}
              {filterTitle == 'filter by size' && <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', height: '25rem', overflowY: 'scroll' }}>
                {size?.map((items) => {
                  return (
                    <label style={{ display: 'flex', fontWeight: '600' }}> <Checkbox checked={sizeFilter.includes(items)} style={{
                      paddingLeft: '0',
                      fontFamily: 'Lato',
                      fontSize: '15px',
                      color: 'black',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                    }} onChange={(e) => { filtrSize(e.target.checked, items) }} />{items}</label>
                  )
                })}
              </div>}
              {filterTitle == 'filter by price' && <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', height: '25rem', overflowY: 'scroll' }}>
                {price?.map((priceRange) => (
                  <div key={priceRange.id}>
                    <label style={{ display: 'flex', fontWeight: '600', alignItems:'center' }}>
                      <Radio
                        type="radio"
                        style={{
                          paddingLeft: '0',
                          fontFamily: 'Lato',
                          fontSize: '15px',
                          color: 'black',
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                        }}
                        checked={selectedPrice === priceRange}
                        onChange={() => handleRadioChange(priceRange)}
                      />
                      {priceRange.priceTag}
                    </label>
                  </div>
                ))}
              </div>}
            </div>
          </div>
          
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center'}}>
          <button className="btn btn-outline-secondary bg-dark text-light" onClick={() => { setCategoriesFilter([]); setSelectedPrice(null); setSizeFilter([]) }}>Clear</button>
          <button className="btn btn-outline-secondary bg-dark text-light" onClick={() => { setFilterDailog(false) }}>Apply</button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}
