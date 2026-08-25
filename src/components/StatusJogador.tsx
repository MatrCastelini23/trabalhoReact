
interface IStatusJogadorProps {
    vida: number,
    energia: number,
    comida: number,
    recursos: number,
}

export function StatusJogador(props: IStatusJogadorProps) {

    return (
        <div>
            <h1>Atributos: </h1>
            <p>Vida: {props.vida}</p>
            <p>Energia: {props.energia}</p>
            <p>Comida: {props.comida}</p>
            <p>Recuros: {props.recursos}</p>
        </div>
    )
}