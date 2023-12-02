// Em src/components/Voltar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Voltar.css';

const Voltar = () => {
  const navigate = useNavigate();

  const voltarParaHome = () => {
    navigate('/');
  };

  return (
    <button className='btn-voltar' onClick={voltarParaHome}>
      ⬅️ Voltar
    </button>
  );
};

export default Voltar;
