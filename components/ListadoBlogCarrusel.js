import EntradaCarrusel from "./EntradaCarrusel"
import Styles from '../styles/BlogCarrusel.module.css'

export default function ListadoBlogCarrusel({ blogs }) {

    const listadoBlogs = blogs.data
    return (
        <section className={Styles.blog}>
            {listadoBlogs.map(entrada => (
                <EntradaCarrusel
                    key={entrada.id}
                    entrada={entrada}
                />
            ))}
        </section>
    )
}