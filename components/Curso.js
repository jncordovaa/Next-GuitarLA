import Style from '../styles/Curso.module.css'

export default function Curso({ curso }) {
    console.log('--->curso')
    console.log(curso)
    const { titulo, contenido, imagen } = curso.data.attributes
    console.log(imagen.data.attributes.url)

    return (
        <section>
            <div className={`contenedor ${Style.grid}`}>
                <div className={Style.contenido}>
                    <h2 className='heading'>{titulo}</h2>
                    <p className={Style.texto}>{contenido}</p>
                    <a className={Style.enlace} href="#">Mas información</a>
                </div>
            </div>

            <style jsx> {`
                section {
                    padding: 10rem 0;
                    margin-top: 10rem;
                    background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url});
                    background-size: cover;
                    background-position: 50%;
                }
            `}
            </style>
        </section>

    )
}