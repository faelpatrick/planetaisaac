import React from "react";

interface GameCategoryProps {
  category: string;
  games: string[];
}

const GameCategory: React.FC<GameCategoryProps> = ({ category, games }) => {
  return (
    <section>
      <h2>{category}</h2>
      {/* Lista de jogos, mapeando os 'games' para thumbnails */}
    </section>
  );
};

export default GameCategory;