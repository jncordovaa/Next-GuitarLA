import { useState } from "react"
import Image from "next/image"
import Layout from "../../components/Layout"
import Styles from "../../styles/Guitarra.module.css"

export default function Producto({ guitarra, agregarCarrito }) {
    console.log('--->Producto')
    console.log(guitarra)
    const [cantidad, setCantidad] = useState(1)
    const { descripcion, nombre, precio, imagen } = guitarra.data[0].attributes
    const id = guitarra.data[0].id
    console.log(guitarra.data[0].id)

    const handleSubmit = e => {
        e.preventDefault();

        const guitarraSeleccionada = {
            id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad,
        };

        agregarCarrito(guitarraSeleccionada);
    }

    return (
        <Layout pagina={`Guitarra ${nombre}`}>
            <div className={Styles.guitarra}>
                <Image
                    layout='responsive'
                    width={180}
                    height={350}
                    src={imagen.data.attributes.url}
                    alt={`Imagen Guitarra ${nombre}`}
                    priority
                />
                <div className={Styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={Styles.descripcion}>{descripcion}</p>
                    <p className={Styles.precio}>${precio}</p>
                    <form className={Styles.formulario} onSubmit={handleSubmit}>
                        <label>Cantidad:</label>
                        <select
                            value={cantidad}
                            onChange={(e) => setCantidad(parseInt(e.target.value))}>
                            <option value="">-- Seleccione --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <input
                            type="submit"
                            value="Agregar al Carrito"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ query: { url } }) {

    const urlGuitarra = `${process.env.API_URL}/guitarras?filters[url][$eq]=${url}&populate=*`
    const respuesta = await fetch(urlGuitarra)
    const guitarra = await respuesta.json()

    if (!guitarra) {
        return {
            //  notFound: true,
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            guitarra
        }
    }
}