import { useState } from "react"
import { useLocalStorage } from "./hooks/useLocalStorage"
import Game from "./pages/Game"
import Start from "./pages/Start"
import End from "./pages/End"

const initialStatus = {
  vida: 100,
  energia: 100,
  comida: 5,
  recursos: 0
}

const historicoPlays = {}

function App() {
  const [status, setStatus] = useLocalStorage('playerStatus', initialStatus);
  const [historico, setHistorico] = useLocalStorage('historico', historicoPlays);
  const [screen, setScreen] = useState('end');

  if (screen === 'home') {
    return (
      <Start
        onStart={() => setScreen('game')}
      />
    )
  }

  if (screen === 'end') {
    return (
      <End
        newGame={() => setScreen('game')}
      />
    )
  }

  return (
    <Game

    />
  )
}

export default App
