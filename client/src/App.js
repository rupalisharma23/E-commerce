import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart';
import Categories from './Components/Categories';
import Login from './Components/Login';
import Register from './Components/Register';
import About from './pages/About';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
