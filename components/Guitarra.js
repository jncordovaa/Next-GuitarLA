import Image from "next/image"
import Link from "next/link"
import Styles from "../styles/Guitarra.module.css"

export default function Guitarra({ guitarra }) {

    //console.log('---->Guitarra')
    //console.log(guitarra.attributes)
    const { descripcion, nombre, precio, url, imagen } = guitarra.attributes
    return (
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
                <Link href={`/guitarras/${url}`}>
                    <a className={Styles.enlace}>
                        Ver producto
                    </a>
                </Link>
            </div>
        </div>
    )
}