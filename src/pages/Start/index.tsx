interface IStartProps {
    onStart: () => void,
}

function Start({ onStart }: IStartProps) {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onStart();
    }
    return (
        <div>
            <h1>Inicio</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Novo jogo</button>
                <button>Continuar</button>
                <button>Sair</button>
            </form>
        </div>
    )
}

export default Start;