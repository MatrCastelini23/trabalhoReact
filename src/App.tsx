import { useCallback, useEffect, useState } from "react";
import Atributos from "./components/Atributos";

function App() {
  const [vida, setVida] = useState(100);
  const [energia, setEnergia] = useState(100);
  const [comida, setComida] = useState(5);
  const [recursos, setRecursos] = useState(0);

  const comer = useCallback(() => {
    setComida(comida - 1),
      setVida(vida + 20),
      alert("Voce comeu \n recurperou 20 de vida")
  }, [comida, vida])

  const descansar = useCallback(() => {
    setEnergia(energia + 30),
      setVida(vida + 5),
      alert("Voce descansou \n recuperou 5 de vida e 30 de energia")
  }, [energia, vida])

  const trabalhar = useCallback(() => {
    setEnergia(energia - 25),
      setRecursos(recursos + 10),
      alert("Voce trabalho \n Conseguiu mais 10 recursos")
  }, [energia, recursos])

  return (
    <>
      <div>
        <Atributos
          vida={vida}
          energia={energia}
          comida={comida}
          recursos={recursos}
        />
      </div>
      <div>
        <button>Explorar</button>
        <button onClick={descansar}>Descansar</button>
        <button onClick={comer}>Comer</button>
        <button onClick={trabalhar}>Trabalhar</button>
      </div>
    </>
  )
}

export default App
