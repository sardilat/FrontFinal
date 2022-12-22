import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import Admin from './Components/Admin';
import Home from './Components/Home';
import CreateCategory from './Components/CreateCategory';
import UpdateCategory from './Components/UpdateCategory';
import HomeProducts from './Components/Products/HomeProducts';
import CreateProduct from './Components/Products/CreateProduct';
import UpdateProduct from './Components/Products/UpdateProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Create-Account" exact element={< CreateAccount />} />
        <Route path="/Login" exact element={< Login />} />
        <Route path="/admin" exact element={< Admin />} />

        <Route path="/crear-categorias" exact element={< CreateCategory />} />

        <Route path="/update-category/:idCategoria" exact element={< UpdateCategory />} />

        <Route path="/update-product/:idProduct" exact element={< UpdateProduct/>} />

        <Route path="/home-products/:idCategoria" exact element={< HomeProducts />} />
        
        <Route path="/create-product/:idCategoria" exact element={<CreateProduct />} />
      </Routes>

    </Router>


  );
}
export default App;