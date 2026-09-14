interface IEndProps {
    newGame: () => void,
}

function End({ newGame }: IEndProps) {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        newGame();
    }

    return (
        <div>
            <h1>Fim</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Novo jogo</button>
                <button>Sair</button>
            </form>
        </div>
    )
}

export default End;