import Layout from "../components/Layout"
import Style from "../styles/Carrito.module.css"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Carrito({ carrito, actualizarCantdad, eliminarProducto }) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculoTotal = carrito.reduce(
            (total, producto) => total + producto.cantidad * producto.precio,
            0
        );
        setTotal(calculoTotal);
    }, [carrito]);


    return (
        <Layout pagina={"Carrito de Compras"}>
            <h1 className="heading"> Carrito</h1>
            <main className={`${Style.contenido} contenedor`}>
                <div className={Style.carrito}>
                    <h2>Artículos</h2>
                    {carrito.length === 0 ? 'Carrito vacio' : (
                        carrito.map(producto => (
                            <div key={producto.id} className={Style.producto}>
                                <div>
                                    <Image
                                        Layout="responsive"
                                        width={250}
                                        height={480}
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                    />
                                </div>
                                <div>
                                    <p className={Style.nombre}>{producto.nombre}</p>
                                    <div className={Style.cantidad}>
                                        <p>Cantidad:</p>
                                        <select
                                            className={Style.select}
                                            value={producto.cantidad}
                                            select={Style.select}
                                            onChange={(e) => actualizarCantdad({
                                                cantidad: e.target.value,
                                                id: producto.id,
                                            })}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <p className={Style.precio}>
                                        $<span>{producto.precio}</span>
                                    </p>
                                    <p className={Style.subtotal}>
                                        Subtotal: $
                                        <span>{producto.precio * producto.cantidad}</span>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={Style.eliminar}
                                    onClick={() => eliminarProducto(producto.id)}
                                >
                                    X
                                </button>
                            </div>
                        ))
                    )}

                </div>
                <div className={Style.resumen}>
                    {total > 0 ? (
                        <>
                            <p>Reumen del Pedido</p>
                            <p>Total a pagar: ${total}</p>
                        </>
                    ) : <p>No hay productos en el carrito</p>

                    }
                </div>
            </main>
        </Layout>
    )
}