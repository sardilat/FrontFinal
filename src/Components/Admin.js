import React, { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebar from './Sidebar';
import Header from './Header';
import crud from '../Conexiones/crud';

const Admin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")
            // console.log(token)
            if (!token) {
                navigate("/login");
            }
        }
        autenticarUsuario()
    }, [navigate]);//[] hacen que solo mse ejecute una ve en el useeffet
    /*********************************************************************************** */
    const [categoria, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        const response = await crud.GET(`/api/category`);
        console.log(response);
        setCategorias(response.category);
    }
    useEffect(() => {
        cargarCategorias();
    }, [])
    /************************************************************************************** */
    const borrarCategoria = async (idCategoria) => {
        //console.log(idCategoria)
        //const response = await crud.DELETE(`/api/category/${idCategoria}`);
        //  const mensaje=response.msg;
        //  if(mensaje==="Categoria eliminada"){ 
        // const mensaje = "categoria eliminada";
        swal({
            title: 'Estas seguro de borrar la categoria?',
            text: "una vez eliminada no podra recuperarla",
            icon: 'warning',
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = crud.DELETE(`/api/category/${idCategoria}`);
                    
                    if (response) {
                        swal(" categoria borrada correctamente", {
                            icon: "success",
                        });
                    }
                    cargarCategorias();
                } else {
                    swal("accion cancelada");
                }

            });
    }
return (
    <>
        <Header />
        <div className=' md:flex md:min-h-screen  '>
            <Sidebar />
            <main className=' flex-1 '>
                <h1 className=" flex items-center justify-center  text-center text-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    CATEGORIAS

                </h1>

                <table className="  flex items-bot justify-center  ">

                    {/*}    <thead className='bg-white  '>
                            <tr >
                                { /*  <th style={{ width: '10%' }}>Id</th>
                                <th style={{ width: '60%'  }}>Nombre</th>
                                <th style={{ width: '15%' }}>Opciones</th>
                            </tr>
                        </thead>*/}
                    <tbody className="bg-white text-center  border-collapse border-4 rounded-lg  border-white  ">
                        {
                            categoria.map(
                                item =>
                                    <tr className='uppercase' key={item._id}>
                                        { /*<td>{item._id}</td>*/}
                                        <td className='p-3'>
                                            <th style={{ width: '60%' }}></th>
                                            {item.nombre}
                                            <th style={{ width: '60%' }}></th>
                                            <img className=' border-4 rounded-lg  border-white  object-contain  h-35 w-48' src={item.imagen}></img>

                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <th style={{ width: '25%' }}>Opciones</th>
                                            <Link
                                                to={`/home-products/${item._id}`}
                                                className='bg-green-600 hover:bg-red-400  w full p-1 text-white uppercase mt-0 text-center rounded-lg' >crear producto</Link>&nbsp;&nbsp;
                                            <Link
                                                to={`/update-category/${item._id}`}
                                                className='bg-blue-600 hover:bg-red-400  w full p-1 text-white uppercase mt-0 text-center rounded-lg' >Editar</Link>&nbsp;&nbsp;


                                            <button
                                                onClick={() => borrarCategoria(item._id)}
                                                className='bg-red-600 hover:bg-red-400  w full p-1 text-white uppercase mt-0 text-center rounded-lg ' >Eliminar
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </main>
        </div>
    </>
);

}

export default Admin;