import Layout from '../components/Layout'
import ListadoBlog from '../components/ListadoBlog'
import ListadoBlogCarrusel from '../components/ListadoBlogCarrusel'

export default function Blog({ entradas }) {
    // console.log(entradas)

    //const blogs = entradas.data

    return (
        <div>
            <Layout pagina="blog">
                <main className='contenedor'>
                    <h2 className='heading'>Blog</h2>
                    <ListadoBlog
                        blogs={entradas}
                    />
                </main>
                <div className='contenedor'>
                    <h2 className='heading'>Blog en carrusel</h2>
                    <ListadoBlogCarrusel
                        blogs={entradas}
                    />
                </div>
            </Layout>
        </div>
    )
}

export async function getStaticProps() {

    const url = `${process.env.API_URL}/blogs/?populate=*`
    const respuesta = await fetch(url)
    const entradas = await respuesta.json()

    //console.log(entradas)

    return {
        props: {
            entradas
        }
    }
}