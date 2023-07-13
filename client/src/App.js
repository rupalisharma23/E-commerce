import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart';
import Categories from './Components/Categories';
import Login from './Components/Login';
import Register from './Components/Register';
import About from "./Components/About";
import Home from "./Components/Home";
import PageNotFound from "./Components/PageNotFound";
import Dashboard from './Components/Dashboard';
import Product from './Components/Product';
import Order from './Components/Order';
import Profile from './Components/Profile';
import CreateProduct from './Components/CreateProduct';
import UpdateProduct from './Components/UpdateProduct';
import Search from './Components/Search'
import ViewProduct from './Components/ViewProduct';
import UpdateInfo from './Components/UpdateInfo';
import OrderUser from './Components/OrderUser'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Create-Product" element={<CreateProduct />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/OrderUser" element={<OrderUser />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/view-product/:cid/:pid" element={<ViewProduct />} />
        <Route path="/update" element={<UpdateInfo />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
