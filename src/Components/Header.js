import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");

    };


    return (
        < header className='px-4 py-5 bg-white border-b' >
            <div className='md:flex md:justify-between'>
                <h2 className='text-4xl text-red-600 font-bold text-center mb-5 md:mb-0'>
                    Administrador
                </h2>

                <div className='flex flex-col md:flex-row items-center gap-4 cursor-pointer icon-logout '>
                    <input
                        type="submit"
                        value="Cerrar sesion"
                        className='bg-red-600 hover:bg-red-400 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors  '
                        onClick={cerrarSesion}
                        

                    />
                </div>
            </div>
        </header >
    );
}
export default Header;