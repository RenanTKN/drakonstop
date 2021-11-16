import { memo } from "react";
import { truncate } from "lodash";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { Calendar } from "../../icons";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import Tooltip from "../Tooltip";
import ViewButton from "../ViewButton";
import DefaultIage from "../../assets/images/default.png";

import Dragon from "../../services/dragon";

import "./style.scss";

export interface DragonProps {
  id: string;
  name: string;
  createdAt: string;
  type: string;
}

export interface DragonCardProps {
  dragon: DragonProps;
  showViewButton?: boolean;
  onEdit?: (dragon: DragonProps) => void;
  refreshDragons?: () => void;
}

const DragonCard = ({
  dragon,
  showViewButton = true,
  onEdit,
  refreshDragons,
}: DragonCardProps) => {
  const { id, name, createdAt, type } = dragon;
  const idParam = useParams<"id">().id;
  const datetime = new Date(createdAt).toLocaleString();
  const navigate = useNavigate();

  const onDelete = () => {
    if (window.confirm(`Excluir Dragão #${id} ${name}?`)) {
      Dragon.deleteDragon(id).then((res) => {
        if (res.status !== 200) {
          alert("Erro ao excluir.");
        } else {
          if (!!idParam) {
            navigate("/");
          } else {
            refreshDragons?.();
          }
        }
      });
    }
  };

  return (
    <div className="dragon-card">
      <div>
        <div className="header">
          <h1>
            <Tooltip text={name}>{truncate(name, { length: 20 })}</Tooltip>
          </h1>
          <div className="action-buttons">
            {showViewButton && (
              <Tooltip text="Vizualizar">
                <ViewButton id={id} />
              </Tooltip>
            )}
            <Tooltip text="Editar">
              <EditButton dragon={dragon} onClick={onEdit} />
            </Tooltip>
            <Tooltip text="Excluir">
              <DeleteButton
                onClick={() => {
                  onDelete();
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="date">
          <Calendar />
          {datetime}
        </div>
      </div>
      <div className="image">
        <img
          src={type}
          onError={(e) => {
            (e.target as HTMLImageElement).src = DefaultIage;
          }}
          alt={name}
        />
      </div>
    </div>
  );
};

export default memo(DragonCard);
