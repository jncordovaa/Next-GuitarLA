import Entrada from "./Entrada"
import Styles from '../styles/Blog.module.css'

export default function ListadoBlog({ blogs }) {

    const listadoBlogs = blogs.data
    return (
        <div className={Styles.blog}>
            {listadoBlogs.map(entrada => (
                <Entrada
                    key={entrada.id}
                    entrada={entrada}
                />
            ))}
        </div>
    )
}