import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useParams} from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../Conexiones/crud';
import ViewProducts from "./ViewProducts"

const HomeProducts = () => {
  
  const navigate = useNavigate(); 

  const {idCategoria} = useParams();

  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect

/******************************************************************************************* */
  
    const [product, setProduct] = useState([]);
  
    const cargarProductos = async () => {
      const response = await crud.GET(`/api/product/categories/${idCategoria}`);
      //console.log(response);
      setProduct(response.producto);
    }
  console.log(product);
    useEffect(() => {
      cargarProductos();
    },[]);

  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
            <main className= 'flex-1'>
              <div className='mt-10 flex justify-center'>
              <h1 className="inline text-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Listado de Productos
                </h1>
                </div>  
              
            <div className='p-12'>
              <Link
                to={`/create-product/${idCategoria}`}
                className='bg-violet-600 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg'
              >Crear Producto</Link>
            </div>

         <div className="bg-gray-600 shadow mt-10 rounded-lg">
            {product.map( product =>
              <ViewProducts
                key={product._id}
                product={product}
              />
            )}
          </div> 

            </main>
        </div>   

</>
    );
}

export default HomeProducts;