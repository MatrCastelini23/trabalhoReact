import { useState } from "react"
import Game from "./pages/Game"
import Start from "./pages/Start"
import End from "./pages/End"



function App() {
  const [screen, setScreen] = useState('home');

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
        newGame={() => setScreen('home')}
      />
    )
  }

  return (
    <Game
      setScreen={setScreen}
    />
  )
}

export default App
