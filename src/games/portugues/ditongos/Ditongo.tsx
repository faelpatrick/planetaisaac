import React, { useState, useEffect } from "react";
import Voltar from "../../../components/Voltar";
import { Modal, abrirModal } from "../../../components/Modal";

const Ditongo = () => {
  const [consoante, setconsoante] = useState<string>("");
  const [vogal, setvogal] = useState<string>("");
  const [placar, setPlacar] = useState<number>(0);
  const [resposta, setResposta] = useState<string>("");
  const consoantes = ["p", "t", "l", "d"];
  const vogais = ["a", "e", "i", "o", "u"];
  //inicia gerando uma questão
  useEffect(() => {
    gerarPergunta();
  }, []);

  // Função para gerar um número aleatório entre 0 e o tamanho dos arrays
  function getRandomIndex(arr: Array<string>) {
    return Math.floor(Math.random() * arr.length);
  }

  // gerar questão aleatoria
  function gerarCombinaçãoAleatória() {
    const consoanteAleatória = consoante;
    const vogalAleatória = vogais[Math.floor(Math.random() * vogais.length)];
    return consoanteAleatória + vogalAleatória;
  }
  const gerarPergunta = () => {
    const consoante = consoantes[getRandomIndex(consoantes)];
    const vogal = vogais[getRandomIndex(vogais)];

    setconsoante(consoante);
    setvogal(vogal);
  };

  const escreverResposta = (letra: string) => {
    setResposta(letra);
  };

  // apagar estilo backspace com o slice(0,-1)
  const apagarResposta = () => {
    setResposta("?");
  };

  const verificarResposta = (resposta: string) => {
    if (resposta === consoante + vogal) {
      setPlacar(placar + 1);
      abrirModal("Parabéns, você acertou!", "green");
      setResposta("?");
      gerarPergunta();
      return;
    }
    abrirModal("Infelizmente, você Errou", "red");
    setResposta("?");
    gerarPergunta();
  };

  return (
    <div className="operacao-container">
      <Voltar />
      <div className="display-placar">
        Pontos:
        <div className="placar"> {placar}</div>
      </div>
      <div className="display-pergunta cursiva">
        {consoante} + {vogal} = {resposta !== "?" ? <span>{resposta}</span> : <span>?</span>}
      </div>
      <div className="botoes-resposta">
        {vogais.map((vog, i) => (
          <button className="btn-resposta cursiva" key={i} onClick={() => escreverResposta(consoante + vog)}>
            {consoante + vog}
          </button>
        ))}

        <button className="btn-resposta btn-apagar" onClick={() => apagarResposta()}>
          {" « "}
        </button>
        <button className="btn-resposta" onClick={() => verificarResposta(resposta)}>
          {" = "}
        </button>
      </div>

      <Modal />
    </div>
  );
};

export default Ditongo;
