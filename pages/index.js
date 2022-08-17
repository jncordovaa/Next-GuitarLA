
import Curso from '../components/Curso'
import Layout from '../components/Layout'
import Listado from '../components/Listado'
import ListadoBlog from '../components/ListadoBlog'

export default function Home({ guitarras, curso, blogs }) {
  return (
    <div>
      <Layout
        pagina="inicio"
        guitarra={guitarras.data[0]}
      >
        <main className='contenedor'>
          <h1 className='heading'>Nuestra Colección</h1>
          <Listado
            guitarras={guitarras}
          />
        </main>
        <Curso
          curso={curso}
        />
        <div className='contenedor'>
          <h1 className='heading'>Blog</h1>
          <ListadoBlog
            blogs={blogs}
          />
        </div>

      </Layout>

    </div>
  )
}

export async function getServerSideProps() {

  const urlGuitarras = `${process.env.API_URL}/guitarras/?populate=*&sort=createdAt:desc`
  const urlCurso = `${process.env.API_URL}/curso/?populate=*`
  const urlBlog = `${process.env.API_URL}/blogs/?populate=*&pagination[limit]=3`

  const [rptaGuitarras, rptaCurso, rptaBlog] = await Promise.all([
    fetch(urlGuitarras),
    fetch(urlCurso),
    fetch(urlBlog)
  ])

  const [guitarras, curso, blogs] = await Promise.all([
    rptaGuitarras.json(),
    rptaCurso.json(),
    rptaBlog.json()

  ])

  return {
    props: {
      guitarras,
      curso,
      blogs
    }
  }
}
