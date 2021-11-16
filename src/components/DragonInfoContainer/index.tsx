import React from "react";
import { useParams } from "react-router";

import Dragon from "../../services/dragon";
import DragonCard, { DragonProps } from "../../components/DragonCard";

import "./style.scss";
import FormModal from "../FormModal.tsx";

export default function DragonInfoContainer() {
  const [currentDragon, setCurrentDragon] = React.useState<DragonProps | null>(
    null
  );
  const [dragon, setDragon] = React.useState<DragonProps>(Dragon.emptyDragon);
  const { id } = useParams<"id">();

  const loadDragon = React.useCallback(() => {
    const getDragon = async () => await (await Dragon.getDragon(id ?? "")).data;

    getDragon().then((data) => setDragon(data));
  }, [id]);

  React.useEffect(() => {
    loadDragon();
  }, [loadDragon]);

  const editDragon = (dragon: DragonProps) => {
    setCurrentDragon(dragon);
  };

  return (
    <>
      <FormModal
        display={!!currentDragon}
        dragon={currentDragon}
        onClose={() => setCurrentDragon(null)}
        onComplete={loadDragon}
      />
      <div className="dragoninfo-container">
        <DragonCard
          dragon={dragon}
          showViewButton={false}
          onEdit={editDragon}
        />
      </div>
    </>
  );
}
