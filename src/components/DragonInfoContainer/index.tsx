import React from "react";
import { useParams } from "react-router";

import Dragon from "../../services/dragon";
import DragonCard, { DragonProps } from "../../components/DragonCard";

import "./style.scss";
import FormModal from "../FormModal.tsx";
import RemoveModal from "../RemoveModal";

export default function DragonInfoContainer() {
  const [displayForm, setDisplayForm] = React.useState(false);
  const [displayRemoveDragon, setDisplayRemoveDragon] = React.useState(false);
  const [dragon, setDragon] = React.useState<DragonProps>(Dragon.emptyDragon);
  const { id } = useParams<"id">();

  const loadDragon = React.useCallback(() => {
    const getDragon = async () => await (await Dragon.getDragon(id ?? "")).data;

    getDragon().then((data) => setDragon(data));
  }, [id]);

  React.useEffect(() => {
    loadDragon();
  }, [loadDragon]);

  const onEdit = () => {
    setDisplayForm(true);
  };

  return (
    <>
      <FormModal
        display={displayForm}
        dragon={dragon}
        onClose={() => setDisplayForm(false)}
        onComplete={loadDragon}
      />
      <RemoveModal
        dragon={dragon}
        display={displayRemoveDragon}
        onClose={() => setDisplayRemoveDragon(false)}
      />
      <div className="dragoninfo-container">
        <DragonCard
          dragon={dragon}
          isDragonInfo={true}
          onEdit={onEdit}
          onDelete={() => {
            setDisplayRemoveDragon(true);
          }}
        />
      </div>
    </>
  );
}
