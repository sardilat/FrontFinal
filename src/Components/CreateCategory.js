import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../Conexiones/crud';
import {  useNavigate,   } from 'react-router-dom';



const CrearCategoria = () => {
    const navigate= useNavigate();
    const [category, setCategory] = useState({
        nombre: '',
        imagen: ''
    })
    const { nombre, imagen } = category;

    const onChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }
    const createCategory = async () => {
        const data = {
            nombre: category.nombre,
            imagen:category.imagen
        }

        //console.log(data);
        const response = await crud.POST('/api/category', data);
        const mensaje = response.msg;
        console.log(mensaje);
        navigate("/admin");
    }
    const onSubmit = (e) => {
        e.preventDefault();
        createCategory();
    }
    return (
        <>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className='flex-1'>
                    <div className='mt-10  flex justify-center'>
                       
                        <h1 className="inline text-center bg-gradient-to-r  from-red-300 via-red-600 to-red-300 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                            Crear de Categorias
                           
                        </h1>
                        
                    </div>

                    <div className=' mt-10 flex justify-center'>
                    
                        <form
                            className='my-10 bg-white shadow rounded-lg p-10'
                            onSubmit={onSubmit}

                        >
                            <div className=' my-5'>
                                <label className='= uppercase text-gray-600 block text-xl font-bold '>Nombre de la categoria </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder='Nombre'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500 icon-category'
                                    value={nombre}
                                    onChange={onChange}                                   
                                />    

                                <label className='= uppercase text-gray-600 block text-xl font-bold '>Imagen de la categoria </label>
                                <input
                                    type="text"
                                    id="imagen"
                                    name="imagen"
                                    placeholder='Nombre'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500 icon-image'
                                    value={imagen}
                                    onChange={onChange}                                   
                                />  

                            </div>

                            <input
                                type='submit'
                                value="crear categoria"
                                className='bg-red-600 mb-5 w-full py-2  text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-400 transition-colors '
                            />
                        </form>
                    </div>

                </main >
            </div>
        </>
    );
}
export default CrearCategoria;