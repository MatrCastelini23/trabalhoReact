
interface IAtributosProps {
    vida: number;
    energia: number;
    comida: number;
    recursos: number;
}

function Atributos({ vida, energia, comida, recursos }: IAtributosProps) {

    return (
        <div>
            <h1>Atributos</h1>
            <ul>
                <li>{vida}</li>
                <li>{energia}</li>
                <li>{comida}</li>
                <li>{recursos}</li>
            </ul>
        </div>
    )
}

export default Atributos;