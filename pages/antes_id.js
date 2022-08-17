import Image from 'next/image'
import Layout from '../components/Layout'
import { formatearFecha } from '../helpers'
import styles from '../../styles/Entrada.module.css'
import NoEncontrado from './404';

export default function EntradaBlog({ entrada }) {
    /* if (entrada == null) {
         return (<NoEncontrado />);
     }*/
    const { contenido, titulo, resumen, imagen, publishedAt } = entrada.data.attributes

    return (
        <Layout>
            <main className='contenedor'>
                <h1 className='heading'>{titulo}</h1>
                <article className={styles.entrada}>
                    <Image
                        layout="responsive"
                        width={800}
                        height={600}
                        src={imagen.data.attributes.url}
                        alt={`Imagen entrada ${titulo}`}
                    />

                    <div className={styles.contenido}>
                        <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
                        <p className={styles.texto}>{contenido}</p>
                    </div>
                </article>
            </main>
        </Layout>

    )
}

//Cuando se usa getStaticProps en Router dinámico es necesario usar getStaticPaths para generar todas las rutas al momento de compilar
export async function getStaticPaths() {

    const url = `${process.env.API_URL}/blogs/?populate=*`
    const respuesta = await fetch(url)
    const entradas = await respuesta.json()

    const nuevasEntradas = entradas.data

    const paths = nuevasEntradas.map(entrada => ({
        params: { id: entrada.id.toString() }
    }))

    return {
        paths,
        fallback: false //muchas entrads true, pocas seria false
    }
}

export async function getStaticProps({ params: { id } }) {

    const url = `${process.env.API_URL}/blogs/${id}/?populate=*`
    const respuesta = await fetch(url)
    const entrada = await respuesta.json()
    //console.log(id)//se visualiza en la terminal
    return {
        props: {
            entrada
        }
    }
}

//Cuando se está accediendo routing dinámico se pasa el valor de router.query
/*export async function getServerSideProps({ query: { id } }) {

    const url = `http://localhost:1337/api/blogs/${id}/?populate=*`
    //console.log(url)
    const respuesta = await fetch(url)
    const entrada = await respuesta.json()
    //console.log(entradas)
    //console.log(id)//se visualiza en la terminal
    return {
        props: {
            entrada
        }
    }
}*/