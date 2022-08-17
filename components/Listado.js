import Guitarra from "./Guitarra"
import Styles from "../styles/Listado.module.css"

export default function Listado({ guitarras }) {

    //console.log('---->Listado')
    //console.log(guitarras)

    const listadoGuitarras = guitarras.data

    return (
        <div>
            <div className={Styles.listado}>
                {listadoGuitarras && listadoGuitarras.map(guitarra => (
                    <Guitarra
                        key={guitarra.id}
                        guitarra={guitarra}
                    />
                ))

                }
            </div>
        </div>

    )
}