import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import crud from '../Conexiones/crud';
import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const autenticarUsuario = async () => {
        const data = {
            email: user.email,
            password: user.password,
        }

        const response = await crud.POST('/api/auth', data);
        const mensaje = response.msg;
        console.log(mensaje);
        if (mensaje === 'El usuario no existe') {
            const mensaje = 'El usuario no existe'
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
        } else if (mensaje === 'Password incorrecto') {
            const mensaje = 'Password incorrecto';
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

            const jwt = response.token;
            localStorage.setItem('token', jwt);


            //redirecionar ala pantalla admin
            navigate("/admin");
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        autenticarUsuario();
    }



    return (
        <main className='  container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:-2/5 max-w-2xl ' >

                <h1 className=" text-white bg-clip-text font-display text-5xl  block text-center tracking-tight text-transparent uppercase">
                    Inicia sesión
                </h1>

                <form
                    className=' border-4   border-white   my-1 bg-white shadow rounded-lg p-5'
                    onSubmit={onSubmit}

                >
                    <div className=' my-5'>
                        <label className='= max-w-ls  uppercase text-gray-600 block text-xl font-bold '>E-mail </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Ingresa tu e-mail'
                            className=' w-full max-w-2xl mt-3 p-3 border rounded-lg bg-gray-50 caret-pink-500 icon-email'
                            value={email}
                            onChange={onChange}
                        />

                        <label className='=animate-spin uppercase text-gray-600 block text-xl font-bold my-3 ' > password </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='******'
                            className='  w-full max-w-2xl p-3 border rounded-lg bg-gray-50 icon-key'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <button
                        
                        value="iniciar sesion"
                        className='bg-red-600 max-w-2xl mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-400 transition-colors '

                    >Iniciar sesion
                     </button> 
                    

                    <Link
                        to={"/Create-Account"}
                        className="  block text-center my-5 text-blue-400 uppercase text-sm underline decoration-1 "

                    >Crear Cuenta</Link>
                </form>
            </div>
        </main>
    );

}

export default Login;

