import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from './CartContextPage';
import { toast } from "react-toastify";

export default function ViewProduct() {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [productForCartArray, setProductForCartArray] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState('');
  const [categories, setCategories] = useState('');
  const [shipping, setShipping] = useState('');
  const params = useParams();
  const [allProduct, setAllProducts] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [cart,setCart] = useCart()

  useEffect(() => {
    getCategories();
    getSingleProduct();
    getrelatedProduct()
  }, [params.pid])

  const getSingleProduct = () => {
    return axios.get(`http://localhost:8080/api/product/get-single-product/${params.pid}`, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setProductForCartArray(res.data.singleProduct)
      setName(res.data.singleProduct.name)
      setDescription(res.data.singleProduct.description)
      setPrice(res.data.singleProduct.price)
      setQuantity(res.data.singleProduct.quantity)
      setShipping(res.data.singleProduct.shipping ? 'yes' : 'no')
      setCategories(res.data.singleProduct.categories)
    })

  }

  const getrelatedProduct = () => {
    return axios.get(`http://localhost:8080/api/product/get-related-product/${params.cid}/${params.pid}`, {
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

  const getCartItems = () => {
    return axios(`http://localhost:8080/api/cart/get-cart/${user._id}`, {
      headers: {
        authorization: token
      }
    }).then((res) => {
      setCart(res.data.allCartItems.length)
    });
  };

  const addToCart = () =>{
    return axios.post(`http://localhost:8080/api/cart/create-cart`,{
      cart: productForCartArray._id,
      quantity:1,
      userInfo:user._id
    }, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      toast.success('item added to cart');
      getCartItems()
    }).catch((error)=>{
      toast.error('error in adding to cart')
    })
  }

  return (
    <Layout>
      <h2 className="dashboard_heading">product details</h2>
      <div className="container" style={{ paddingBottom: '6rem', marginTop: '2rem' }}>
        <div className="row">
          <div className="col-lg-6" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div className="card shadow" style={{width:'75%'}}>
              <img style={{height:'300px', objectFit:'contain'}} src={`http://localhost:8080/api/product/get-photo/${params.pid}`} alt="Product" className="card-img-top img img-responsive" />
            </div>
          </div>
          <div className="col-lg-6">
            <h2 className="dashboard_heading_product">{name}</h2>
            <h4 className="dashboard_heading_product" style={{ fontSize: '17px' }}>Price: Rs{price}</h4>
            <p className="dashboard_heading_product" style={{ fontSize: '12px' }}>Category:{categories.name}</p>
            <p className="dashboard_heading_product" style={{ fontSize: '12px' }}>Description:{description}</p>
            <button className="btn btn-dark text-light" onClick={() => { addToCart() }} >Add to Cart</button>
          </div>
        </div>
        <div class="container" style={{marginTop:'4rem', marginBottom:'4rem'}}>
          <h2 className='dashboard_heading_product'>related products</h2>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {allProduct.length == 0 ? <h2 style={{width:'100', fontSize:'15px', textTransform:'capitalize'}} className="dashboard_heading">no similar products</h2>:
           ( allProduct.map((product) => {
              return (
                <Link key={product._id} to={`/view-product/${product.categories._id}/${product._id}`} style={{ textDecoration: 'none' }} >
                  <div class="col">
                    <div class="card" style={{width:'80%'}}>
                      <img src={`http://localhost:8080/api/product/get-photo/${product._id}?${Date.now()}`} class="card-img-top" style={{ height: '250px', objectFit: 'contain' }} alt="Product 1" />
                      <div class="card-body">
                        <div class="card-title">{product.name}</div>
                        <p class="card-text">Price: {product.price}</p>
                        <p class="card-des">{product.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
