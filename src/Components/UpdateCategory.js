import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../Conexiones/crud';
import { useNavigate, useParams, } from 'react-router-dom';
import swal from 'sweetalert';

const UpdateCategory = () => {

    const navigate = useNavigate()    ;

    const { idCategoria } = useParams();
    //  console.log(idCategoria);

    const [category, setCategory] = useState({
        nombre: '',
        imagen: ''
    })
    
    const loadCategory = async () => {
        const response = await crud.GET(`/api/category/${idCategoria}`);
        //console.log(response);
        setCategory(response.category);
    }
    useEffect(() => {
        loadCategory();
    },[]);
    

    const { nombre, imagen } = category;

    const onChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }
    const updateCategory = async () => {
        const data = {
            nombre: category.nombre,
            imagen: category.imagen
        }

        //console.log(data);
        const response = await crud.PUT(`/api/category/${idCategoria}`, data);
        console.log(response);
        const mensage1 = "la categoria se actulizo correctamente"
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
        updateCategory();
    }

    
    return (
        <>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className='flex-1'>
                    <div className='mt-10  flex justify-center'>
                        <h1 className="inline text-center bg-gradient-to-r  from-red-300 via-red-600 to-red-300 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                            Actualizar Categorias
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
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500'
                                    value={nombre}
                                    onChange={onChange}
                                />

                                <label className='= uppercase text-gray-600 block text-xl font-bold '>Imagen de la categoria </label>
                                <input
                                    type="text"
                                    id="imagen"
                                    name="imagen"
                                    placeholder='Imagen'
                                    className=' uppercase  w-full mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500'
                                    value={imagen}
                                    onChange={onChange}
                                />

                            </div>

                            <input
                                type='submit'
                                value="actualizar categoria"
                                className='bg-red-600 mb-5 w-full py-2  text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-red-400 transition-colors '
                            />
                        </form>
                    </div>

                </main >
            </div>
        </>
    );
}
export default UpdateCategory;