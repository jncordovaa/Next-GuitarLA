import Link from 'next/link'
import Image from 'next/image'
import { formatearFecha } from '../helpers'
import styles from '../styles/EntradaCarrusel.module.css'

export default function Entrada({ entrada }) {

    const { titulo, resumen, imagen, publishedAt, url } = entrada.attributes
    const id = entrada.id
    //console.log(url)

    return (
        <article className={styles.contenido}>
            <Image
                layout='responsive'
                width={800}
                height={600}
                src={imagen.data.attributes.url}
                alt={`imagen blog ${titulo}`}
                priority
            />

            <div className={styles.contenido}>
                <h3>{titulo}</h3>
                <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
                <Link href={`/blog/${url}`}>
                    <a className={styles.enlace}>
                        Leer Entrada
                    </a>

                </Link>
            </div>

        </article>


    )
}