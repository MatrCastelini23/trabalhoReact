

interface IAcoesProps {
    explorar: void,
    dormir: boolean,
    comer: boolean,
    trabalhar: boolean,
}

export function Acoes() {

    return (
        <div>
            <button>Explorar</button>
            <button>Descansar</button>
            <button>Comer</button>
            <button>Trabalhar</button>
        </div>
    )
}