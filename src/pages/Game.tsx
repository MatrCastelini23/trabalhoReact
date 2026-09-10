import { useState, useCallback, useEffect, type ReactNode } from "react";
import { StatusJogador } from "../components/StatusJogador";

interface IGameProps {
    setScreen: (screen: string) => void;
}

function Game({ setScreen }: IGameProps) {
    const [vida, setVida] = useState(100);
    const [energia, setEnergia] = useState(100);
    const [comida, setComida] = useState(5);
    const [recursos, setRecursos] = useState(0);
    const [jogadas, setJogadas] = useState(0);
    const [aux, setAux] = useState(0)
    const [historico, setHistorico] = useState([
        { id: 2000, message: "" }
    ])

    const comer = useCallback(() => {
        setComida((current) => current - 1),
            setVida((current) => current + 20),
            setJogadas((current) => current + 1),
            setAux((current) => current + 1),
            setHistorico([...historico, { id: jogadas, message: "Voce comeu \n Vida: +20, Comida: -1" }])
    }, [historico, comida, vida, jogadas, aux])

    const descansar = useCallback(() => {
        setEnergia((current) => current + 30),
            setVida((current) => current + 5),
            setJogadas((current) => current + 1),
            setAux((current) => current + 1),
            setHistorico([...historico, { id: jogadas, message: "Voce descansou \n vida: +5, energia: +30" }])
    }, [historico, energia, vida, jogadas, aux])

    const trabalhar = useCallback(() => {
        setEnergia((current) => current - 25),
            setRecursos((current) => current + 10),
            setJogadas((current) => current + 1),
            setAux((current) => current + 1),
            setHistorico([...historico, { id: jogadas, message: "Voce trabalho \n recursos +10" }])
    }, [historico, energia, recursos, jogadas, aux])

    const explorar = useCallback(() => {
        setJogadas((current) => current + 1)
        setAux(0)
        const random = Math.floor(Math.random() * (5 - 1 + 1) + 1)
        if (random == 1) return setComida((current) => current + 2), setHistorico([...historico, { id: jogadas, message: "Resultado da exploração: Voce encontrou comida Comida: +2" }])
        if (random == 2) return setRecursos((current) => current + 10), setHistorico([...historico, { id: jogadas, message: "Resultado da exploração: \n Voce encontrou recusos \n Recursos: +10" }])
        if (random == 3) return setVida((current) => current - 45), setHistorico([...historico, { id: jogadas, message: "Resultado da exploração: \n Voce perdeu vida \n Vida: -45" }])
        if (random == 4) return setEnergia((current) => current - 40), setHistorico([...historico, { id: jogadas, message: "Resultado da exploração: \n Voce perdeu energia \n Energia: -40" }])
        if (random == 5) return setHistorico([...historico, { id: jogadas, message: "Resultado da exploração: \n Nada aconteceu" }])
    }, [historico, aux, jogadas, recursos, comida, recursos, energia])

    useEffect(() => {
        if (recursos >= 50 && vida >= 1) {
            alert('Voce venceu')
            setScreen('end')
        }
    }, [recursos, vida, setScreen])

    useEffect(() => {
        if (vida <= 0 || energia <= 0) {
            alert('Voce Perdeu')
            setScreen('end')
        }
    }, [vida, energia, setScreen])

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
                <button
                    onClick={explorar}
                >Explorar</button>
                <button
                    onClick={descansar}
                    disabled={aux == 2 ? true : false}
                >Descansar</button>
                <button
                    onClick={comer}
                    disabled={aux == 2 ? true : false}
                >Comer</button>
                <button
                    onClick={trabalhar}
                    disabled={aux == 2 ? true : false}
                >Trabalhar</button>
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
                            {historico.map((h) => (
                                <tr key={h.id}>
                                    <td>{h.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Game