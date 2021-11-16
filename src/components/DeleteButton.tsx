import { Trash } from "../icons";
import Fab from "./Fab";

interface DeleteButtonProps {
  onClick?: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Fab color="red" onClick={onClick}>
      <Trash />
    </Fab>
  );
}
