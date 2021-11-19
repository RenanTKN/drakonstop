import { Edit } from "../icons";
import { DragonProps } from "./DragonCard";
import Fab from "./Fab";

interface EditButtonProps {
  dragon: DragonProps;
  onClick?: (dragon: DragonProps) => void;
}

export default function EditButton({ dragon, onClick }: EditButtonProps) {
  const handleClick = () => {
    onClick?.(dragon);
  };

  return (
    <Fab color="yellow" onClick={handleClick}>
      <Edit />
    </Fab>
  );
}
