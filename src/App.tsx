import React from "react";
import games from "./games";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {Object.entries(games).map(([categoria, jogos]) => (
          <div key={categoria}>
            <h2>{categoria}</h2>
            <ul>
              {Object.entries(jogos).map(([nomeJogo, ComponenteJogo]) => (
                <li key={nomeJogo}>
                  Jogo: {nomeJogo}
                  {/* ComponenteJogo pode ser renderizado aqui se necessário */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
