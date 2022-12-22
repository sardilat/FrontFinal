import React from 'react'; 
//import UpdateProduct from "./UpdateProducts";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import crud from '../../Conexiones/crud';


export const ViewProducts = ({ product }) => {
    //console.log("hola producto", product)

    const { nombre, descripcion, stock, precio, imagen } = product;

    const deleteProduct = async (idProduct) => {
        
        swal({
            title: 'Estas seguro de borrar la producto?',
            text: "una vez eliminada no podra recuperarla",
            icon: 'warning',
            buttons: true,
            dangerMode: true,

        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = crud.DELETE(`/api/product/${idProduct}`);
                    
                    if (response) {
                        swal(" producto borrado correctamente", {
                            icon: "success",
                        });                  
                    }
                   
                } else {
                    swal("accion cancelada");
                }
                window.location.reload();
            });
    }

    
    return (
        <div
            className="border-r border-4 border-white rounded-lg  bg-white p-5 flex justify-between  items-center"
        >
            <div className=" flex-col items-start">
                <p className="mb-1 text-xl text-black-50 ">nombre:{nombre}</p>
                <p className="mb-1 text-xl text-black-50  uppercase ">descripcion:{descripcion}</p>
                <p className="mb-1 text-xl text-black-50  ">stock:{stock}</p>
                <p className="mb-1 text-xl text-black-50  ">precio:{precio}</p>
                <img
                    className="border-4 border-red-500 rounded-lg"

                    src={imagen} width="150" height="150"></img>
            </div>
            <div className=" = flex flex-col lg:flex-row gap-2">
                <Link

                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    to={`/update-product/${product._id}`}
                //onClick={UpdateProduct(product._id)}

                >Editar

                </Link>

                <button
                    onClick={() => deleteProduct(product._id)  }
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg "

                >Eliminar
                </button>

            </div>
        </div>
    )
}
export default ViewProducts;