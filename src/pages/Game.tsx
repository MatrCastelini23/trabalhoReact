import { useCallback, useEffect } from "react";
import { StatusJogador } from "../components/StatusJogador";
import { useLocalStorage } from "../hooks/useLocalStorage"; // ajuste o caminho conforme seu projeto

interface IGameProps {
    setScreen: (screen: string) => void;
}

interface IHistoricoItem {
    id: number;
    message: string;
}

interface IGameState {
    vida: number;
    energia: number;
    comida: number;
    recursos: number;
    jogadas: number;
    aux: number;
    historico: IHistoricoItem[];
}

const STORAGE_KEY = "game-state";

const initialGameState: IGameState = {
    vida: 100,
    energia: 100,
    comida: 5,
    recursos: 0,
    jogadas: 0,
    aux: 0,
    historico: [],
};

function Game({ setScreen }: IGameProps) {
    const [gameState, setGameState] = useLocalStorage<IGameState>(
        STORAGE_KEY,
        initialGameState
    );

    const { vida, energia, comida, recursos, aux, historico } = gameState;

    const comer = useCallback(() => {
        setGameState((current) => ({
            ...current,
            comida: current.comida - 1,
            vida: current.vida + 20,
            jogadas: current.jogadas + 1,
            aux: current.aux + 1,
            historico: [
                ...current.historico,
                { id: current.jogadas, message: "Voce comeu \n Vida: +20, Comida: -1" },
            ],
        }));
    }, [setGameState]);

    const descansar = useCallback(() => {
        setGameState((current) => ({
            ...current,
            energia: current.energia + 30,
            vida: current.vida + 5,
            jogadas: current.jogadas + 1,
            aux: current.aux + 1,
            historico: [
                ...current.historico,
                { id: current.jogadas, message: "Voce descansou \n vida: +5, energia: +30" },
            ],
        }));
    }, [setGameState]);

    const trabalhar = useCallback(() => {
        setGameState((current) => ({
            ...current,
            energia: current.energia - 25,
            recursos: current.recursos + 10,
            jogadas: current.jogadas + 1,
            aux: current.aux + 1,
            historico: [
                ...current.historico,
                { id: current.jogadas, message: "Voce trabalhou \n recursos +10" },
            ],
        }));
    }, [setGameState]);

    const explorar = useCallback(() => {
        const random = Math.floor(Math.random() * (5 - 1 + 1) + 1);

        setGameState((current) => {
            const jogadaAtual = current.jogadas;
            let update: Partial<IGameState> = {};
            let message = "";

            switch (random) {
                case 1:
                    update = { comida: current.comida + 2 };
                    message = "Resultado da exploração: Voce encontrou comida Comida: +2";
                    break;
                case 2:
                    update = { recursos: current.recursos + 10 };
                    message = "Resultado da exploração: \n Voce encontrou recursos \n Recursos: +10";
                    break;
                case 3:
                    update = { vida: current.vida - 45 };
                    message = "Resultado da exploração: \n Voce perdeu vida \n Vida: -45";
                    break;
                case 4:
                    update = { energia: current.energia - 40 };
                    message = "Resultado da exploração: \n Voce perdeu energia \n Energia: -40";
                    break;
                default:
                    message = "Resultado da exploração: \n Nada aconteceu";
            }

            return {
                ...current,
                ...update,
                jogadas: jogadaAtual + 1,
                aux: 0,
                historico: [...current.historico, { id: jogadaAtual, message }],
            };
        });
    }, [setGameState]);

    const resetGame = useCallback(() => {
        setGameState(initialGameState);
    }, [setGameState]);

    useEffect(() => {
        if (recursos >= 50 && vida >= 1) {
            alert("Voce venceu");
            resetGame();
            setScreen("end");
        }
    }, [recursos, vida, setScreen, resetGame]);

    useEffect(() => {
        if (vida <= 0 || energia <= 0) {
            alert("Voce Perdeu");
            resetGame();
            setScreen("end");
        }
    }, [vida, energia, setScreen, resetGame]);

    return (
        <>
            <div>
                <StatusJogador
                    vida={vida}
                    energia={energia}
                    comida={comida}
                    recursos={recursos}
                />
            </div>
            <div>
                <button onClick={explorar}>Explorar</button>
                <button onClick={descansar} disabled={aux === 2}>
                    Descansar
                </button>
                <button onClick={comer} disabled={aux === 2}>
                    Comer
                </button>
                <button onClick={trabalhar} disabled={aux === 2}>
                    Trabalhar
                </button>
            </div>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Historico</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historico.map((h, index) => (
                                <tr key={`${h.id}-${index}`}>
                                    <td>{h.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Game;