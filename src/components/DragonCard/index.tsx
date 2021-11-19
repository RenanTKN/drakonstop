import React from "react";
import { truncate } from "lodash";

import { Back, Calendar } from "../../icons";
import DefaultIage from "../../assets/images/default.png";
import ButtonLink from "../ButtonLink";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import Fab from "../Fab";
import Loading from "../Loading";
import Tooltip from "../Tooltip";
import ViewButton from "../ViewButton";

import "./style.scss";

export interface DragonProps {
  id: string;
  name: string;
  createdAt: string;
  type: string;
}

export interface DragonCardProps {
  dragon: DragonProps;
  isDragonInfo?: boolean;
  onEdit?: (dragon: DragonProps) => void;
  onDelete?: (dragon: DragonProps) => void;
}

const DragonCard = ({
  dragon,
  isDragonInfo = false,
  onEdit,
  onDelete,
}: DragonCardProps) => {
  const { id, name, createdAt, type } = dragon;
  const datetime = new Date(createdAt).toLocaleString();

  return (
    <div className={`dragon-card ${isDragonInfo && "dragon-card-info"}`}>
      {!!dragon.name ? (
        <>
          <div>
            <div className="header">
              <h1>
                <Tooltip text={name}>{truncate(name, { length: 20 })}</Tooltip>
              </h1>
              <div className="action-buttons">
                {!isDragonInfo ? (
                  <Tooltip text="Vizualizar">
                    <ViewButton id={id} />
                  </Tooltip>
                ) : (
                  <ButtonLink to="/">
                    <Tooltip text="voltar">
                      <Fab>
                        <Back />
                      </Fab>
                    </Tooltip>
                  </ButtonLink>
                )}
                <Tooltip text="Editar">
                  <EditButton dragon={dragon} onClick={onEdit} />
                </Tooltip>
                <Tooltip text="Excluir">
                  <DeleteButton dragon={dragon} onClick={onDelete} />
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
        </>
      ) : (
        <Loading center />
      )}
    </div>
  );
};

export default React.memo(DragonCard);
