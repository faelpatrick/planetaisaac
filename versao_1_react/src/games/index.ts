import Ditongo from './portugues/ditongos/Ditongo';
import Subtracao from './matematica/subtracao/Subtracao';
import Adicao from './matematica/adicao/Adicao';

const games = {
  Portugues: {
    Ditongo,
  },
  Matematica: {
    Subtracao,
    Adicao,
  },
};

export default games;