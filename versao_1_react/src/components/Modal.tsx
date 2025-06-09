import React, { useState } from "react";

interface modalProps {
  colorModal?: string;
  conteudoModal?: string;
}

export const Modal: React.FC<modalProps> = ({ colorModal = "green", conteudoModal = "" }) => {
  const urlDinoImg = colorModal === "green" ? "/assets/dino-feliz.png" : "/assets/dino-triste.png";

  return (
    <>
      <div className="modal" id="myModal">
        <div className="modal-content" onClick={() => abrirModal()}>
          <p id="modalText">{conteudoModal}</p>
          <img id="dinoImg" width="150px" src={urlDinoImg} alt="" />
        </div>
      </div>
    </>
  );
};

export const abrirModal = (msg: string = "VAZIO", color: string = "black") => {
  let myModal = document.getElementById("myModal");
  let modalStatus = myModal!.style.display;

   //mudar imagem dino
   const urlimgDino = color === "green" ? "/assets/dino-feliz.png" : "/assets/dino-triste.png";
   document.getElementById("dinoImg")!.setAttribute("src", urlimgDino);
 
  // mudar cor do fundo
  myModal?.style.setProperty("background-color", color);

 
  //mudar texto no modal
  document.getElementById("modalText")!.innerHTML = msg;

  // mudar display do modal
  myModal!.style.display = modalStatus === "block" ? "none" : "block";
};
