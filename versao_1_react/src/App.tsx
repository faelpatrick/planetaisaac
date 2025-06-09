import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import games from "./games";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {Object.entries(games).map(([categoria, jogos]) => (
                    <div className="home-games-list" key={categoria}>
                      <h2>{categoria}</h2>
                      <ul>
                        {Object.entries(jogos).map(([nomeJogo, ComponenteJogo]) => (
                          <li key={nomeJogo}>
                            <Link to={`/${categoria.toLowerCase()}/${nomeJogo.toLowerCase()}`}>{nomeJogo}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              }
            />
            {Object.entries(games).map(([categoria, jogos]) =>
              Object.entries(jogos).map(([nomeJogo, ComponenteJogo]) => <Route key={nomeJogo} path={`/${categoria.toLowerCase()}/${nomeJogo.toLowerCase()}`} element={<ComponenteJogo />} />)
            )}
          </Routes>
        </header>

        <footer>
          Planeta Isaac - Desenvolvido por <a href="https://linktr.ee/faelpatrick"> Rafael Patrick</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
