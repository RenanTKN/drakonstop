import { Trash } from "../icons";
import { DragonProps } from "./DragonCard";
import Fab from "./Fab";

interface DeleteButtonProps {
  dragon: DragonProps;
  onClick?: (dragon: DragonProps) => void;
}

export default function DeleteButton({ dragon, onClick }: DeleteButtonProps) {
  const handleClick = () => {
    onClick?.(dragon);
  };

  return (
    <Fab color="red" onClick={handleClick}>
      <Trash />
    </Fab>
  );
}
