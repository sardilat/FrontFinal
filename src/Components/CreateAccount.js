import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../Conexiones/crud';

const CreateAccount = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const { nombre, email, password, confirmar } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const crearCuenta = async () => {
        /* const data ={
             nombre: user.nombre,
             email: user.email,
             password: user.password,
         }*/
        if (password !== confirmar) {
            console.log("son diferentes");
            const mensaje = "las contraseñas son diferentes";
            swal({
                title: 'error',
                text: mensaje,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            })
        } else {
            const data = {
                nombre: user.nombre,
                email: user.email,
                password: user.password,

            }
            console.log(data);
            const response = await crud.POST('/api/user', data);
            const mensaje = response.msg;
            if (mensaje === 'El usuario ya existe') {
                const mensaje = 'El usuario ya existe'
                swal({
                    title: 'error',
                    text: mensaje,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                })
            } else {
                const mensaje = "el usuario fue creado correctamente";

                swal({
                    title: 'informacion',
                    text: mensaje,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });
                //limpiar cajas
                setUser({
                    nombre: '',
                    email: '',
                    password: '',
                    confirmar: ''

                })

                //redireccion al login
                navigate("/Login");
            }
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }

    return (

        <main className='container mx-auto mt-5 md:mt-20 p-20 md:flex md:justify-center'>


            <div className='md:w-2/3 lg:-2/5' align="center">
                <img width={202} height={193}
                    src="https://res.cloudinary.com/dunu5rgap/image/upload/v1671596114/LogoOnlineShop_uyscpz.png"></img>
                <h1 className=" text-center text-white  bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    CREA TU CUENTA
                </h1>
                <form
                    onSubmit={onSubmit}
                    className='border-4 border-white my-10 bg-white shadow rounded-lg p-10'
                >
                    <div className=' my-5'>
                        <label className='= uppercase text-gray-600 block text-xl font-bold'>Nombre </label>
                        <input
                            type="nombre"
                            id='nombre'
                            name='nombre'
                            placeholder='Ingrese su nombre'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50 mb-5 icon-person'
                            value={nombre}
                            onChange={onChange}
                        />
                        <label className='= uppercase text-gray-600 block text-xl font-bold'>E-mail </label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Email de Registro'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50 mb-5 icon-email'
                            value={email}
                            onChange={onChange}
                        />

                        <label className='= uppercase text-gray-600 block text-xl font-bold'> password </label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Password de registro'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50 icon-key
                            mb-5'
                            value={password}
                            onChange={onChange}
                        />
                        <label className='= uppercase text-gray-600 block text-xl font-bold'> confirmar</label>
                        <input
                            type="password"
                            id='confirmar'
                            name='confirmar'
                            placeholder='confimar password'
                            className='w-full mt-3 mb-5 p-3 border rounded-lg bg-gray-50  icon-key'
                            value={confirmar}
                            onChange={onChange}
                        />
                        <input
                            type="submit"
                            value="crear cuenta"
                            className='bg-red-600 hover:bg-red-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer  transition-colors '
                        />
                    </div>
                    <Link
                        to={"/login"}
                        
                        className=" icon-back  block text-center my-1 text-blue-400 uppercase text-sm"
                    > Regresar</Link>
                </form>
            </div>
        </main>
    );
}
export default CreateAccount;