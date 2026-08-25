import { useState } from "react"

interface IHistoricoProps {
    id: number,
    message: string,
}

export function Historico(props: IHistoricoProps) {
    let id = props.id;
    let message = props.message;

    const [historico, setHistorico] = useState([
        { id: 20000, message: "" }
    ]);

    return (
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
    )
}