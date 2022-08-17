import Layout from '../components/Layout'
import Listado from '../components/Listado'
import Listado2 from '../components/Listado2'
import { BsFillGridFill, BsList, BsChevronLeft, BsChevronRight, BsSearch } from 'react-icons/bs'
import { useEffect, useState } from "react"
import Styles from '../styles/Tienda.module.css'

/*esto es una prueba*/
/*export default function Tienda({ guitarras }) {*/
export default function Tienda() {
    //console.log('---->Tienda')
    //console.log(guitarras)
    //console.log(guitarras.meta.pagination.pageCount)
    const [gridView, setGridView] = useState(true)
    const [guitarras, setGuitarras] = useState({})
    const [paginaActual, setPaginaActual] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [busqueda, setBusqueda] = useState({
        tipo: '',
        filtro: ''
    })

    useEffect(() => {

        const obtenerDatos = async () => {
            const url = `http://localhost:1337/api/guitarras/?populate=*&sort=createdAt:desc&pagination[page]=${paginaActual}&pagination[pageSize]=6`
            console.log('obtenerDatos')
            const respuesta = await fetch(url)
            const rptaJson = await respuesta.json()
            setGuitarras(rptaJson)
            setTotalPaginas(rptaJson.meta.pagination.pageCount)
        }
        obtenerDatos()
    }, [busqueda])


    useEffect(() => {

        const obtenerDatosPaginados = async () => {
            const url = `http://localhost:1337/api/guitarras/?populate=*&sort=createdAt:desc&pagination[page]=${paginaActual}&pagination[pageSize]=6`
            console.log('obtenerDatosPaginados')
            const respuesta = await fetch(url)
            const rptaJson = await respuesta.json()
            setGuitarras(rptaJson)
        }
        obtenerDatosPaginados()
    }, [paginaActual])

    const handleSubmit = e => {
        e.preventDefault()

        if (Object.values(busqueda).includes('')) {
            alert('Todos los campos son obligatorios')
            return
        }
    }

    const activarGrid = e => {
        e.preventDefault();
        setGridView(!gridView)
    }

    const siguientePagina = (opcion) => {
        //console.log('siguientePagina')
        let pagina
        if (opcion === '+') {

            pagina = paginaActual + 1
            if (pagina > guitarras.meta.pagination.pageCount) {
                pagina = guitarras.meta.pagination.pageCount
            }
            setPaginaActual(pagina)
        }
        if (opcion === '-') {
            pagina = paginaActual - 1
            if (pagina <= 0) {
                pagina = 1
            }
            setPaginaActual(pagina)
        }
    }

    return (
        <div >
            <Layout pagina="Tienda Virtual">
                <main className='contenedor'>
                    <h1 className='heading'>Nuestra colección</h1>
                    <hr />
                    <div className={Styles.container}>

                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className={Styles.formulario}
                            >
                                <label>Filtro de búsqueda: </label>
                                <select
                                    id='tipo'
                                    name='tipo'
                                    onChange={e => setBusqueda({
                                        ...busqueda,
                                        [e.target.name]: e.target.value
                                    })}
                                >
                                    <option value="">-- Seleccione --</option>
                                    <option value='autor'>Autor</option>
                                    <option value='tema'>Tema</option>
                                    <option value='titulo'>Titulo</option>
                                </select>
                                <input
                                    id='filtro'
                                    name='filtro'
                                    type='text'
                                    placeholder='Ingresa lo que deseas buscar'
                                    onChange={e => setBusqueda({
                                        ...busqueda,
                                        [e.target.name]: e.target.value
                                    })}
                                >

                                </input>
                                <button
                                    type='submit'
                                >
                                    <BsSearch />
                                </button>

                            </form>
                        </div>
                        <div className={Styles.btn_container}>
                            <div className={Styles.btn_container}>
                                <button
                                    type='button'
                                    onClick={activarGrid}
                                    className={`${gridView ? Styles.active : null}`}
                                >
                                    <BsFillGridFill />

                                </button>
                                <button
                                    type='button'
                                    onClick={activarGrid}
                                    className={`${!gridView ? Styles.active : null}`}
                                >
                                    <BsList />
                                </button>
                            </div>
                            <span></span>
                            <div className={Styles.btn_container}>
                                <button
                                    type='button'
                                    onClick={() => siguientePagina('-')}
                                >
                                    <BsChevronLeft />
                                </button>
                                {`${paginaActual} de ${totalPaginas}`}
                                <button
                                    type='button'
                                    onClick={() => siguientePagina('+')}
                                >
                                    <BsChevronRight />
                                </button>

                            </div>
                        </div>

                    </div>

                    <hr />

                    {gridView && (
                        <Listado
                            guitarras={guitarras}
                        />
                    )}

                    {!gridView && (
                        <Listado2
                            guitarras={guitarras}
                        />
                    )}

                </main>
            </Layout>
        </div>
    )
}

/*
export async function getServerSideProps() {

    const url = `${process.env.API_URL}/guitarras/?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=6`
    const respuesta = await fetch(url)
    const guitarras = await respuesta.json()

    //console.log(guitarras)

    return {
        props: {
            guitarras
        }
    }
}*/