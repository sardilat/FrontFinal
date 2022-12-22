import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../Conexiones/crud';
import { useNavigate, useParams, } from 'react-router-dom';
import swal from 'sweetalert';

const UpdateProduct = () => {

    const navigate = useNavigate();

    const { idProduct } = useParams();
   //  console.log(idProduct);

    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        stock: '',
        precio: '',
        imagen: ''
    })

    const loadProduct = async () => {
        const response = await crud.GET(`/api/product/${idProduct}`);
        console.log(response);
        setProduct(response.product);
    }
    useEffect(() => {
        loadProduct();
    }, []);


    const {nombre, descripcion, stock, precio, imagen } = product;
       
    const onChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
    const UpdateProduct = async () => {
        const data = {
            nombre: product.nombre,
            descripcion: product.descripcion,
            stock: product.stock,
            precio: product.precio,
            imagen: product.imagen
        }

        //console.log(data);
        const response = await crud.PUT(`/api/product/${idProduct}`, data);
        console.log(response);
        const mensage1 = "el producto se actualizo correctamente"
        swal({
            title: 'Informacion',
            text: mensage1,
            icon: 'success',
            buttons: {
                confirm: {
                    text: 'OK',
                    value: true,
                    visible: true,
                    className: 'btn-btn-primary',
                    closeModal: true
                }

            }
        });
        navigate("/admin");
    }
    const onSubmit = (e) => {
        e.preventDefault();
        UpdateProduct();
    }


    return (
        <>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className='flex-1'>
                    <div className='mt-10  flex justify-center'>
                        <h1 className="inline text-center text-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
                            Actualizar producto
                        </h1>
                    </div>

                    <div className=' mt-10 flex justify-center'>

                        <form
                            className='my-10 bg-white shadow rounded-lg p-10'
                            onSubmit={onSubmit}

                        >
                            <div className=' my-5'>
                                <label className='= uppercase text-gray-600 block text-xl font-bold '>Nombre del producto </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder='Nombre'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500'
                                    value={nombre}
                                    onChange={onChange}
                                />

                                <label className='= uppercase text-gray-600 block text-xl font-bold '>descripcion del producto</label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    placeholder='Descripcion'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500'
                                    value={descripcion}
                                    onChange={onChange}
                                />

                                <label className='= uppercase text-gray-600 block text-xl font-bold '>stock del producto</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    placeholder='stock'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500'
                                    value={stock}
                                    onChange={onChange}
                                />

                                <label className='= uppercase text-gray-600 block text-xl font-bold '>precio del producto</label>
                                <input
                                    type="number"
                                    id="precio"
                                    name="precio"
                                    placeholder='precio'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500'
                                    value={precio}
                                    onChange={onChange}
                                />
                                <label className='= uppercase text-gray-600 block text-xl font-bold '> imagen del producto</label>
                                <input
                                    type="text"
                                    id="imagen"
                                    name="imagen"
                                    placeholder='imagen'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500'
                                    value={imagen}
                                    onChange={onChange}
                                />

                            </div>

                            <input
                                type='submit'
                                value="actualizar producto"
                                className='bg-red-600 mb-5 w-full py-2  text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-400 transition-colors '
                            />
                        </form>
                    </div>

                </main >
            </div>
        </>
    );
}
export default UpdateProduct;