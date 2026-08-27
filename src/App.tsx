import { useLocalStorage } from "./hooks/useLocalStorage"
import Game from "./pages/Game"

const initialStatus = {
  vida: 100,
  energia: 100,
  comida: 5,
  recursos: 0
}

const historicoPlays = {}

function App() {
  const [name, setName] = useLocalStorage('player', '');
  const [status, setStatus] = useLocalStorage('playerStatus', initialStatus)
  const [historico, setHistorico] = useLocalStorage('historico', historicoPlays)
  return (
    <>
      <Game />
    </>
  )
}

export default App
