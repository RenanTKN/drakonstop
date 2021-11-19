import React from "react";
import Dragon from "../../services/dragon";

import DragonCard, { DragonProps } from "../DragonCard";
import FormModal from "../FormModal.tsx";
import Loading from "../Loading";
import RemoveModal from "../RemoveModal";

import "./style.scss";

interface DragonListProps {
  dragons: DragonProps[];
  loadDragons: () => void;
}

export default function DragonList({ dragons, loadDragons }: DragonListProps) {
  const [currentDragon, setCurrentDragon] = React.useState<DragonProps | null>(
    null
  );
  const [displayForm, setDisplayForm] = React.useState(false);
  const [displayRemoveDragon, setDisplayRemoveDragon] = React.useState(false);

  const onEdit = (dragon: DragonProps) => {
    setCurrentDragon(dragon);
    setDisplayForm(true);
  };

  const onDelete = (dragon: DragonProps) => {
    setCurrentDragon(dragon);
    setDisplayRemoveDragon(true);
  };

  return (
    <>
      <FormModal
        display={displayForm}
        dragon={currentDragon}
        onClose={() => {
          setCurrentDragon(null);
          setDisplayForm(false);
        }}
        onComplete={loadDragons}
      />
      <RemoveModal
        dragon={currentDragon ?? Dragon.emptyDragon}
        display={displayRemoveDragon}
        onClose={() => setDisplayRemoveDragon(false)}
        refreshDragons={loadDragons}
      />
      <div className="dragons-container">
        {dragons.length ? (
          dragons.map((dragon, i) => {
            return (
              <DragonCard
                key={i}
                dragon={dragon}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })
        ) : (
          <Loading center />
        )}
      </div>
    </>
  );
}
