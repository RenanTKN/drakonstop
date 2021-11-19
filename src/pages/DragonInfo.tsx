import DragonInfoContainer from "../components/DragonInfoContainer";
import Title from "../components/Title";
import { Info } from "../icons";

export default function DragonInfo() {
  return (
    <div>
      <Title><Info /> Dragon Info</Title>
      <DragonInfoContainer />
    </div>
  );
}
