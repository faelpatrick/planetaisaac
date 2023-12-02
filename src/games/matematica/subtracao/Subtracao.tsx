import React, { useState, useEffect } from "react";
import Voltar from "../../../components/Voltar";
import "./Subtracao.css";

const Subtracao = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [placar, setPlacar] = useState<number>(0);

  useEffect(() => {
    gerarPergunta();
  }, []);

  const gerarPergunta = () => {
    const novoNum1 = Math.floor(Math.random() * 10);
    let novoNum2 = Math.floor(Math.random() * 10);

    while (novoNum1 === novoNum2) {
      novoNum2 = Math.floor(Math.random() * 10);
    }

    setNum1(novoNum1);
    setNum2(novoNum2);
  };

  const verificarResposta = (resposta: number) => {
    if (resposta === num1 - num2) {
      setPlacar(placar + 1);
    }
    gerarPergunta();
  };

  return (
    <div className="subtracao-container">
      <Voltar />
      <div className="display-placar">
        Pontos:
        <div className="placar"> {placar}</div>
      </div>
      <div className="display-pergunta">
        {num1} - {num2} = ?
      </div>
      <div className="botoes-resposta">
        {Array.from({ length: 10 }, (_, i) => (
          <button className="btn-resposta" key={i} onClick={() => verificarResposta(i)}>
            {i}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Subtracao;
