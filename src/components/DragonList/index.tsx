import React from "react";

import DragonCard, { DragonProps } from "../DragonCard";
import FormModal from "../FormModal.tsx";

import "./style.scss";

interface DragonListProps {
  dragons: DragonProps[];
  loadDragons: () => void;
}

export default function DragonList({ dragons, loadDragons }: DragonListProps) {
  const [currentDragon, setCurrentDragon] = React.useState<DragonProps | null>(
    null
  );

  const editDragon = (dragon: DragonProps) => {
    setCurrentDragon(dragon);
  };

  return (
    <>
      <FormModal
        display={!!currentDragon}
        dragon={currentDragon}
        onClose={() => setCurrentDragon(null)}
        onComplete={loadDragons}
      />
      <div className="dragons-container">
        {dragons.map((dragon, i) => {
          return (
            <DragonCard
              key={i}
              dragon={dragon}
              onEdit={editDragon}
              refreshDragons={loadDragons}
            />
          );
        })}
      </div>
    </>
  );
}
