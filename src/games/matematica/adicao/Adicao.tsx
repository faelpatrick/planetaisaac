import React, { useState, useEffect } from "react";
import Voltar from "../../../components/Voltar";
import { Modal, abrirModal } from "../../../components/Modal";
const Adicao = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [placar, setPlacar] = useState<number>(0);
  const [resposta, setResposta] = useState<number>(-1);
  const [conteudoModal, setConteudoModal] = useState<string>(" VAZIO ");

  //inicia gerando uma questão
  useEffect(() => {
    gerarPergunta();
  }, []);

  // gerar questão aleatoria
  const gerarPergunta = () => {
    const novoNum1 = Math.floor(Math.random() * 10);
    let novoNum2 = Math.floor(Math.random() * 10);

    setNum1(novoNum1);
    setNum2(novoNum2);
  };

  const escreverResposta = (num: number) => {
    console.log("num: ", num);
    console.log("resposta: ", resposta);

    if (resposta === -1) {
      setResposta(num);
      return;
    } else setResposta(parseInt(resposta.toString() + num.toString()));

    // subistitui caso ja tenha dois digitos
    if (resposta.toString().length === 2) {
      setResposta(-1);
    }
  };

  // apagar estilo backspace com o slice(0,-1)
  const apagarResposta = () => {
    resposta >= 10 ? setResposta(parseInt(resposta.toString().slice(0, -1))) : setResposta(-1);
  };

  const verificarResposta = (resposta: number) => {
    if (resposta === num1 + num2) {
      setPlacar(placar + 1);
      abrirModal("Parabéns, você acertou!", "green");
      setResposta(-1);
      gerarPergunta();
      return;
    }
    abrirModal("Infelizmente, você Errou", "red");
    setResposta(-1);
    gerarPergunta();
  };

 

  return (
    <div className="operacao-container">
      <Voltar />
      <div className="display-placar">
        Pontos:
        <div className="placar"> {placar}</div>
      </div>
      <div className="display-pergunta">
        {num1} + {num2} = {resposta !== -1 ? <span>{resposta}</span> : <span>?</span>}
      </div>
      <div className="botoes-resposta">
        {Array.from({ length: 10 }, (_, i) => (
          <button className="btn-resposta" key={i} onClick={() => escreverResposta(i)}>
            {i}
          </button>
        ))}
        <button className="btn-resposta btn-apagar" onClick={() => apagarResposta()}>
          {" "}
          «{" "}
        </button>
        <button className="btn-resposta" onClick={() => verificarResposta(resposta)}>
          {" "}
          ={" "}
        </button>
      </div>

      <Modal/>
    </div>
  );
};

export default Adicao;
