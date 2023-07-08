import React from 'react';
import Layout from './Layout';
import './Dashboard.css'
import { NavLink, Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="dashboard_heading"> Dashboard</div>
        <NavLink to='/Categories' className="nav-link" aria-current="page" href="#">Manage categories</NavLink>
        <NavLink to='/Create-Product' className="nav-link" aria-current="page" href="#">Add product</NavLink>
        <NavLink to='/Register' className="nav-link" aria-current="page" href="#">Add Admin</NavLink>
      </div>
    </Layout>
  )
}
