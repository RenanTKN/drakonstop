import React from "react";
import { sortBy } from "lodash";

import { DragonProps } from "../components/DragonCard";
import DragonList from "../components/DragonList";
import Fab from "../components/Fab";
import FormModal from "../components/FormModal.tsx";
import Title from "../components/Title";
import Tooltip from "../components/Tooltip";
import { Add, List } from "../icons";
import Dragon from "../services/dragon";

export default function Dragons() {
  const [dragons, setDragons] = React.useState<DragonProps[]>([]);
  const [display, setDisplay] = React.useState(false);

  const loadDragons = () => {
    const sortDragons = (dragons: DragonProps[]) =>
      sortBy(dragons, [(dragon) => dragon.name.toLocaleLowerCase()]);

    const getDragons = async () => (await Dragon.getDragons()).data;

    getDragons().then((data) => setDragons(sortDragons(data)));
  };

  React.useEffect(() => {
    loadDragons();
  }, []);

  const handleOpen = () => {
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  return (
    <div>
      <FormModal
        display={display}
        onClose={handleClose}
        onComplete={loadDragons}
      />
      <Title>
        <List /> Dragon List{" "}
        <Tooltip text="Adicionar Dragão">
          <Fab onClick={handleOpen}>
            <Add />
          </Fab>
        </Tooltip>
      </Title>
      <DragonList dragons={dragons} loadDragons={loadDragons} />
    </div>
  );
}
