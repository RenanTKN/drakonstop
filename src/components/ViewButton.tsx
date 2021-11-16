import { View } from "../icons";
import ButtonLink from "./ButtonLink";
import Fab from "./Fab";

interface ViewButtonProps {
  id: string;
}

export default function ViewButton({ id }: ViewButtonProps) {
  return (
    <ButtonLink to={id}>
      <Fab>
        <View />
      </Fab>
    </ButtonLink>
  );
}
