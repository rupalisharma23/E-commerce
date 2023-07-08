import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import './Register.css';
import { toast } from "react-toastify";
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleEditDialogOpen = (category) => {
    setEditDialogOpen(true);
    if (category){
      setCategoryName(category.name)
      setCategoryId(category._id)
    }
  };

  const handleEditDialogClose = () => {
    setCategoryName('');
    setCategoryId('');
    setEditDialogOpen(false);
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token')

  useEffect(()=>{
    getCategories();
  },[])

  const getCategories = () =>{
    return axios.get('http://localhost:8080/api/category/categories',{
      headers:{
        Authorization: token
      }
    }).then((res)=>{
      setCategories(res.data.categories)
    })
  }

  const updateCategories = () =>{
    const update = `http://localhost:8080/api/category/categories/${categoryId}`;
    return axios.put(update,{name:categoryName},{
      headers:{
        Authorization: token
      }
    }).then((res)=>{
      handleEditDialogClose();
      toast.success(res.data.message);
      getCategories();
      setCategoryName('');
      setCategoryId('');
    }).catch((error) =>{
      toast.error(error.response.data.error);
    })

  }

  const createCategories = () =>{
    const add = `http://localhost:8080/api/category/create-category`
    return axios.post(add ,{name:categoryName},{
      headers:{
        Authorization: token
      }
    }).then((res)=>{
      handleEditDialogClose();
      toast.success(res.data.message);
      getCategories();
      setCategoryName('');
      setCategoryId('');
    }).catch((error) => {
      toast.error(error.response.data.error);
    })

  }

  const deleteCategory = (categoryId) =>{
    return axios.delete(`http://localhost:8080/api/category/categories/${categoryId}`,{
      headers:{
        Authorization: token
      }
    }).then((res)=>{
      toast.success(res.data.message)
      getCategories()
    }).catch((error) =>{
      toast.error(error.response.data.error);
    })
  }

  const handleChange = (e) =>{
    e.preventDefault();
    setCategoryName(e.target.value)
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="dashboard_heading">
          <div className='AddCategory'>
            <div>categories</div>
            <div onClick={() => { handleEditDialogOpen() }} style={{ fontSize: '15px', display: 'flex', alignItems: 'center', cursor:'pointer' }}><i style={{ fontSize: '10px' }} className="fas fa-plus" ></i>Add</div>
          </div>    
          </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="table-responsive-sm" style={{ width: '80%' }}>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th style={{ width: '60%' }}>Name</th>
                  <th style={{ width: '40%' }} className="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td style={{width:'80%'}}>{category.name}</td>
                    <td style={{ width: '20%' }} className="text-left">
                      <i className="fas fa-trash" onClick={() => { deleteCategory(category._id) }} style={{marginRight:'10px', cursor:'pointer'}}></i>
                      <i className="fas fa-edit" onClick={() => { handleEditDialogOpen(category) }} style={{ cursor: 'pointer' }} ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Dialog open={editDialogOpen} PaperProps={{
        style: {
          width: '25rem',
          height: 'auto'
        },
      }} onClose={handleEditDialogClose} maxWidth="md">
        <DialogTitle style={{ textAlign: 'center', padding: '1rem', position: 'relative', fontFamily: 'Lato' }}>{categoryId ? "Edit category" :" Add category"}
          <i
            className="fas fa-times"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
            onClick={handleEditDialogClose}
          ></i>
        </DialogTitle>
        <DialogContent>
          <input value={categoryName} onChange={handleChange}  className='inputEdit' label="Category Name" fullWidth />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <button onClick={() => { categoryId ? updateCategories() : createCategories() }} className="btn text-light bg-dark">
            Save Changes
          </button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}
