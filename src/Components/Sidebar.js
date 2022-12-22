import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {

    return (

        <aside className="md:w-60 lg:w-90 px-5 py-10 bg-amber-500">
            <p className=" text-xl font-bold">Administrador</p>
            <Link
                to={"/Crear-Categorias"}
                className="bg-green-600 hover:bg-red-400 hover:cursor-pointer  w full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg transition-colors"
            >Crear Categorias</Link>

        <div className="py-10">

        <Link
                to={"/admin"}
                className="bg-red-600 hover:bg-red-400 hover:cursor-pointer  w full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg transition-colors"
            >admin Categorias</Link>
        </div>


        </aside>

    );
}
export default Sidebar;