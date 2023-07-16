import React from 'react';
import Layout from './Layout';
import './Dashboard.css'
import { NavLink, Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <Layout>
      {/* <div className="container-fluid">
        <div className="dashboard_heading"> Dashboard</div>
        <NavLink to='/Categories' className="nav-link" style={{color:'black'}} aria-current="page" href="#">Manage categories</NavLink>
        <NavLink to='/Create-Product' className="nav-link" style={{ color: 'black' }} aria-current="page" href="#">Add product</NavLink>
        <NavLink to='/Register' className="nav-link" style={{ color: 'black' }} aria-current="page" href="#">Add Admin</NavLink>
      </div> */}
      <div className="container-fluid">
        <div className="dashboard_heading">
          <div className='AddCategory'>
            <div>Dashboard</div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="table-responsive-sm" style={{ width: '80%' }}>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th style={{ width: '60%' }}></th>
                  <th style={{ width: '40%' }} className="text-left"></th>
                </tr>
              </thead>
              <tbody>         
                  <tr>
                  <td style={{ width: '80%', fontWeight: '600', fontFamily: 'Lato' }}>1</td>
                  <td style={{ width: '20%', fontWeight: '600', fontFamily:'Lato' }} className="text-left">
                    <NavLink to='/Categories' className="nav-link" style={{ color: 'black' }} aria-current="page" href="#">Manage categories</NavLink>
                    </td>
                  </tr>
                  <tr>
                  <td style={{ width: '80%', fontWeight: '600', fontFamily: 'Lato' }}>2</td>
                  <td style={{ width: '20%', fontWeight: '600', fontFamily: 'Lato' }} className="text-left">
                    <NavLink to='/Create-Product' className="nav-link" style={{ color: 'black' }} aria-current="page" href="#">Add product</NavLink>
                    </td>
                  </tr>
                  <tr>
                  <td style={{ width: '80%', fontWeight: '600', fontFamily: 'Lato' }}>3</td>
                  <td style={{ width: '20%', fontWeight: '600', fontFamily: 'Lato' }} className="text-left">
                    <NavLink to='/Register' className="nav-link" style={{ color: 'black' }} aria-current="page" href="#">Add Admin</NavLink>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
